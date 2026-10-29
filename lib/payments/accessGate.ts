// Private-checkout gate for the controlled live-check period: the donation
// form and its API routes stay invisible/inoperative to the public until a
// server-issued cookie proves the visitor came through the private link.
// This is separate from BOFA_PRODUCTION_READY (which controls whether
// charges go to Cybersource at all) — the two together give two
// independent switches: "can this deployment charge real cards" and "can
// the public see/use the checkout."

import { cookies } from "next/headers";
import { timingSafeEqual, randomBytes } from "node:crypto";

export const DONATION_ACCESS_COOKIE = "donate_access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours per grant

function getAccessToken(): string | null {
  const token = process.env.DONATE_PRIVATE_ACCESS_TOKEN?.trim();
  return token && token.length >= 16 ? token : null;
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still do a constant-time comparison against a same-length buffer so
    // the early return above doesn't leak length-derived timing beyond
    // what's already unavoidable from the length check itself.
    timingSafeEqual(bufA, Buffer.alloc(bufA.length));
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/**
 * Validates a candidate token from the preview-access URL against the
 * configured secret.
 */
export function isValidAccessToken(candidate: string | null): boolean {
  const configured = getAccessToken();
  if (!configured || !candidate) return false;
  return timingSafeStringEqual(candidate, configured);
}

/**
 * Server Component check: has this visitor already been granted access via
 * the cookie set by the preview-access route?
 *
 * Fails closed: if DONATE_PRIVATE_ACCESS_TOKEN isn't configured at all,
 * access is never granted — there is no way to accidentally expose
 * checkout publicly just because an operator forgot to set the gate token
 * (that would be backwards: forgetting a var would normally mean "open").
 */
export async function hasDonationAccess(): Promise<boolean> {
  const configured = getAccessToken();
  if (!configured) return false;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(DONATION_ACCESS_COOKIE)?.value;
  if (!cookieValue) return false;

  return timingSafeStringEqual(cookieValue, configured);
}

export function generateAccessToken(): string {
  return randomBytes(24).toString("base64url");
}

export { COOKIE_MAX_AGE_SECONDS };
