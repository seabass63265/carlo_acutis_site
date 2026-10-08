"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { miracles, CONTINENT_MAP, CONTINENT_ORDER, type Miracle } from "@/components/eucharistic-miracles/miracles-data";
import AnimateIn from "@/components/shared/AnimateIn";

type SourceLabels = {
  sourcePanel: string;
  sourceExhibition: string;
  sourceWiki: string;
  sourceEwtn: string;
  sourcePea: string;
  sourceMagis: string;
};

function sourceLabel(url: string, labels: SourceLabels): { label: string; badge: "PDF" | "Wiki" | "Web" } {
  if (url.includes("/en/download/") && url.endsWith(".pdf"))
    return { label: labels.sourcePanel, badge: "PDF" };
  if (url.includes("miracolieucaristici.org"))
    return { label: labels.sourceExhibition, badge: "Web" };
  if (url.includes("wikipedia.org/wiki/")) {
    const slug = url.split("/wiki/")[1] ?? "";
    return { label: `${labels.sourceWiki} — ${decodeURIComponent(slug).replace(/_/g, " ")}`, badge: "Wiki" };
  }
  if (url.includes("ewtn.com"))
    return { label: labels.sourceEwtn, badge: "Web" };
  if (url.includes("perpetualeucharisticadoration.com"))
    return { label: labels.sourcePea, badge: "Web" };
  if (url.includes("magiscenter.com"))
    return { label: labels.sourceMagis, badge: "Web" };
  try {
    return { label: new URL(url).hostname.replace("www.", ""), badge: "Web" };
  } catch {
    return { label: url, badge: "Web" };
  }
}

// Every country appears in CONTINENT_MAP; miracles-data.ts is the source of
// truth for both, so this only matters if a new country is added to one and
// not the other.
const continentOf = (country: string) => CONTINENT_MAP[country] ?? "Other";

export default function MiraclesInfiniteGrid() {
  const t = useTranslations("miracles");
  const countryName = (c: string) => (t.has(`countries.${c}`) ? t(`countries.${c}`) : c);
  const yearText = (y: string) => y.replace(/ AD$/, ` ${t("yearAD")}`);
  const titleOf = (m: Miracle) => t(`entries.${m.id}.title`);
  const descOf = (m: Miracle) => t(`entries.${m.id}.description`);
  const sourceLabels: SourceLabels = {
    sourcePanel: t("grid.sourcePanel"),
    sourceExhibition: t("grid.sourceExhibition"),
    sourceWiki: t("grid.sourceWiki"),
    sourceEwtn: t("grid.sourceEwtn"),
    sourcePea: t("grid.sourcePea"),
    sourceMagis: t("grid.sourceMagis"),
  };
  const [selected, setSelected] = useState<Miracle | null>(null);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

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
  // against the old, taller layout and the page overshoots past the actual
  // cards into blank space below them.
  useEffect(() => {
    if (!filterCountry) return;
    const raf = requestAnimationFrame(() => {
      document.getElementById("miracles-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [filterCountry]);

  const displayedMiracles = filterCountry
    ? miracles.filter((m) => m.country === filterCountry)
    : miracles;

  const byContinent = CONTINENT_ORDER.map((continent) => {
    const items = miracles.filter((m) => continentOf(m.country) === continent);
    const countries = new Set(items.map((m) => m.country));
    return { continent, items, countryCount: countries.size };
  }).filter((group) => group.items.length > 0);

  const renderCard = (miracle: Miracle) => (
    <div
      key={miracle.id}
      className="cursor-pointer"
      onClick={() => setSelected(miracle)}
    >
      <div className="relative overflow-hidden rounded-sm group" style={{ aspectRatio: "3/4" }}>
        {miracle.image ? (
          <img
            src={miracle.image}
            alt={titleOf(miracle)}
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
          {yearText(miracle.year)}
        </p>
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white font-semibold text-xs leading-snug drop-shadow-sm">{miracle.location}</p>
          <p className="text-white/55 text-[10px] mt-0.5 leading-none">{countryName(miracle.country)}</p>
        </div>
      </div>
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
                {t("grid.titleFiltered", { count: displayedMiracles.length, country: countryName(filterCountry) })}
              </h2>
              <button
                onClick={() => setFilterCountry(null)}
                className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#C9A96E] border border-[#C9A96E]/30 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 rounded-sm px-3 py-1.5 transition-all"
              >
                {t("grid.viewAll", { count: miracles.length })}
              </button>
              <p className="text-white/50 text-lg max-w-xl">
                {t("grid.countFiltered", { count: displayedMiracles.length, country: countryName(filterCountry) })}
              </p>
            </>
          ) : (
            /* Scroll-in animations for the initial unfiltered view */
            <>
              <AnimateIn>
                <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#C9A96E] mb-5">
                  {t("grid.titleAll", { count: miracles.length })}
                </h2>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <p className="text-white/50 text-lg max-w-xl">
                  {t("grid.intro")}
                </p>
              </AnimateIn>
            </>
          )}
        </div>
      </section>

      {filterCountry ? (
        <div className="pt-6 pb-24 px-6" style={{ background: "#0d0d0d" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {displayedMiracles.map(renderCard)}
          </div>
        </div>
      ) : (
        /* Grouped by continent, same organization as the region list above */
        <div className="pt-6 pb-24 px-6" style={{ background: "#0d0d0d" }}>
          <div className="max-w-7xl mx-auto space-y-14">
            {byContinent.map(({ continent, items, countryCount }) => (
              <div key={continent}>
                <div className="flex items-center gap-4 mb-5">
                  <p className="text-[#C9A96E] font-semibold text-xs tracking-[0.2em] uppercase shrink-0">
                    {t(`map.continents.${continent}`)}
                  </p>
                  <div className="flex-1 h-px bg-white/10" />
                  <p className="text-white/35 text-[10px] tracking-widest uppercase shrink-0">
                    {t("map.countryCount", { count: countryCount })} · {t("map.miracleCount", { total: items.length })}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {items.map(renderCard)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-sm max-w-3xl md:max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.image && (
              <div className="md:w-2/5 flex-shrink-0 bg-[#0d0d0d] flex items-center justify-center max-h-64 md:max-h-none">
                <img
                  src={selected.image}
                  alt={titleOf(selected)}
                  className="w-full h-full max-h-64 md:max-h-[90vh] object-contain"
                />
              </div>
            )}
            <div className="p-8 overflow-y-auto md:flex-1">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-1">
                  {yearText(selected.year)} · {countryName(selected.country)}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-navy leading-snug">
                  {titleOf(selected)}
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
              {descOf(selected)}
            </p>
            {selected.sources && selected.sources.length > 0 && (
              <div className="mt-5 pt-4 border-t border-cream-dark">
                <p className="text-navy/35 text-[9px] font-semibold tracking-[0.2em] uppercase mb-2.5">{t("grid.sources")}</p>
                <ul className="space-y-2">
                  {selected.sources.map((url) => {
                    const { label, badge } = sourceLabel(url, sourceLabels);
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
