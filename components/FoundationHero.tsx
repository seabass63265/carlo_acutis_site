"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "@/i18n/navigation";
import { Pinyon_Script } from "next/font/google";

const script = Pinyon_Script({ weight: "400", subsets: ["latin"] });

// Avoid SSR useLayoutEffect warning while keeping synchronous timing on client
const useIsomorphicEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function FoundationHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })

        // Block headline lines stagger up
        .from(".fh-line", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.13,
        })

        // Script word writes itself left → right
        .from(
          ".fh-script",
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            duration: 1.4,
            ease: "power2.inOut",
          },
          "-=0.55"
        )

        // Supporting copy fades in
        .from(".fh-copy", { y: 18, opacity: 0, duration: 0.72 }, "-=0.82")

        // Buttons stagger in
        .from(
          ".fh-btn",
          { y: 14, opacity: 0, stagger: 0.12, duration: 0.58 },
          "-=0.56"
        )

        // Arch subtly zooms from 1.05 → 1.0 (starts at t=0, runs in parallel)
        .from(".fh-arch", { scale: 1.05, duration: 2.5, ease: "power2.out" }, 0)

        // Decorative elements fade in softly
        .from(
          ".fh-decor",
          { opacity: 0, duration: 1.5, stagger: 0.2, ease: "power1.out" },
          "-=1.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex overflow-hidden"
      style={{ background: "#F6F1E8" }}
    >
      {/* Paper-noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── LEFT CONTENT PANEL ────────────────────────────────── */}
      <div className="relative z-10 w-[44%] h-full flex flex-col pt-28 pb-12 px-14 xl:px-20">

        {/* Foundation tag — top of left panel */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-px h-5"
            style={{ background: "rgba(212,176,106,0.45)" }}
          />
          <p
            className="text-[9px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: "#A7AAB3" }}
          >
            Friends of St. Carlo Acutis&nbsp;&nbsp;·&nbsp;&nbsp;Foundation
          </p>
        </div>

        {/* Vertical spacer — pushes headline to lower half */}
        <div className="flex-1" />

        {/* ── Main headline ── */}
        <div className="mb-[3px]">
          {(["FAITH", "FOR THE", "DIGITAL"] as const).map((line) => (
            <div key={line} className="overflow-hidden">
              <p
                className="fh-line font-black uppercase tracking-[-0.025em] leading-[0.88]"
                style={{
                  fontSize: "clamp(2.9rem, 5.1vw, 6.2rem)",
                  color: "#121B2F",
                }}
              >
                {line}
              </p>
            </div>
          ))}

          {/* Script word — intentionally dominates */}
          <span
            className={`fh-script ${script.className}`}
            style={{
              fontSize: "clamp(4.2rem, 7.5vw, 9.4rem)",
              color: "#D4B06A",
              lineHeight: 1.05,
              display: "block",
              marginLeft: "-0.04em",
              clipPath: "inset(0 0% 0 0)", // "to" state for GSAP .from()
            }}
          >
            Saint
          </span>
        </div>

        {/* Supporting copy */}
        <p
          className="fh-copy mt-7 leading-[1.84] max-w-[410px]"
          style={{ fontSize: "14.5px", color: "#A7AAB3" }}
        >
          In a world shaped by screens, algorithms, and endless distractions,
          Carlo Acutis showed that technology can become a path toward truth,
          beauty, and God. Through his life and legacy, we invite a new
          generation to discover holiness in the digital age.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Link
            href="/carlo"
            className="fh-btn inline-block px-9 py-[15px] text-[10.5px] font-bold tracking-[0.17em] uppercase transition-opacity duration-200 hover:opacity-82"
            style={{ background: "#D4B06A", color: "#121B2F" }}
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className="fh-btn inline-block px-9 py-[15px] text-[10.5px] font-bold tracking-[0.17em] uppercase border transition-all duration-200 hover:bg-[#121B2F] hover:text-white"
            style={{
              borderColor: "rgba(18,27,47,0.32)",
              color: "#121B2F",
            }}
          >
            Stay Connected
          </Link>
        </div>

        {/* Thin gold rule at bottom of content */}
        <div
          className="mt-10 h-px w-14"
          style={{ background: "rgba(212,176,106,0.3)" }}
        />
      </div>

      {/* ── RIGHT VISUAL PANEL ────────────────────────────────── */}
      <div className="relative flex-1 h-full">

        {/* Cathedral arch frame + video */}
        <div
          className="fh-arch absolute overflow-hidden"
          style={{
            top: 0,
            left: "3%",
            right: "-14%",
            bottom: 0,
            // Romanesque arch: straight sides + strongly curved top
            borderRadius: "50% 50% 0 0 / 44% 44% 0 0",
            boxShadow: [
              "0 0 0 14px rgba(246,241,232,0.97)",   // thick ivory frame
              "0 0 0 15.5px rgba(212,176,106,0.18)", // hair-thin gold ring
              "0 70px 160px rgba(18,27,47,0.18)",    // depth shadow
            ].join(", "),
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            src="/carlovideo1.mp4"
          />

          {/* Soft inner vignette — enhances the "window" feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 110% 90% at 50% 28%, transparent 48%, rgba(18,27,47,0.14) 100%)",
            }}
          />
        </div>

        {/* ── Decorative accents ─────────────────────────────── */}

        {/* Eucharistic sunburst */}
        <div
          className="fh-decor absolute pointer-events-none"
          style={{ top: "17%", left: "4.5%", opacity: 0.52 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="4" stroke="#D4B06A" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={10 + 5.5 * Math.cos(a)}
                  y1={10 + 5.5 * Math.sin(a)}
                  x2={10 + 8.5 * Math.cos(a)}
                  y2={10 + 8.5 * Math.sin(a)}
                  stroke="#D4B06A"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="10" cy="10" r="1.5" fill="#D4B06A" />
          </svg>
        </div>

        {/* Handwritten annotation */}
        <div
          className="fh-decor absolute pointer-events-none"
          style={{
            bottom: "15%",
            left: "3.5%",
            transform: "rotate(-2deg)",
            opacity: 0.38,
          }}
        >
          <p
            className={script.className}
            style={{
              fontSize: "11.5px",
              color: "#121B2F",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Beato Carlo Acutis
          </p>
          <div
            style={{
              marginTop: 4,
              height: 1,
              width: 96,
              background: "linear-gradient(to right, rgba(212,176,106,0.55), transparent)",
            }}
          />
        </div>

        {/* Small cross */}
        <div
          className="fh-decor absolute pointer-events-none"
          style={{ top: "5.5%", left: "46%", opacity: 0.2 }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M4.5 1 L4.5 8 M1 4.5 L8 4.5"
              stroke="#D4B06A"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Gold dot */}
        <div
          className="fh-decor absolute rounded-full pointer-events-none"
          style={{
            bottom: "30%",
            right: "19%",
            width: 4,
            height: 4,
            background: "#D4B06A",
            opacity: 0.28,
          }}
        />
      </div>

      {/* ── Scroll cue ────────────────────────────────────────── */}
      <div className="absolute bottom-7 left-[22%] -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span
          className="text-[8.5px] font-semibold tracking-[0.28em] uppercase"
          style={{ color: "rgba(167,170,179,0.55)" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-7"
          style={{
            background:
              "linear-gradient(to bottom, rgba(212,176,106,0.4), transparent)",
          }}
        />
      </div>
    </section>
  );
}
