"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // globals.css sets `scroll-behavior: smooth` on <html> for in-page anchor
    // links, but that also intercepts Next.js's own scroll-to-top-on-navigate
    // call and turns it into an interruptible animation that can get silently
    // cancelled — leaving new pages at the previous page's scroll position.
    // An explicit `behavior: "instant"` overrides the CSS-level smooth scroll.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
