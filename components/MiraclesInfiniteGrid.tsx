"use client";

import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import React, { useEffect, useRef, useState } from "react";
import { miracles, type Miracle } from "@/components/miracles-data";
import AnimateIn from "@/components/AnimateIn";

gsap.registerPlugin(Observer);

function sourceLabel(url: string): { label: string; badge: "PDF" | "Wiki" | "Web" } {
  if (url.includes("/en/download/") && url.endsWith(".pdf"))
    return { label: "Carlo Acutis Exhibition — individual panel", badge: "PDF" };
  if (url.includes("miracolieucaristici.org"))
    return { label: "Carlo Acutis Eucharistic Miracles Exhibition", badge: "Web" };
  if (url.includes("wikipedia.org/wiki/")) {
    const slug = url.split("/wiki/")[1] ?? "";
    return { label: `Wikipedia — ${decodeURIComponent(slug).replace(/_/g, " ")}`, badge: "Wiki" };
  }
  if (url.includes("ewtn.com"))
    return { label: "EWTN — Catholic Library", badge: "Web" };
  if (url.includes("perpetualeucharisticadoration.com"))
    return { label: "Perpetual Eucharistic Adoration", badge: "Web" };
  if (url.includes("magiscenter.com"))
    return { label: "Magis Center", badge: "Web" };
  try {
    return { label: new URL(url).hostname.replace("www.", ""), badge: "Web" };
  } catch {
    return { label: url, badge: "Web" };
  }
}

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

  // Scroll the grid into view only after the filtered (much shorter) layout has
  // painted — scrolling immediately on the map-click event races the browser's
  // smooth-scroll against React's re-render, so the target position is computed
  // against the old, taller infinite-scroll layout and the page overshoots past
  // the actual cards into blank space below them.
  useEffect(() => {
    if (!filterCountry) return;
    const raf = requestAnimationFrame(() => {
      document.getElementById("miracles-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [filterCountry]);

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
    let lastInteraction = Date.now();
    let isAutoScrolling = false;

    const AUTO_DELAY = 3000;
    const AUTO_SPEED = 0.4;

    const ticker = gsap.ticker.add(() => {
      const idle = Date.now() - lastInteraction > AUTO_DELAY;
      if (idle && !isAutoScrolling) isAutoScrolling = true;
      if (!idle && isAutoScrolling) isAutoScrolling = false;
      if (isAutoScrolling) {
        incrX -= AUTO_SPEED;
        incrY -= AUTO_SPEED * 0.55;
        xTo(incrX);
        yTo(incrY);
      }
    });

    const resetIdle = () => { lastInteraction = Date.now(); };
    idleResetRef.current = resetIdle;

    const observer = Observer.create({
      target: section,
      type: "wheel,touch,pointer",
      onChangeX: (self) => {
        resetIdle();
        const delta =
          self.event.type === "wheel" ? -self.deltaX : self.deltaX * 2;
        if (self.event.type !== "wheel")
          pointerRef.current.totalMoved += Math.abs(self.deltaX);
        incrX += delta;
        xTo(incrX);
      },
      onChangeY: (self) => {
        resetIdle();
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
      gsap.ticker.remove(ticker);
    };
  }, [filterCountry]);

  const idleResetRef = useRef<(() => void) | null>(null);

  const handlePointerDown = () => {
    pointerRef.current.totalMoved = 0;
    idleResetRef.current?.();
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
      className="grid p-4"
      style={{
        gap: "8px",
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
          <div className="relative overflow-hidden rounded-sm group" style={{ height: 196 }}>
            {miracle.image ? (
              <img
                src={miracle.image}
                alt={miracle.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[#1c1c1c] flex items-center justify-center">
                <span className="text-white/10 text-4xl font-serif font-bold">{miracle.location[0]}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70 pointer-events-none" />
            <p className="absolute top-2 left-2 text-[#C9A96E] text-[9px] font-semibold tracking-wide leading-none drop-shadow-sm">
              {miracle.year}
            </p>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white font-semibold text-[10px] leading-snug drop-shadow-sm">{miracle.location}</p>
              <p className="text-white/55 text-[8px] mt-0.5 leading-none">{miracle.country}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section id="miracles-grid" className="pt-12 pb-8 px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-7xl mx-auto">
          {filterCountry ? (
            /* Immediate render — no scroll-in animation when user actively filtered */
            <>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#C9A96E] mb-5">
                The Complete Exhibition — {displayedMiracles.length} Miracle{displayedMiracles.length !== 1 ? "s" : ""} from {filterCountry}
              </h2>
              <button
                onClick={() => setFilterCountry(null)}
                className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#C9A96E] border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 rounded-sm px-3 py-1.5 transition-all"
              >
                ← View all {miracles.length} miracles
              </button>
              <p className="text-white/50 text-lg max-w-xl">
                {displayedMiracles.length} documented miracle{displayedMiracles.length !== 1 ? "s" : ""} from {filterCountry}. Click any card to read more.
              </p>
            </>
          ) : (
            /* Scroll-in animations for the initial unfiltered view */
            <>
              <AnimateIn>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#C9A96E] mb-5">
                  The Complete Exhibition — {miracles.length} Miracles
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <p className="text-white/50 text-lg max-w-xl">
                  Pan or scroll to explore every miracle Carlo documented. Click any card to learn more.
                </p>
              </AnimateIn>
            </>
          )}
        </div>
      </section>

      {filterCountry ? (
        /* Static grid for filtered results — keyed so React always mounts a
           fresh node here instead of reusing the infinite-scroll grid's DOM
           element, which GSAP moves around with a raw `transform` outside of
           React's tracking (a stale transform inherited that way would shove
           this grid off-screen and make its cards unclickable). */
        <div key="filtered" className="pt-6 pb-24 px-6" style={{ background: "#0d0d0d" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {displayedMiracles.map((miracle) => (
              <div
                key={miracle.id}
                className="cursor-pointer"
                onClick={() => setSelected(miracle)}
              >
                <div className="relative overflow-hidden rounded-sm group" style={{ aspectRatio: "3/4" }}>
                  {miracle.image ? (
                    <img
                      src={miracle.image}
                      alt={miracle.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1c1c1c] flex items-center justify-center">
                      <span className="text-white/10 text-5xl font-serif font-bold">{miracle.location[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70 pointer-events-none" />
                  <p className="absolute top-2 left-2 text-[#C9A96E] text-[9px] font-semibold tracking-wide leading-none drop-shadow-sm">
                    {miracle.year}
                  </p>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white font-semibold text-xs leading-snug drop-shadow-sm">{miracle.location}</p>
                    <p className="text-white/55 text-[10px] mt-0.5 leading-none">{miracle.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Infinite scroll grid */
        <div
          key="infinite"
          ref={sectionRef}
          className="relative h-[75vh] overflow-hidden cursor-grab active:cursor-grabbing pb-24"
          style={{ background: "#0d0d0d" }}
        >
          <div
            ref={containerRef}
            className="grid w-max grid-cols-2 will-change-transform pointer-events-none"
          >
            {renderCards("orig")}
            {renderCards("dup1")}
            {renderCards("dup2")}
            {renderCards("dup3")}
            {renderCards("dup4")}
            {renderCards("dup5")}
            {renderCards("dup6")}
            {renderCards("dup7")}
          </div>

          {/* Edge vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, #0d0d0d 100%)",
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
            className="bg-white rounded-sm max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image && (
              <div className="h-48 overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            <div className="p-8">
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
                <p className="text-navy/35 text-[9px] font-semibold tracking-[0.2em] uppercase mb-2.5">Sources</p>
                <ul className="space-y-2">
                  {selected.sources.map((url) => {
                    const { label, badge } = sourceLabel(url);
                    return (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-2 hover:opacity-80 transition-opacity"
                        >
                          <span className={`mt-0.5 shrink-0 text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-sm ${
                            badge === "PDF"  ? "bg-gold/15 text-gold-dark" :
                            badge === "Wiki" ? "bg-navy/8 text-navy/50" :
                                              "bg-navy/6 text-navy/40"
                          }`}>{badge}</span>
                          <span className="text-[11px] text-navy/60 group-hover:text-navy/80 leading-snug transition-colors underline underline-offset-2 decoration-navy/20">
                            {label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
