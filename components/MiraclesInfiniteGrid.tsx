"use client";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import React, { useEffect, useRef, useState } from "react";
import { miracles, type Miracle } from "@/components/miracles-data";
import AnimateIn from "@/components/AnimateIn";

gsap.registerPlugin(Observer);

export default function MiraclesInfiniteGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Miracle | null>(null);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const pointerRef = useRef({ totalMoved: 0 });

  // Listen for country filter events from the map
  useEffect(() => {
    const handler = (e: Event) => {
      const { country } = (e as CustomEvent<{ country: string }>).detail;
      setFilterCountry(country);
    };
    window.addEventListener("miracles-filter", handler);
    return () => window.removeEventListener("miracles-filter", handler);
  }, []);

  // GSAP infinite scroll — only active when no filter is applied
  useEffect(() => {
    if (filterCountry) return;
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    // Reset position when re-entering unfiltered view
    gsap.set(container, { x: 0, y: 0 });

    const halfX = container.clientWidth / 2;
    const wrapX = gsap.utils.wrap(-halfX, 0);
    const xTo = gsap.quickTo(container, "x", {
      duration: 1.5,
      ease: "power4",
      modifiers: { x: gsap.utils.unitize(wrapX) },
    });

    const halfY = container.clientHeight / 2;
    const wrapY = gsap.utils.wrap(-halfY, 0);
    const yTo = gsap.quickTo(container, "y", {
      duration: 1.5,
      ease: "power4",
      modifiers: { y: gsap.utils.unitize(wrapY) },
    });

    let incrX = 0;
    let incrY = 0;

    const observer = Observer.create({
      target: section,
      type: "wheel,touch,pointer",
      onChangeX: (self) => {
        const delta =
          self.event.type === "wheel" ? -self.deltaX : self.deltaX * 2;
        if (self.event.type !== "wheel")
          pointerRef.current.totalMoved += Math.abs(self.deltaX);
        incrX += delta;
        xTo(incrX);
      },
      onChangeY: (self) => {
        const delta =
          self.event.type === "wheel" ? -self.deltaY : self.deltaY * 2;
        if (self.event.type !== "wheel")
          pointerRef.current.totalMoved += Math.abs(self.deltaY);
        incrY += delta;
        yTo(incrY);
      },
    });

    return () => {
      observer.kill();
    };
  }, [filterCountry]);

  const handlePointerDown = () => {
    pointerRef.current.totalMoved = 0;
  };

  const handleCardClick = (miracle: Miracle) => {
    if (pointerRef.current.totalMoved > 6) return;
    setSelected(miracle);
  };

  const displayedMiracles = filterCountry
    ? miracles.filter((m) => m.country === filterCountry)
    : miracles;

  const renderCards = (setKey: string) => (
    <div
      className="grid p-6"
      style={{
        gap: "10px",
        gridTemplateColumns: "repeat(11, 152px)",
      }}
      aria-hidden={setKey !== "orig" ? true : undefined}
    >
      {miracles.map((miracle, i) => (
        <div
          key={`${setKey}-${i}`}
          className="pointer-events-auto cursor-pointer select-none"
          onPointerDown={handlePointerDown}
          onClick={() => handleCardClick(miracle)}
        >
          <div className="border border-navy/10 rounded-sm p-3 bg-white hover:border-gold/50 hover:bg-cream transition-all duration-150 group h-full">
            <p className="text-gold-dark font-semibold text-[10px] tracking-wide leading-none mb-1.5">
              {miracle.year}
            </p>
            <p className="text-navy font-semibold text-xs leading-snug group-hover:text-navy-light transition-colors">
              {miracle.location}
            </p>
            <p className="text-navy/40 text-[9px] mt-0.5 leading-none">
              {miracle.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section id="miracles-grid" className="pt-12 pb-8 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          {filterCountry ? (
            /* Immediate render — no scroll-in animation when user actively filtered */
            <>
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                The Complete Exhibition
              </p>
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
                  {displayedMiracles.length} Miracle{displayedMiracles.length !== 1 ? "s" : ""}
                </h2>
                <span className="font-serif text-2xl md:text-3xl text-navy/50">
                  from {filterCountry}
                </span>
              </div>
              <button
                onClick={() => setFilterCountry(null)}
                className="mt-3 mb-4 inline-flex items-center gap-2 text-xs font-semibold text-gold-dark border border-gold/30 hover:border-gold hover:bg-gold/5 rounded-sm px-3 py-1.5 transition-all"
              >
                ← View all {miracles.length} miracles
              </button>
              <p className="text-navy/55 text-lg max-w-xl">
                {displayedMiracles.length} documented miracle{displayedMiracles.length !== 1 ? "s" : ""} from {filterCountry}. Click any card to read more.
              </p>
            </>
          ) : (
            /* Scroll-in animations for the initial unfiltered view */
            <>
              <AnimateIn>
                <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                  The Complete Exhibition
                </p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy mb-2">
                  {miracles.length} Miracles
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.15}>
                <p className="mt-4 text-navy/55 text-lg max-w-xl">
                  Pan or scroll to explore every miracle Carlo documented. Click any card to learn more.
                </p>
              </AnimateIn>
            </>
          )}
        </div>
      </section>

      {filterCountry ? (
        /* Static grid for filtered results */
        <div className="bg-cream pt-6 pb-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {displayedMiracles.map((miracle) => (
              <div
                key={miracle.id}
                className="cursor-pointer"
                onClick={() => setSelected(miracle)}
              >
                <div className="border border-navy/10 rounded-sm p-4 bg-white hover:border-gold/50 hover:bg-cream transition-all duration-150 group">
                  <p className="text-gold-dark font-semibold text-[10px] tracking-wide leading-none mb-1.5">
                    {miracle.year}
                  </p>
                  <p className="text-navy font-semibold text-sm leading-snug group-hover:text-navy-light transition-colors mb-1">
                    {miracle.location}
                  </p>
                  <p className="text-navy/40 text-[10px] leading-none mb-2">
                    {miracle.country}
                  </p>
                  <p className="text-navy/50 text-[10px] leading-relaxed line-clamp-2">
                    {miracle.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Infinite scroll grid */
        <div
          ref={sectionRef}
          className="relative h-[52vh] overflow-hidden bg-cream cursor-grab active:cursor-grabbing pb-24"
        >
          <div
            ref={containerRef}
            className="grid w-max grid-cols-2 will-change-transform pointer-events-none"
          >
            {renderCards("orig")}
            {renderCards("dup1")}
            {renderCards("dup2")}
            {renderCards("dup3")}
          </div>

          {/* Edge vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #f5f0e8 100%)",
            }}
          />
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-sm max-w-lg w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-1">
                  {selected.year} · {selected.country}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-navy leading-snug">
                  {selected.title}
                </h3>
                <p className="text-navy/50 text-sm mt-1">{selected.location}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-navy/30 hover:text-navy transition-colors text-xl leading-none flex-shrink-0 mt-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="h-px bg-cream-dark mb-5" />
            <p className="text-navy/65 leading-relaxed text-sm">
              {selected.description}
            </p>
            {selected.sources && selected.sources.length > 0 && (
              <div className="mt-5 pt-4 border-t border-cream-dark">
                <p className="text-navy/35 text-[9px] font-semibold tracking-[0.2em] uppercase mb-2">Sources</p>
                <ul className="space-y-1">
                  {selected.sources.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-dark hover:text-gold text-[10px] underline underline-offset-2 break-all transition-colors"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
