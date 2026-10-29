// Submits a one-time card donation to Cybersource's Payments resource and
// maps the response onto a small, closed set of outcomes the rest of the
// app can act on safely.
//
// Endpoint (confirmed — Cybersource REST API endpoint reference):
//   POST https://api.cybersource.com/pts/v2/payments        (production)
//   POST https://apitest.cybersource.com/pts/v2/payments    (test)
//
// `paymentInformation.fluidData.value` carries Flex Microform's tokenized
// card payload — confirmed as the REST field for this encrypted/tokenized
// payment data by Cybersource's API field reference.
//
// `status` values (confirmed from Cybersource's published response-code
// data set): AUTHORIZED, PARTIAL_AUTHORIZED, AUTHORIZED_PENDING_REVIEW,
// AUTHORIZED_RISK_DECLINED, DECLINED, INVALID_REQUEST,
// PENDING_AUTHENTICATION, SERVER_ERROR, PENDING, REVERSED, VOIDED,
// ACCEPTED, REJECTED, AUTHENTICATION_FAILED, PENDING_REVIEW, CHALLENGE,
// COMPLETED, AUTHENTICATION_SUCCESSFUL.
//
// NOTE — verify before go-live: duplicate-request detection via
// clientReferenceInformation.transactionId is documented as applying only
// on the Visa Platform Connect processor. Do not rely on it as your only
// duplicate-charge defense — see lib/payments/store.ts for the
// application-level idempotency layer this integration actually depends on.

import { cybersourceClient, CybersourceApiError } from "./client";
import { DONATION_CURRENCY, centsToDecimalString } from "../money";

export interface DonorBillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string; // ISO 3166-1 alpha-2
}

export interface ChargeDonationParams {
  idempotencyKey: string; // letters/numbers only, our own reference
  amountCents: number;
  transientToken: string; // from Microform createToken on the client
  donor: DonorBillingInfo;
}

export type PaymentOutcomeKind = "succeeded" | "declined" | "pending" | "uncertain";

export interface PaymentOutcome {
  kind: PaymentOutcomeKind;
  providerStatus: string | null;
  providerTransactionId: string | null;
  reason: string | null;
}

const SUCCESS_STATUSES = new Set(["AUTHORIZED", "COMPLETED"]);
const DECLINED_STATUSES = new Set([
  "DECLINED",
  "AUTHORIZED_RISK_DECLINED",
  "INVALID_REQUEST",
  "AUTHENTICATION_FAILED",
  "REJECTED",
  "PARTIAL_AUTHORIZED", // we only ever request full capture; a partial auth
  // for a donation isn't a usable success state and needs a human to look
  // at it rather than silently showing the donor "success".
]);
const PENDING_STATUSES = new Set([
  "PENDING",
  "PENDING_REVIEW",
  "AUTHORIZED_PENDING_REVIEW",
  "PENDING_AUTHENTICATION",
  "CHALLENGE",
]);

function mapStatus(status: string | undefined): PaymentOutcomeKind {
  if (!status) return "uncertain";
  if (SUCCESS_STATUSES.has(status)) return "succeeded";
  if (DECLINED_STATUSES.has(status)) return "declined";
  if (PENDING_STATUSES.has(status)) return "pending";
  // Any status we don't explicitly recognize (including SERVER_ERROR,
  // REVERSED, VOIDED here, and anything added to the API after this was
  // written) is treated as uncertain rather than guessed at.
  return "uncertain";
}

interface CybersourcePaymentResponse {
  id?: string;
  status?: string;
  errorInformation?: { reason?: string; message?: string };
}

export async function chargeDonation(params: ChargeDonationParams): Promise<PaymentOutcome> {
  const { idempotencyKey, amountCents, transientToken, donor } = params;

  const requestBody = {
    clientReferenceInformation: {
      code: idempotencyKey,
      transactionId: idempotencyKey,
    },
    processingInformation: {
      capture: true,
    },
    paymentInformation: {
      fluidData: {
        value: transientToken,
      },
    },
    orderInformation: {
      amountDetails: {
        totalAmount: centsToDecimalString(amountCents),
        currency: DONATION_CURRENCY,
      },
      billTo: {
        firstName: donor.firstName,
        lastName: donor.lastName,
        email: donor.email,
        address1: donor.address1,
        locality: donor.city,
        administrativeArea: donor.state,
        postalCode: donor.postalCode,
        country: donor.country,
      },
    },
  };

  try {
    const response = await cybersourceClient.post<CybersourcePaymentResponse>(
      "/pts/v2/payments",
      requestBody,
    );
    return {
      kind: mapStatus(response.status),
      providerStatus: response.status ?? null,
      providerTransactionId: response.id ?? null,
      reason: response.errorInformation?.reason ?? null,
    };
  } catch (err) {
    if (err instanceof CybersourceApiError) {
      const body = err.body as CybersourcePaymentResponse | undefined;
      return {
        kind: mapStatus(body?.status),
        providerStatus: body?.status ?? null,
        providerTransactionId: body?.id ?? null,
        reason: body?.errorInformation?.reason ?? err.message,
      };
    }
    // CybersourceUncertainError (network/timeout/5xx) and anything else
    // unexpected both surface as "uncertain" — never silently treated as a
    // decline, and never auto-retried here.
    throw err;
  }
}
