import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/shared/AnimateIn";
import MiraclesIntroHero from "@/components/eucharistic-miracles/MiraclesIntroHero";
import MiraclesMapClient from "@/components/eucharistic-miracles/MiraclesMapClient";
import MiraclesInfiniteGrid from "@/components/eucharistic-miracles/MiraclesInfiniteGrid";
import MiracleSkiper from "@/components/eucharistic-miracles/MiracleSkiper";
import { miracles, CONTINENT_MAP, CONTINENT_ORDER } from "@/components/eucharistic-miracles/miracles-data";
import RegionCard from "@/components/eucharistic-miracles/RegionCard";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("miracles.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

type Source = { label: string; detail: string };
type TimelineItem = { event: string; detail: string };

/* ─── Intro ──────────────────────────────────────────────────────────── */
async function Intro() {
  const t = await getTranslations("miracles.intro");

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
                {t("title")}
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed mb-6">
                {t("p1")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed mb-8">
                {t("p2")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <blockquote className="border-l-2 border-gold pl-6">
                <p className="font-serif italic text-xl text-navy leading-relaxed mb-2">
                  {t("quote")}
                </p>
                <cite className="text-navy/40 text-xs tracking-widest uppercase not-italic">
                  {t("quoteBy")}
                </cite>
              </blockquote>
            </AnimateIn>
          </div>

          {/* Photo */}
          <AnimateIn delay={0.2} direction="right">
            <div className="relative rounded-sm overflow-hidden max-w-md mx-auto">
              <img
                src="/eucharistic-miracles/carlo2.jpg"
                alt={t("photoAlt")}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

/* ─── World Map ──────────────────────────────────────────────────────── */
const countryCounts: Record<string, number> = {};
for (const m of miracles) {
  countryCounts[m.country] = (countryCounts[m.country] || 0) + 1;
}
const miracleRegions = Object.entries(countryCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([name, count]) => ({ name, count }));

const byContinent = miracleRegions.reduce<Record<string, { name: string; count: number }[]>>(
  (acc, region) => {
    const c = CONTINENT_MAP[region.name] ?? "Other";
    (acc[c] ??= []).push(region);
    return acc;
  },
  {}
);

async function WorldMap() {
  const t = await getTranslations("miracles.map");
  const tCountries = await getTranslations("miracles.countries");
  const countryName = (name: string) => (tCountries.has(name) ? tCountries(name) : name);
  const sources = t.raw("sourceList") as Source[];

  const statCards = [
    { value: `${miracles.length}`, label: t("statDocumented"), sub: t("statDocumentedSub") },
    { value: "750+", label: t("statYears"), sub: t("statYearsSub") },
    { value: `${Object.keys(countryCounts).length}`, label: t("statCountries"), sub: t("statCountriesSub") },
    { value: "8M+", label: t("statVisitors"), sub: t("statVisitorsSub") },
  ];

  return (
    <section className="pt-24 pb-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* LEFT — heading + continent list */}
          <div>
            <AnimateIn>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-5">
                <span className="text-[#C9A96E]">{t("titleGold")}</span>
                <span className="text-navy">{t("titleNavy")}</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="mt-5 text-navy/55 text-lg leading-relaxed">
                {t("introA")}<strong className="text-navy/75 font-semibold">{t("introB")}</strong>{t("introC")}<strong className="text-navy/75 font-semibold">{t("introD")}</strong>{t("introE")}
              </p>
            </AnimateIn>

            {/* Continent-grouped list */}
            <div className="mt-10 space-y-8">
              {CONTINENT_ORDER.map((continent) => {
                const regions = byContinent[continent];
                if (!regions?.length) return null;
                const total = regions.reduce((s, r) => s + r.count, 0);
                return (
                  <div key={continent}>
                    <div className="flex items-center gap-4 mb-3">
                      <p className="text-navy font-semibold text-xs tracking-[0.2em] uppercase shrink-0">
                        {t(`continents.${continent}`)}
                      </p>
                      <div className="flex-1 h-px bg-navy/10" />
                      <p className="text-navy/35 text-[10px] tracking-widest uppercase shrink-0">
                        {t("countryCount", { count: regions.length })} · {t("miracleCount", { total })}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {regions.map(({ name, count }, i) => (
                        <AnimateIn key={name} delay={i * 0.04}>
                          <RegionCard country={name} label={countryName(name)} count={count} />
                        </AnimateIn>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — stats + map (sticky) */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {statCards.map(({ value, label, sub }, i) => (
                <AnimateIn key={label} delay={i * 0.1}>
                  <div className="bg-cream border border-cream-dark rounded-sm p-6 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300">
                    <p className="font-serif text-3xl font-semibold text-gold mb-1">{value}</p>
                    <p className="text-navy font-semibold text-sm mb-1">{label}</p>
                    <p className="text-navy/45 text-xs">{sub}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
            <AnimateIn direction="none" delay={0.2}>
              <div className="rounded-sm overflow-hidden border border-navy/10">
                <MiraclesMapClient />
              </div>
            </AnimateIn>

            {/* Sources attribution */}
            <div className="mt-5 pt-5 border-t border-navy/8">
              <p className="text-navy/35 text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">{t("sources")}</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { ...sources[0], url: "https://www.miracolieucaristici.org/en/liste/list.html", primary: true },
                  { ...sources[1], url: "https://en.wikipedia.org", primary: false },
                  { ...sources[2], url: "https://www.ewtn.com", primary: false },
                  { ...sources[3], url: "https://perpetualeucharisticadoration.com", primary: false },
                ].map(({ label, detail, url, primary }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-sm border border-navy/8 hover:border-navy/20 hover:bg-navy/[0.02] transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-semibold text-navy/70 group-hover:text-navy transition-colors">{label}</span>
                        {primary && (
                          <span className="text-[8px] font-bold tracking-widest uppercase bg-gold/15 text-gold-dark px-1.5 py-0.5 rounded-sm">{t("primary")}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-navy/40 leading-relaxed">{detail}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Canonized Through Miracles ────────────────────────────────────── */
const SAINTHOOD_YEARS = [
  { year: "2013", highlight: false },
  { year: "2020", highlight: true },
  { year: "2022", highlight: false },
  { year: "2025", highlight: true },
];

async function CanonizedThroughMiracles() {
  const t = await getTranslations("miracles.canonized");
  const timeline = t.raw("timeline") as TimelineItem[];
  const SAINTHOOD_TIMELINE = SAINTHOOD_YEARS.map((y, i) => ({ ...y, ...timeline[i] }));

  return (
    <section className="bg-[#080c18] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Intro + Timeline (left) / Miracle selector (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20 pb-16 border-b border-white/8">
          {/* Left: heading + description + timeline */}
          <div>
            <AnimateIn>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">
                {t("eyebrow")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
                {t("titleLine1")}<br />{t("titleLine2")}
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-8 text-white/45 text-base leading-relaxed">
                {t("body")}
              </p>
            </AnimateIn>

            {/* Timeline */}
            <div className="mt-14">
              <AnimateIn delay={0.25}>
                <p className="text-white/25 text-[9px] tracking-[0.4em] uppercase font-semibold mb-10">
                  {t("journey")}
                </p>
              </AnimateIn>
              <div className="flex flex-col">
                {SAINTHOOD_TIMELINE.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <AnimateIn delay={0.3 + i * 0.1}>
                      <div className={`flex items-center gap-6 py-2 transition-opacity ${item.highlight ? "opacity-100" : "opacity-55"}`}>
                        <div className="text-right w-16 shrink-0">
                          <span className={`font-mono text-base font-bold tabular-nums ${item.highlight ? "text-gold" : "text-white/50"}`}>
                            {item.year}
                          </span>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full border-2 shrink-0 ${item.highlight ? "bg-gold border-gold shadow-[0_0_10px_rgba(201,169,110,0.5)]" : "bg-transparent border-white/25"}`} />
                        <div>
                          <p className={`font-semibold text-sm ${item.highlight ? "text-white" : "text-white/50"}`}>
                            {item.event}
                          </p>
                          <p className="text-white/25 text-xs mt-0.5">{item.detail}</p>
                        </div>
                      </div>
                    </AnimateIn>
                    {i < SAINTHOOD_TIMELINE.length - 1 && (
                      <div className="ml-[94px] w-px h-8 bg-gradient-to-b from-white/15 to-white/5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: interactive miracle selector */}
          <AnimateIn delay={0.15} direction="right">
            <MiracleSkiper />
          </AnimateIn>
        </div>

        <AnimateIn>
          <div className="mt-8 text-center">
            <p className="text-white text-base md:text-lg font-semibold tracking-wide">
              {t("closingA")}<br className="hidden md:block" /> {t("closingB")}
            </p>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}

export default function EucharisticMiraclesPage() {
  return (
    <>
      <MiraclesIntroHero />
      <Intro />
      <WorldMap />
      <MiraclesInfiniteGrid />
      <CanonizedThroughMiracles />
    </>
  );
}
