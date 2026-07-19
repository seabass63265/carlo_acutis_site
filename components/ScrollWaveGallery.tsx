"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const IMAGES = [
  "/aboutus25.jpeg",
  "/aboutus22.JPG",
  "/aboutus26.jpeg",
  "/aboutus33.jpeg",
  "/aboutus36.jpeg",
  "/aboutus39.jpeg",
  "/aboutus42.jpeg",
  "/aboutus8.jpeg",
];

const ASPECT_RATIOS = ["3/2", "4/3", "5/4", "7/5"];
const BASE_HEIGHT = 375;

const WAVES = {
  base:   { amp: 0.1,  freq: 1.0, speed: 1.0, phase: 5.0 },
  flow:   { amp: 0.15, freq: 5.0, speed: 5.0, phase: 10.0 },
  detail: { amp: 0.025, freq: 5.0, speed: 1.5, phase: 2.5 },
};
const CLIP_MAX = 20;
const CLIP_POWER = 2;

export default function ScrollWaveGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(".wave-image"));
    const shrinkStart = Math.floor(items.length * 0.75);

    function updateSizes() {
      const sizeFactor = Math.min(window.innerWidth / 750, 1);
      items.forEach((item, i) => {
        const shrinkFactor = i >= shrinkStart ? (i - shrinkStart + 1) / (items.length - shrinkStart) : 0;
        const h = BASE_HEIGHT * sizeFactor * (1 - shrinkFactor * 0.5);
        item.style.height = `${Math.round(h)}px`;
      });
    }
    updateSizes();

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        const normalizedIndex = index / (items.length - 1);

        const applyWave = (progress: number) => {
          const cw = container.offsetWidth;
          const { base, flow, detail } = WAVES;

          const baseWave = Math.sin(normalizedIndex * base.freq + (1 - progress) * base.speed + base.phase);
          const flowWave = 0.5 + Math.sin(normalizedIndex * flow.freq + flow.phase + progress * flow.speed);
          const detailWave = 0.5 + Math.sin(normalizedIndex * detail.freq + detail.phase + progress * detail.speed);

          const translateX =
            (cw - item.offsetWidth) / 2 - cw * 0.1 +
            baseWave * cw * base.amp +
            flowWave * cw * flow.amp +
            detailWave * cw * detail.amp;

          const centerOffset = Math.abs(progress - 0.5) * 2;
          const clipAmount = Math.pow(centerOffset, CLIP_POWER) * CLIP_MAX;

          item.style.translate = `${translateX}px`;
          item.style.clipPath = `inset(0 ${clipAmount}% 0 ${clipAmount}%)`;
        };

        // Smoothed via a proxy that eases toward the raw scroll progress each tick,
        // instead of snapping the wave motion directly to the scroll position.
        const waveProxy = { progress: 0 };
        const setWaveProgress = gsap.quickTo(waveProxy, "progress", {
          duration: 0.6,
          ease: "power2.out",
          onUpdate: () => applyWave(waveProxy.progress),
        });

        ScrollTrigger.create({
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          onUpdate: ({ progress }) => setWaveProgress(progress),
        });
      });

      // Two mid-scroll headline moments — same squash-up-from-below reveal used in the story section.
      document.querySelectorAll<HTMLElement>(".swg-headline").forEach((headline) => {
        const split = SplitText.create(headline, { type: "words, chars", mask: "chars" });
        gsap.fromTo(
          split.chars,
          { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
          {
            ease: "back.inOut(2)", opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger: 0.02,
            scrollTrigger: { trigger: headline, start: "center bottom+=50%", end: "bottom top+=40%", scrub: 1 },
          },
        );
      });

      if (panelRef.current && items.length >= 2 && window.innerWidth >= 1024) {
        const panel = panelRef.current;
        const lastTwoHeight = items[items.length - 2].offsetHeight + items[items.length - 1].offsetHeight;

        // Same squash-up-from-below reveal as the headline moments, scrubbed via a paused
        // timeline (the panel itself is pinned, so it can't use a normal position-based scrollTrigger).
        // Pass the element directly — gsap.context() scopes plain selector strings to `container`,
        // and the panel lives outside that scope (it's a sibling, not a descendant).
        const panelTextEl = panel.querySelector<HTMLElement>(".swg-panel-text");
        const panelSplit = panelTextEl ? SplitText.create(panelTextEl, { type: "words, chars", mask: "chars" }) : null;
        const panelTextTl = gsap.timeline({ paused: true });
        if (panelSplit) {
          panelTextTl.fromTo(
            panelSplit.chars,
            { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
            { ease: "back.inOut(2)", opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger: 0.02 },
          );
        }

        gsap.set(panel, { autoAlpha: 0 });

        // Smoothed the same way as the wave images — ease toward the raw scroll
        // progress each tick rather than snapping the char reveal to it directly.
        const panelProgressProxy = { progress: 0 };
        const setPanelProgress = gsap.quickTo(panelProgressProxy, "progress", {
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => panelTextTl.progress(panelProgressProxy.progress),
        });

        // Pin spans the full image column so the frozen offset lands correctly at top:0.
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: panel,
          pinSpacing: false,
        });

        // Visibility is a separate, independent trigger scoped to just the last two images;
        // its own scroll progress also scrubs the char reveal, matching the headline moments.
        ScrollTrigger.create({
          trigger: container,
          start: () => `bottom-=${lastTwoHeight} bottom`,
          end: "bottom bottom",
          onUpdate: (self) => setPanelProgress(self.progress),
          onEnter: () => gsap.to(panel, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }),
          onEnterBack: () => gsap.to(panel, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }),
          onLeave: () => gsap.to(panel, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }),
          onLeaveBack: () => gsap.to(panel, { autoAlpha: 0, duration: 0.5, ease: "power2.out" }),
        });
      }
    }, container);

    const onResize = () => {
      updateSizes();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative w-full bg-cream">
      <div className="flex items-center justify-center px-8" style={{ height: "100svh" }}>
        <h2 className="font-serif text-navy text-center" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 500, lineHeight: 1 }}>
          Moments of the Mission
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div ref={containerRef} className="flex flex-col items-start overflow-hidden px-8 lg:w-1/2">
          {IMAGES.map((src, i) => (
            <div
              key={src}
              className="wave-image relative overflow-hidden"
              style={{ aspectRatio: ASPECT_RATIOS[i % ASPECT_RATIOS.length], willChange: "transform, clip-path" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="relative lg:w-1/2">
          <div className="swg-headline absolute hidden lg:block" style={{ top: "22%", left: 0, right: 0, padding: "0 4rem" }}>
            <h2 className="font-serif text-navy" style={{ fontSize: "clamp(2.2rem, 3.6vw, 4rem)", fontWeight: 500, lineHeight: 1.35 }}>
              Born from a Conviction<br />That Faith and Technology<br />Belong Together
            </h2>
          </div>

          <div className="swg-headline absolute hidden lg:block max-w-lg" style={{ top: "42%", left: 0, right: 0, padding: "0 4rem" }}>
            <p className="text-gold-dark text-xs font-semibold tracking-[0.25em] uppercase mb-6">Mission</p>
            <h2 className="font-serif text-navy" style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)", fontWeight: 500, lineHeight: 1.4 }}>
              To inspire a new generation of Catholics to use technology, creativity, and digital media as instruments of evangelization, following the example of St. Carlo Acutis.
            </h2>
          </div>

          <div ref={panelRef} className="hidden lg:flex flex-col items-start justify-center gap-8 px-8 py-16 lg:h-screen lg:px-16 lg:py-0 max-w-lg">
            <div>
              <p className="text-gold-dark text-xs font-semibold tracking-[0.25em] uppercase mb-6">Vision</p>
              <h2 className="swg-panel-text font-serif text-navy" style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)", fontWeight: 500, lineHeight: 1.4 }}>
                A world where young Catholics see their gifts — including technological ones — as vocations in service to the Gospel.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
