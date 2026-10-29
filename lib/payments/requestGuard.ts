import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "./store";

// Per-route limits. Charge is tighter than capture-context since it's the
// one that can actually run card numbers against the processor (card
// testing / enumeration risk).
const LIMITS = {
  captureContext: { limit: 20, windowSeconds: 60 },
  charge: { limit: 8, windowSeconds: 60 },
} as const;

function clientFingerprint(request: NextRequest): string {
  // x-forwarded-for can list multiple hops; the first is the original
  // client as seen by the edge network. Vercel also sets x-real-ip.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  // Hash rather than store raw IPs as Redis keys.
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function enforceRateLimit(
  request: NextRequest,
  route: keyof typeof LIMITS,
): Promise<{ allowed: boolean }> {
  const { limit, windowSeconds } = LIMITS[route];
  const bucket = `${route}:${clientFingerprint(request)}`;
  const result = await checkRateLimit(bucket, limit, windowSeconds);
  return { allowed: result.allowed };
}

/**
 * Rejects requests whose Origin header doesn't match our own site. Browsers
 * always send Origin on fetch/XHR POSTs, so a same-origin check here blocks
 * naive cross-site replay of these endpoints even though the routes don't
 * use cookies/session auth.
 */
export function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Some legitimate same-origin requests (e.g. certain server-to-server
    // health checks) omit Origin; we only actively reject a *mismatched*
    // Origin rather than requiring one, to avoid breaking non-browser
    // callers we don't control. The rate limiter above is the primary
    // abuse control.
    return true;
  }
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}
