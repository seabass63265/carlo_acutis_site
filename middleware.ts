import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // The root "/" is the cinematic splash page — pass through untouched
  if (request.nextUrl.pathname === "/") return;
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except _next internals, api routes, and static files
    "/((?!_next|api|favicon\\.ico|.*\\..*).*)",
  ],
};
