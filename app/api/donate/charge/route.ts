export const runtime = "nodejs"; // HTTP Signature auth needs Node's crypto module.

import { NextRequest, NextResponse } from "next/server";
import { chargeDonation } from "@/lib/payments/cybersource/payment";
import { CybersourceUncertainError } from "@/lib/payments/cybersource/client";
import { PaymentConfigError } from "@/lib/payments/cybersource/env";
import {
  DonationStoreUnconfiguredError,
  reserveOrGetDonation,
  saveDonation,
  type DonationRecord,
} from "@/lib/payments/store";
import { checkOrigin, enforceRateLimit } from "@/lib/payments/requestGuard";
import {
  DonationValidationError,
  validateDonor,
  validateIdempotencyKey,
  validateTransientToken,
} from "@/lib/payments/validation";
import { parseDonationAmountToCents, DONATION_CURRENCY, InvalidAmountError } from "@/lib/payments/money";
import { sendDonationReceipt } from "@/lib/payments/receipt";
import { hasDonationAccess } from "@/lib/payments/accessGate";

function statusToHttp(status: DonationRecord["status"]): number {
  switch (status) {
    case "succeeded":
      return 200;
    case "declined":
      return 402;
    case "pending":
    case "uncertain":
      return 202;
  }
}

export async function POST(request: NextRequest) {
  if (!(await hasDonationAccess())) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!checkOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  let idempotencyKey: string;
  let amountCents: number;
  let transientToken: string;
  let donor: ReturnType<typeof validateDonor>;
  try {
    idempotencyKey = validateIdempotencyKey(body.idempotencyKey);
    amountCents = parseDonationAmountToCents(body.amount);
    transientToken = validateTransientToken(body.transientToken);
    donor = validateDonor(body.donor);
  } catch (err) {
    if (err instanceof DonationValidationError || err instanceof InvalidAmountError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  try {
    const { allowed } = await enforceRateLimit(request, "charge");
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Atomically claim this idempotency key. If it was already claimed —
    // by a retried click, a double network submit, or a prior attempt that
    // timed out client-side but succeeded server-side — replay the
    // existing outcome instead of charging the card again.
    const { reserved, existing } = await reserveOrGetDonation(idempotencyKey);
    if (!reserved && existing) {
      return NextResponse.json(
        {
          status: existing.status,
          transactionId: existing.providerTransactionId,
        },
        { status: statusToHttp(existing.status) },
      );
    }
  } catch (err) {
    // Covers both "not configured" and transient failures reaching the
    // idempotency/rate-limit store. We cannot safely proceed to charge a
    // card without durable dedup state, so refuse rather than risk a
    // duplicate charge or an unhandled 500.
    console.error(
      err instanceof DonationStoreUnconfiguredError ? err.message : `Rate limit / idempotency check failed: ${err}`,
    );
    return NextResponse.json({ error: "Donations are temporarily unavailable" }, { status: 503 });
  }

  const baseRecord: Omit<DonationRecord, "status" | "providerTransactionId" | "providerStatus" | "updatedAt"> = {
    idempotencyKey,
    amountCents,
    currency: DONATION_CURRENCY,
    donorEmail: donor.email,
    donorName: `${donor.firstName} ${donor.lastName}`,
    createdAt: new Date().toISOString(),
  };

  let outcome;
  try {
    outcome = await chargeDonation({ idempotencyKey, amountCents, transientToken, donor });
  } catch (err) {
    if (err instanceof PaymentConfigError) {
      console.error("Payment configuration error:", err.message);
      return NextResponse.json({ error: "Donations are temporarily unavailable" }, { status: 503 });
    }
    if (err instanceof CybersourceUncertainError) {
      // We truly don't know what happened at the processor. Record it as
      // "uncertain" (not failed, not succeeded) and leave the idempotency
      // key claimed so a repeat click replays this same uncertain result
      // rather than firing a second, possibly duplicate, charge attempt.
      console.error("Uncertain donation outcome — needs manual reconciliation:", err.message, err.cause);
      await saveDonation({
        ...baseRecord,
        status: "uncertain",
        providerTransactionId: null,
        providerStatus: null,
        updatedAt: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          status: "uncertain",
          message: "We couldn't confirm your donation went through. Please contact us before trying again.",
        },
        { status: 202 },
      );
    }
    console.error("Unexpected error charging donation:", err);
    return NextResponse.json({ error: "Something went wrong processing your donation" }, { status: 502 });
  }

  const record: DonationRecord = {
    ...baseRecord,
    status: outcome.kind,
    providerTransactionId: outcome.providerTransactionId,
    providerStatus: outcome.providerStatus,
    updatedAt: new Date().toISOString(),
  };
  try {
    await saveDonation(record);
  } catch (err) {
    // The charge with Cybersource has already happened at this point — a
    // storage hiccup here must not turn into a 500 that hides a real charge
    // from the donor. Log it for manual reconciliation and still tell the
    // donor the true provider outcome.
    console.error(
      `Charge ${outcome.kind} (txn ${outcome.providerTransactionId}) but failed to persist the donation record:`,
      err,
    );
  }

  if (outcome.kind === "succeeded" && outcome.providerTransactionId) {
    // Best-effort; failure to email doesn't change the donation's success.
    void sendDonationReceipt({
      donorEmail: donor.email,
      donorName: record.donorName,
      amountCents,
      providerTransactionId: outcome.providerTransactionId,
    });
  }

  return NextResponse.json(
    {
      status: outcome.kind,
      transactionId: outcome.providerTransactionId,
      reason: outcome.kind === "declined" ? outcome.reason : undefined,
    },
    { status: statusToHttp(outcome.kind) },
  );
}
