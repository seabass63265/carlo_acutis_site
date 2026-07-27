"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const CASCADE = [
  "/aboutus21.jpeg",
  "/aboutus23.jpeg",
  "/aboutus24.jpeg",
  "/aboutus18.jpeg",
  "/aboutus10.jpeg",
];

const MAIN = [
  "/aboutus25.jpeg",
  "/aboutus22.JPG",
  "/aboutus26.jpeg",
];

const THUMB_W   = 150;
const THUMB_H   = 100;
const THUMB_GAP = 14;
const PAD       = 32;

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop",  "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1");
    CustomEase.create("hop2", "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1");

    const isMobile = window.innerWidth < 768;
    let removeResize: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set(".ah-reveal", { y: "100%" });

      const split = SplitText.create(".ah-tagline", { type: "lines", mask: "lines" });
      gsap.set(split.lines, { yPercent: 100 });

      const allImgs = gsap.utils.toArray<HTMLElement>(".ah-img");
      gsap.set(allImgs, {
        position: "absolute",
        top: "50%", left: "50%",
        xPercent: -50, yPercent: -50,
        width: "100%", height: "100%",
        scale: 1.5, opacity: 0,
      });
      gsap.set(allImgs[0], { opacity: 1 });

      // ── 1. Revealer panels ──────────────────────────────────────────────
      const revealerTl = gsap.timeline();
      revealerTl
        .to(".ah-r1", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",     duration: 1.5, ease: "hop" })
        .to(".ah-r2", { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", duration: 1.5, ease: "hop" }, "<");

      // ── 2. Image cascade ────────────────────────────────────────────────
      const scaleTl = gsap.timeline();
      scaleTl.to(allImgs[0], { scale: 1, duration: 2, ease: "power4.inOut" });
      for (let i = 1; i < allImgs.length; i++) {
        scaleTl.to(allImgs[i], { opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" }, ">-0.95");
      }

      // ── 3. Transition: thumbnails (desktop) / mosaic (mobile) ──────────
      // Positions below are computed in raw pixels from the viewport size at the
      // moment they run. Re-applied (instantly, no re-animation) on resize so a
      // later viewport change — e.g. rotating the device or resizing the window —
      // doesn't leave the images stuck at stale coordinates that drift into the text.
      const applyMainImagePositions = () => {
        const mainImgs = root.querySelectorAll<HTMLElement>(".ah-img-main");
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const mobile = window.innerWidth < 768;

        if (mobile) {
          const mPad   = 16;
          const mGap   = 8;
          const mTop   = 72;
          const mTotalH = Math.round(vh * 0.43);
          const mLeftW  = Math.round(vw * 0.52);
          const mRightW = vw - 2 * mPad - mLeftW - mGap;
          const mRightH = Math.floor((mTotalH - mGap) / 2);

          const mosaic = [
            { top: mTop,                  left: mPad,                     width: mLeftW,  height: mTotalH },
            { top: mTop,                  left: mPad + mLeftW + mGap,     width: mRightW, height: mRightH },
            { top: mTop + mRightH + mGap, left: mPad + mLeftW + mGap,     width: mRightW, height: mRightH },
          ];

          mainImgs.forEach((img, i) => gsap.set(img, { xPercent: 0, yPercent: 0, ...mosaic[i] }));
        } else {
          mainImgs.forEach((img, i) => gsap.set(img, {
            xPercent: 0, yPercent: 0,
            top:  vh - PAD - THUMB_H - i * (THUMB_H + THUMB_GAP),
            left: PAD,
            width:  THUMB_W,
            height: THUMB_H,
          }));
        }
      };

      const mainTl = gsap.timeline();
      mainTl
        .add(revealerTl)
        .add(scaleTl, "-=1.25")
        .add(() => {
          const cascadeEls = root.querySelectorAll<HTMLElement>(".ah-img-cascade");
          const mainImgs   = root.querySelectorAll<HTMLElement>(".ah-img-main");
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          const tl = gsap.timeline();

          if (isMobile) {
            // Cascade images fade out
            tl.to(cascadeEls, { opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
            tl.set(cascadeEls, { display: "none" }, 0.6);

            // Main images: magazine mosaic grid in the top 43% of screen
            const mPad   = 16;
            const mGap   = 8;
            const mTop   = 72; // below foundation-name header
            const mTotalH = Math.round(vh * 0.43);
            const mLeftW  = Math.round(vw * 0.52);
            const mRightW = vw - 2 * mPad - mLeftW - mGap;
            const mRightH = Math.floor((mTotalH - mGap) / 2);

            // Clear percent-based transforms before pixel animation
            mainImgs.forEach(img => gsap.set(img, { xPercent: 0, yPercent: 0 }));

            const mosaic = [
              { top: mTop,                  left: mPad,                     width: mLeftW,  height: mTotalH },
              { top: mTop,                  left: mPad + mLeftW + mGap,     width: mRightW, height: mRightH },
              { top: mTop + mRightH + mGap, left: mPad + mLeftW + mGap,     width: mRightW, height: mRightH },
            ];

            mainImgs.forEach((img, i) => {
              tl.to(img, { ...mosaic[i], duration: 2, ease: "power3.inOut" }, 0.1 + i * 0.08);
            });
          } else {
            // Desktop: cascade fades, mains shrink to vertical stack bottom-left
            tl.to(cascadeEls, { opacity: 0, duration: 0.5, ease: "power2.out" }, 0);
            mainImgs.forEach((img, i) => {
              tl.to(img, {
                xPercent: 0, yPercent: 0,
                top:  vh - PAD - THUMB_H - i * (THUMB_H + THUMB_GAP),
                left: PAD,
                width:  THUMB_W,
                height: THUMB_H,
                duration: 2.2,
                ease: "power3.inOut",
              }, 0.1 + i * 0.08);
            });
            tl.set(cascadeEls, { display: "none" }, 0.55);
          }

          return tl;
        })
        .call(() => window.dispatchEvent(new Event("about-hero-images-done")))
        .to(".ah-reveal", { y: 0, duration: 2.5, ease: "hop2", stagger: 0.07, delay: 0.4 })
        .to(split.lines, { yPercent: 0, duration: 2.2, ease: "hop2", stagger: 0.1 }, "<+=0.15");

      if (!isMobile) {
        mainTl.to(".ah-team-img", {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 2,
          ease: "hop",
        }, "<");
      }

      mainTl.eventCallback("onComplete", () => {
        let resizeRaf = 0;
        const onResize = () => {
          cancelAnimationFrame(resizeRaf);
          resizeRaf = requestAnimationFrame(applyMainImagePositions);
        };
        window.addEventListener("resize", onResize);
        removeResize = () => {
          window.removeEventListener("resize", onResize);
          cancelAnimationFrame(resizeRaf);
        };
      });
    }, ref);

    return () => {
      removeResize?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", background: "#F8F5F0" }}
    >
      {/* Revealer panels */}
      <div className="absolute inset-0 z-40 flex flex-col pointer-events-none">
        <div className="ah-r1 flex-1 w-full"
          style={{ background: "#F8F5F0", clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
        <div className="ah-r2 flex-1 w-full"
          style={{ background: "#F8F5F0", clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
      </div>

      {/* Images */}
      <div className="ah-images absolute inset-0 z-30">
        {CASCADE.map((src, i) => (
          <div key={src} className="ah-img ah-img-cascade overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="100vw" priority={i === 0} />
          </div>
        ))}
        {MAIN.map(src => (
          <div key={src} className="ah-img ah-img-main overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="100vw" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="ah-content-overlay absolute inset-0 z-20 pointer-events-none">

        {/* Page title — top left */}
        <div className="ah-foundation-name absolute right-8 flex gap-5" style={{ top: "15%" }}>
          {["About", "Us"].map(w => (
            <div key={w} className="overflow-hidden">
              <div className="ah-reveal font-sans font-bold text-navy"
                style={{ fontSize: "clamp(40px, 5.5vw, 80px)", lineHeight: 1 }}>
                {w}
              </div>
            </div>
          ))}
        </div>

        {/* Team photo — bottom right (desktop only, animated via GSAP) */}
        <div className="ah-team-img absolute right-8 bottom-8 overflow-hidden"
          style={{ width: "38%", height: "52%", clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
          <Image src="/aboutus19.jpeg" alt="" fill className="object-cover" sizes="40vw" />
        </div>

        {/* Bottom-left info */}
        <div className="ah-bottom-info absolute bottom-8 left-8"
          style={{ width: "50%", height: "50%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>

          <div className="ah-info-row1" style={{ display: "flex", gap: "2rem" }}>
            <div style={{ flex: 1, marginTop: "-8rem" }}>
              <div className="overflow-hidden">
                <div className="ah-reveal font-semibold tracking-[0.25em] uppercase"
                  style={{ color: "#A07840", fontSize: "clamp(16px, 1.8vw, 24px)", whiteSpace: "nowrap" }}>Our Foundation</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="ah-tagline font-sans text-navy"
                style={{ fontSize: "clamp(14px, 1.2vw, 18px)", fontWeight: 500, lineHeight: 1.4 }}>
                We want to make faith as accessible as possible so that young people around the world can encounter Christ through the digital tools they already use every day.
                <br /><br />
                No matter the background, every young Catholic should be equipped to carry the Gospel forward with creativity, courage, and conviction — following the example of St. Carlo Acutis.
              </h2>
            </div>
          </div>

          <div className="ah-info-row2" style={{ display: "flex", gap: "2rem" }}>
            <div style={{ flex: 1 }} />
            <div style={{ flex: 1, display: "flex", gap: "2rem" }}>
              <div style={{ flex: 1 }}>
                {["Rooted In", "Faith", "Hope", "Love"].map(line => (
                  <div key={line} className="overflow-hidden">
                    <div className="ah-reveal text-[11px] font-medium uppercase leading-relaxed"
                      style={{ color: "#6B7280" }}>{line}</div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {["Contact Us", " ", "Facebook", "LinkedIn"].map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    {i === 0 ? (
                      <Link href="/contact" className="ah-reveal block pointer-events-auto text-[11px] font-medium leading-relaxed"
                        style={{ color: "#6B7280" }}>{line}</Link>
                    ) : (
                      <div className="ah-reveal text-[11px] font-medium leading-relaxed"
                        style={{ color: "#6B7280" }}>{line}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only layout overrides */}
      <style>{`
        @media (max-width: 767px) {
          /* Hide desktop-only elements */
          .ah-team-img  { display: none !important; }
          .ah-info-row2 { display: none !important; }

          /* Text must render above the mosaic images, not underneath them */
          .ah-content-overlay { z-index: 35 !important; }

          /* Text block: full width, anchored to bottom */
          .ah-bottom-info {
            width: calc(100vw - 3rem) !important;
            height: auto !important;
            bottom: 2rem !important;
            left: 1.5rem !important;
          }

          /* Stack eyebrow above tagline */
          .ah-info-row1 {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }

          /* Compact tagline — leaves room for images above */
          .ah-tagline {
            font-size: clamp(13px, 3.6vw, 16px) !important;
            font-weight: 600 !important;
            line-height: 1.4 !important;
          }

          /* Foundation name: tighter, lower so it clears the mosaic photos */
          .ah-foundation-name {
            gap: 0.5rem !important;
            top: 56% !important;
          }
        }
      `}</style>
    </section>
  );
}
