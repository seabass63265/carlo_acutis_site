"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { miracles } from "@/components/miracles-data";

export default function MiraclesIntroHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(SplitText, CustomEase);
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const headerSplit = SplitText.create(".mih-title", {
        type: "chars",
        charsClass: "char",
        mask: "chars",
      });

      SplitText.create(".mih-footer p", {
        type: "words",
        wordsClass: "word",
        mask: "words",
      });

      const counterEl = wrapperRef.current?.querySelector<HTMLHeadingElement>(".mih-count");
      const counter = { value: 0 };

      const tl = gsap.timeline();

      // Counter scales up and counts 0 → 100
      tl.to(".mih-counter", { scale: 1, duration: 3, ease: "power3.out" }, 0);

      tl.to(
        counter,
        {
          value: miracles.length,
          duration: 3,
          ease: "power3.out",
          onUpdate: () => {
            if (counterEl) counterEl.textContent = String(Math.floor(counter.value));
          },
          onComplete: () => {
            if (!counterEl) return;
            const digitSplit = SplitText.create(counterEl, {
              type: "chars",
              charsClass: "digit",
              mask: "chars",
            });
            gsap.to(digitSplit.chars, {
              x: "-100%",
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.1,
              delay: 1,
              onComplete: () => {
                const el = wrapperRef.current?.querySelector(".mih-counter");
                el?.remove();
              },
            });
          },
        },
        0,
      );

      // Progress bar fills while counting
      tl.to(".mih-pb", { scaleX: 1, duration: 3, ease: "power3.out" }, 0);

      // Image: point → square
      tl.to(
        ".mih-bg",
        { clipPath: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)", duration: 1.5, ease: "hop" },
        4.5,
      );
      tl.to(".mih-bg img", { scale: 1.5, duration: 1.5, ease: "hop" }, "<");

      // Image: square → full screen
      tl.to(
        ".mih-bg",
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 2, ease: "hop" },
        6,
      );
      tl.to(".mih-bg img", { scale: 1, duration: 2, ease: "hop" }, 6);
      tl.to(".mih-progress", { scaleX: 1, duration: 2, ease: "hop" }, 6);

      // Title chars slide in
      tl.from(
        headerSplit.chars,
        { x: "100%", duration: 1, ease: "power4.out", stagger: 0.06 },
        7,
      );

      // Footer words slide up
      tl.from(
        ".mih-footer p .word",
        { y: "100%", duration: 1, ease: "power4.out", stagger: 0.075 },
        7.5,
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* Fixed preloader counter */}
      <div
        className="mih-counter fixed left-8 top-1/2 z-[100] pointer-events-none"
        style={{ transform: "translateY(-50%) scale(0.25)", transformOrigin: "left bottom" }}
      >
        <h1
          className="mih-count font-serif text-white leading-none"
          style={{ fontSize: "clamp(2.5rem, 25vw, 25rem)" }}
        >
          0
        </h1>
      </div>

      {/* Hero section */}
      <section
        className="relative w-full overflow-hidden bg-[#0f0f0f]"
        style={{ height: "100svh" }}
      >
        {/* Background video — clip-path animated */}
        <div
          className="mih-bg absolute inset-0"
          style={{
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          }}
        >
          <img
            src="/herophoto1.png"
            alt=""
            className="absolute top-1/2 left-1/2 w-full h-full object-cover"
            style={{ transform: "translate(-50%, -50%) scale(2)" }}
          />
        </div>

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Bottom block: title → line → footer */}
        <div className="absolute bottom-0 left-0 w-full px-8 pb-8">
          <h1
            className="mih-title font-serif text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 8rem)", lineHeight: 1 }}
          >
            {miracles.length} Miracles
          </h1>

          {/* Progress bar — sits flush below title */}
          <div
            className="mih-pb relative mt-3"
            style={{
              height: "1.5px",
              background: "rgba(255,255,255,0.2)",
              transformOrigin: "left",
              transform: "scaleX(0)",
              overflow: "hidden",
            }}
          >
            <div
              className="mih-progress absolute inset-0 bg-white"
              style={{ transformOrigin: "left", transform: "scaleX(0)" }}
            />
          </div>

          {/* Footer words */}
          <div className="mih-footer flex justify-between items-start pt-4">
            {["Documented", "Verified", "Preserved"].map((word) => (
              <p key={word} className="text-white/60 text-sm font-medium tracking-wide">
                {word}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
