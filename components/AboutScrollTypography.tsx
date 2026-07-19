"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STORY_IMAGES = [
  "/aboutus11.jpeg",
  "/aboutus12.jpeg",
  "/aboutus13.jpeg",
  "/aboutus14.jpeg",
  "/aboutus15.jpeg",
  "/aboutus16.jpeg",
  "/aboutus17.jpeg",
  "/aboutus19.jpeg",
  "/aboutus20.jpeg",
  "/aboutus27.jpeg",
  "/aboutus28.jpeg",
  "/aboutus29.jpeg",
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

export default function AboutScrollTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let removeResizeListener: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.registerPlugin(SplitText, ScrollTrigger);

      // Story image column — same wave-scroll treatment as the mission gallery
      const imgContainer = imgContainerRef.current;
      if (imgContainer) {
        const items = Array.from(imgContainer.querySelectorAll<HTMLElement>(".story-wave-image"));
        const shrinkStart = Math.floor(items.length * 0.75);

        const updateSizes = () => {
          const sizeFactor = Math.min(window.innerWidth / 750, 1);
          items.forEach((item, i) => {
            const shrinkFactor = i >= shrinkStart ? (i - shrinkStart + 1) / (items.length - shrinkStart) : 0;
            const h = BASE_HEIGHT * sizeFactor * (1 - shrinkFactor * 0.5);
            item.style.height = `${Math.round(h)}px`;
          });
        };
        updateSizes();

        items.forEach((item, index) => {
          const normalizedIndex = index / (items.length - 1);

          const applyWave = (progress: number) => {
            const cw = imgContainer.offsetWidth;
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

        const onResize = () => {
          updateSizes();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);
        removeResizeListener = () => window.removeEventListener("resize", onResize);
      }

      // fx2 — squash up from below
      const s2 = SplitText.create(".at-fx2", { type: "words, chars", mask: "chars" });
      gsap.fromTo(
        s2.chars,
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
        {
          ease: "back.inOut(2)", opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger: 0.03,
          scrollTrigger: { trigger: ".at-fx2", start: "center bottom+=50%", end: "bottom top+=40%", scrub: true },
        },
      );

      // fx5 — squash up from below (same reveal as fx2 / fx11)
      const s5 = SplitText.create(".at-fx5", { type: "words, chars", mask: "chars" });
      gsap.fromTo(
        s5.chars,
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
        {
          ease: "back.inOut(2)", opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, stagger: 0.02,
          scrollTrigger: { trigger: ".at-fx5", start: "center bottom+=50%", end: "bottom top+=40%", scrub: 1 },
        },
      );

      // fx3 — scale up from Y=0
      const s3 = SplitText.create(".at-fx3", { type: "words, chars", mask: "chars" });
      gsap.fromTo(
        s3.chars,
        { transformOrigin: "50% 0%", scaleY: 0 },
        {
          ease: "back", scaleY: 1, stagger: 0.012,
          scrollTrigger: { trigger: ".at-fx3", start: "center bottom-=5%", end: "center center", scrub: true },
        },
      );
    }, ref);

    return () => {
      removeResizeListener?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className="bg-navy-dark overflow-hidden relative" style={{ marginTop: "-90px", zIndex: 10 }}>
      <div className="flex flex-col lg:flex-row">

        {/* Story photo column — wave-scroll, desktop only */}
        <div ref={imgContainerRef} className="hidden lg:flex flex-col items-start overflow-hidden px-8 lg:w-1/2">
          {STORY_IMAGES.map((src, i) => (
            <div
              key={src}
              className="story-wave-image relative overflow-hidden"
              style={{ aspectRatio: ASPECT_RATIOS[i % ASPECT_RATIOS.length], willChange: "transform, clip-path" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="lg:w-1/2">

          {/* 1 — squash: main headline */}
          <div className="flex min-h-screen items-center justify-start px-8 py-24 lg:px-16">
            <h2
              className="at-fx2 font-serif text-white"
              style={{ fontSize: "clamp(1.4rem, 3vw, 3.2rem)", lineHeight: 1.15 }}
            >
              Our work is guided by a simple conviction: Carlo's story is not just one to remember, but one to live. By building a community rooted in faith, hope, and service, we hope to inspire others to use their own gifts to make Christ known in the world today.
            </h2>
          </div>

          {/* 2 — scatter: founding paragraph */}
          <div className="flex min-h-screen items-center justify-start px-8 py-24 lg:px-16">
            <p
              className="at-fx5 font-serif text-white/70 max-w-lg"
              style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", lineHeight: 1.6 }}
            >
              We bring together families, young adults, educators, clergy, and communities who are
              inspired by Carlo's witness. Through collaboration, events, educational initiatives,
              and digital experiences, we seek to create opportunities for people to encounter
              Christ and grow in their faith in meaningful and lasting ways.
            </p>
          </div>

          {/* 5 — scaleY: closing conviction */}
          <div className="flex min-h-screen items-center justify-start px-8 py-24 lg:px-16">
            <h2
              className="at-fx3 font-serif text-gold"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)", lineHeight: 1.15 }}
            >
              We believe the Church<br />is not behind the times.<br />She simply needs saints<br />— like Carlo —<br />to show the way.
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}
