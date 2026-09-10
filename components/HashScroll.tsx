"use client";
import { useEffect } from "react";

/**
 * Scrolls to the element named by the URL hash after the page has had a chance
 * to settle. Pages like /about have a heavy animated hero (GSAP) and lazily
 * sized images above the anchor targets, so the browser's own one-shot hash
 * scroll on navigation often lands in the wrong place. This re-runs the scroll
 * a few times over the first ~1.5s to correct for that layout shift.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    let cancelled = false;

    const scroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    };

    // Immediately, then again as the hero animation and images settle.
    scroll();
    const timers = [120, 400, 900, 1500].map((ms) => window.setTimeout(scroll, ms));

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
