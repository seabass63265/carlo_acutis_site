"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  "/aboutus10.jpeg",
  "/aboutus11.jpeg",
  "/aboutus12.jpeg",
  "/aboutus13.jpeg",
  "/aboutus14.jpeg",
  "/aboutus15.jpeg",
  "/aboutus16.jpeg",
  "/aboutus17.jpeg",
  "/aboutus18.jpeg",
  "/aboutus19.jpeg",
  "/aboutus20.jpeg",
  "/aboutus21.jpeg",
  "/aboutus23.jpeg",
  "/aboutus24.jpeg",
  "/aboutus25.jpeg",
  "/aboutus26.jpeg",
  "/aboutus27.jpeg",
  "/aboutus28.jpeg",
  "/aboutus29.jpeg",
  "/aboutus30.jpeg",
  "/aboutus31.jpeg",
];

export default function PhotoGridScroll() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = Array.from(grid.querySelectorAll<HTMLElement>(".grid-full-item"));

    const ctx = gsap.context(() => {
      gsap.from(items, {
        yPercent: 20,
        autoAlpha: 0,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-cream">
      <div
        ref={gridRef}
        className="my-[6vh] grid w-full grid-cols-7 gap-2 px-4"
      >
        {IMAGES.map((src, i) => (
          <figure key={i} className="grid-full-item relative aspect-square overflow-hidden rounded">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
