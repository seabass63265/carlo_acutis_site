"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  "/about-us/aboutus10.jpeg",
  "/about-us/aboutus11.jpeg",
  "/about-us/aboutus12.jpeg",
  "/about-us/aboutus13.jpeg",
  "/about-us/aboutus14.jpeg",
  "/about-us/aboutus15.jpeg",
  "/about-us/aboutus16.jpeg",
  "/about-us/aboutus17.jpeg",
  "/about-us/aboutus18.jpeg",
  "/about-us/aboutus19.jpeg",
  "/about-us/aboutus20.jpeg",
  "/about-us/aboutus21.jpeg",
  "/about-us/aboutus23.jpeg",
  "/about-us/aboutus24.jpeg",
  "/about-us/aboutus25.jpeg",
  "/about-us/aboutus26.jpeg",
  "/about-us/aboutus27.jpeg",
  "/about-us/aboutus28.jpeg",
  "/about-us/aboutus29.jpeg",
  "/about-us/aboutus30.jpeg",
  "/about-us/aboutus31.jpeg",
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
