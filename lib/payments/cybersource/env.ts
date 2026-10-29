// Resolves and validates Cybersource / Bank of America Gateway credentials.
//
// Bank of America's "Card Not Present Integration Toolkit (REST API)" is the
// Bank-of-America-branded surface of the Cybersource/Visa Acceptance REST
// platform. The "REST – Shared Secret" key generated in the Business Center
// is a (merchantId, keyId, sharedSecret) triple used for HTTP Signature
// authentication — see httpSignature.ts.
//
// Host reference (Cybersource REST API "Getting Started" guide):
//   test:       apitest.cybersource.com
//   production: api.cybersource.com

export type PaymentEnvironment = "test" | "production";

export interface CybersourceCredentials {
  environment: PaymentEnvironment;
  host: string;
  merchantId: string;
  keyId: string;
  sharedSecret: string;
}

class PaymentConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentConfigError";
  }
}

const HOSTS: Record<PaymentEnvironment, string> = {
  test: "apitest.cybersource.com",
  production: "api.cybersource.com",
};

function resolveEnvironment(): PaymentEnvironment {
  const raw = process.env.BOFA_ENVIRONMENT?.trim().toLowerCase();

  if (!raw) {
    // Default development to test mode, as required. Only an explicit
    // "production" opts a deployment into live charges.
    return "test";
  }

  if (raw === "test" || raw === "production") return raw;

  throw new PaymentConfigError(
    `BOFA_ENVIRONMENT must be "test" or "production" (got "${raw}").`,
  );
}

// Guards against the catastrophic case of production credentials pointed at
// the test endpoint or vice versa. Both Cybersource credential types have a
// distinct, documented format (merchant IDs are account-specific slugs, key
// IDs are UUID-like serial numbers), so we can't detect a swap by shape
// alone — instead we require the operator to be explicit and we never fall
// back silently.
function requireCredential(name: string, value: string | undefined): string {
  if (!value || !value.trim()) {
    throw new PaymentConfigError(
      `Missing required environment variable ${name}. Payment routes cannot run without it.`,
    );
  }
  return value.trim();
}

// Standard base64 (what the Business Center issues the shared secret as),
// optional padding.
const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/;

// httpSignature.ts base64-decodes this value and uses the raw bytes as the
// HMAC-SHA256 key. A value that isn't valid base64 — or that silently
// re-encodes to something different (e.g. a stray character, a line break
// from a multi-line paste into an env var UI, or truncation) — produces a
// *different* signing key than the one Cybersource has on file, with no
// local error: the request goes out, is well-formed, and Cybersource
// rejects it with a generic 401 "Authentication Failed" that looks
// identical to a genuinely wrong/inactive credential. Catching malformed
// base64 here turns that into an immediate, specific local error instead.
function requireBase64Credential(name: string, value: string | undefined): string {
  const trimmed = requireCredential(name, value);
  // Character-set check only — deliberately NOT a strict re-encode/compare
  // round-trip, since valid base64 may omit padding ("=") and Node's
  // decoder re-adds it on re-encode, which would make a correctly-copied,
  // merely unpadded secret look "corrupted" when it isn't. This still
  // catches the real-world failure modes: embedded whitespace/line breaks
  // from a multi-line paste, or stray non-base64 characters.
  if (!BASE64_PATTERN.test(trimmed)) {
    throw new PaymentConfigError(
      `${name} does not look like valid base64 — it was likely corrupted when pasted ` +
        "(stray character or embedded line break). Re-copy it exactly from the Business " +
        "Center and redeploy.",
    );
  }
  return trimmed;
}

let cached: CybersourceCredentials | null = null;

export function getCybersourceCredentials(): CybersourceCredentials {
  if (cached) return cached;

  const environment = resolveEnvironment();
  const merchantId = requireCredential("BOFA_MERCHANT_ID", process.env.BOFA_MERCHANT_ID);
  const keyId = requireCredential("BOFA_KEY_ID", process.env.BOFA_KEY_ID);
  const sharedSecret = requireBase64Credential("BOFA_SHARED_SECRET", process.env.BOFA_SHARED_SECRET);

  if (environment === "production" && process.env.BOFA_PRODUCTION_READY !== "true") {
    // Deliberate extra opt-in, independent of BOFA_ENVIRONMENT. This
    // integration has not yet completed Cybersource/Bank of America's DCE
    // (Demonstration and Certification Environment) test checklist, so
    // production charges must stay off even if BOFA_ENVIRONMENT is
    // accidentally set to "production" in some deployment. Flip this only
    // once DCE verification is complete and the live account is confirmed
    // ready — see the delivery notes for the test checklist.
    throw new PaymentConfigError(
      "BOFA_ENVIRONMENT=production but BOFA_PRODUCTION_READY is not \"true\". " +
        "Production donations are disabled until DCE verification is complete.",
    );
  }

  cached = { environment, host: HOSTS[environment], merchantId, keyId, sharedSecret };
  return cached;
}

export { PaymentConfigError };
