// Sends a donation receipt using the same Resend setup as the contact form
// (app/api/contact/route.ts). Only ever called after a verified successful
// charge — never speculatively.
//
// What "succeeded" means here: our status mapping (cybersource/payment.ts)
// treats Cybersource's AUTHORIZED/COMPLETED response as success. We submit
// with processingInformation.capture: true (authorize + capture in one
// call), so this is "authorized, with capture requested" at the gateway —
// not confirmation that funds have settled into the merchant bank account,
// which happens later via normal card-network settlement/batch processing
// and isn't represented by any synchronous API response, from this or any
// card processor. This is standard and matches how essentially every
// card/donation receipt is worded ("thank you for your gift" sent
// immediately on authorization), so the donor-facing text below is left as
// is — just don't read "succeeded" in code/logs as "money has settled."

import { Resend } from "resend";
import { centsToDecimalString, DONATION_CURRENCY } from "./money";

// CONTACT_FROM_EMAIL must be on a Resend-verified sending domain (SPF/DKIM
// configured in the Resend dashboard) for production use. The
// onboarding@resend.dev fallback below is fine for local testing only — it
// has shared reputation and rate limits unsuitable for real donor receipts.

export async function sendDonationReceipt(params: {
  donorEmail: string;
  donorName: string;
  amountCents: number;
  providerTransactionId: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "Donation succeeded but RESEND_API_KEY is not set — no receipt was sent. " +
        `Reconcile manually: ${params.providerTransactionId} / ${params.donorEmail}.`,
    );
    return;
  }

  const from = process.env.CONTACT_FROM_EMAIL || "Friends of St. Carlo Acutis <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const amount = centsToDecimalString(params.amountCents);

  // NOTE: no tax-deductibility statement is included. Add your
  // organization's approved tax-deductibility wording and EIN here once
  // confirmed — do not state or imply deductibility without it.
  const { error } = await resend.emails.send({
    from,
    to: params.donorEmail,
    subject: "Thank you for your donation — Friends of St. Carlo Acutis",
    text: [
      `Dear ${params.donorName},`,
      "",
      `Thank you for your generous gift of $${amount} ${DONATION_CURRENCY} to Friends of St. Carlo Acutis.`,
      "",
      `Reference number: ${params.providerTransactionId}`,
      "",
      "God bless,",
      "Friends of St. Carlo Acutis",
    ].join("\n"),
  });

  if (error) {
    console.error(
      `Donation succeeded (${params.providerTransactionId}) but the receipt email failed to send:`,
      error.message,
    );
  }
}
