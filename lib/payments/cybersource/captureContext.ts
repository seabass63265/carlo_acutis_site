// Generates a Flex Microform v2 "capture context": a short-lived (15-minute),
// signed JWT that the client-side Microform library uses to open hosted
// iframe fields for card number + CVV and tokenize them without those
// values ever reaching our server.
//
// CONFIRMED directly from Cybersource's official docs (fetched during this
// implementation):
//   - Endpoint: POST https://apitest.cybersource.com/microform/v2/sessions (test)
//     / https://api.cybersource.com/microform/v2/sessions (production)
//     https://developer.cybersource.com/docs/cybs/en-us/digital-accept-flex-api/developer/ctv/rest/flex-api/microform-integ-v2/microform-integ-getting-started-v2/creating-server-side-context-v2.html
//   - Request body (verbatim example from that page):
//       { "targetOrigins": ["https://www.example.com"],
//         "allowedCardNetworks": ["VISA"],
//         "clientVersion": "v2.0" }
//   - Response body: the capture context itself, a bare JWT string (not
//     JSON-wrapped). Valid for 15 minutes — request a fresh one per form
//     load rather than caching it.
//   - Explicit security requirement from the same page: "Don't accept or
//     forward targetOrigin from external requests. Hard-code it on the
//     server." This is why createCaptureContext() takes no caller-supplied
//     origin — it's fixed below, not derived from the incoming request.
//
// NOT independently confirmed — this is "Bank of America Gateway" as the
// Cybersource/Visa Acceptance REST platform (Bank of America's own
// merchant-help PDF describes "direct REST API integration with the Bank
// of America Gateway" and hosts its test/certification portal on
// Cybersource's domain, so there does not appear to be a separate
// BofA-specific API surface). Still worth a direct question to your BofA
// integration contact: confirm Flex Microform v2 is enabled for this
// specific merchant ID, since account-level feature enablement isn't
// something the public docs can tell us.

import { cybersourceClient } from "./client";

const CAPTURE_CONTEXT_PATH =
  process.env.BOFA_CAPTURE_CONTEXT_PATH?.trim() || "/microform/v2/sessions";

const SUPPORTED_CARD_NETWORKS = ["VISA", "MASTERCARD", "AMEX", "DISCOVER"];

// Hard-coded per Cybersource's explicit security guidance above — never
// take this from the request. Set via env so test/staging/production
// deployments (different hostnames) each configure their own fixed origin.
function getFixedTargetOrigin(): string {
  const origin = process.env.DONATE_SITE_ORIGIN?.trim();
  if (!origin || !/^https:\/\/[^/]+$/.test(origin)) {
    // http:// is only acceptable for local development.
    if (origin && /^http:\/\/localhost(:\d+)?$/.test(origin)) return origin;
    throw new Error(
      "DONATE_SITE_ORIGIN must be set to the site's exact https:// origin " +
        '(e.g. "https://www.foundationofcarloacutis.org", no trailing slash/path).',
    );
  }
  return origin;
}

export async function createCaptureContext(): Promise<string> {
  const targetOrigin = getFixedTargetOrigin();

  const jwt = await cybersourceClient.postText(CAPTURE_CONTEXT_PATH, {
    targetOrigins: [targetOrigin],
    allowedCardNetworks: SUPPORTED_CARD_NETWORKS,
    clientVersion: "v2.0",
  });

  if (typeof jwt !== "string" || jwt.split(".").length !== 3) {
    throw new Error("Unexpected capture context response shape from Cybersource.");
  }

  return jwt;
}
