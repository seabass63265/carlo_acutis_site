export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { COOKIE_MAX_AGE_SECONDS, DONATION_ACCESS_COOKIE, isValidAccessToken } from "@/lib/payments/accessGate";

// Visiting /api/donate/preview-access?token=<secret> sets an httpOnly
// cookie granting this browser access to the (otherwise "coming soon")
// donation checkout for 24 hours. The link itself (including the token)
// should only ever be shared privately (e.g. to whoever is running the
// live check) — never posted publicly, never linked from the public site.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!isValidAccessToken(token)) {
    // 404, not 403: don't confirm to an unauthenticated prober that this
    // endpoint (or the donation feature) exists at all.
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const redirectUrl = new URL("/donate#one-time-donation", request.nextUrl.origin);
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(DONATION_ACCESS_COOKIE, token as string, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
