export const runtime = "nodejs"; // HTTP Signature auth needs Node's crypto module.

import { NextRequest, NextResponse } from "next/server";
import { createCaptureContext } from "@/lib/payments/cybersource/captureContext";
import { PaymentConfigError } from "@/lib/payments/cybersource/env";
import { DonationStoreUnconfiguredError } from "@/lib/payments/store";
import { checkOrigin, enforceRateLimit } from "@/lib/payments/requestGuard";

export async function POST(request: NextRequest) {
  if (!checkOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    const { allowed } = await enforceRateLimit(request, "captureContext");
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  } catch (err) {
    // Covers both "not configured" and transient failures talking to the
    // rate-limit store (e.g. a network blip) — either way we can't safely
    // enforce the limit, so refuse rather than letting the request through
    // unguarded or leaking a 500.
    console.error(
      err instanceof DonationStoreUnconfiguredError ? err.message : `Rate limit check failed: ${err}`,
    );
    return NextResponse.json({ error: "Donations are temporarily unavailable" }, { status: 503 });
  }

  try {
    const captureContext = await createCaptureContext();
    return NextResponse.json({ captureContext });
  } catch (err) {
    if (err instanceof PaymentConfigError) {
      console.error("Payment configuration error:", err.message);
      return NextResponse.json({ error: "Donations are temporarily unavailable" }, { status: 503 });
    }
    console.error("Failed to create Cybersource capture context:", err);
    return NextResponse.json({ error: "Could not start the donation form" }, { status: 502 });
  }
}
