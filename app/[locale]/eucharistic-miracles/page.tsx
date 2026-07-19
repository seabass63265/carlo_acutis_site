import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import MiraclesIntroHero from "@/components/MiraclesIntroHero";
import MiraclesHeroClient from "@/components/MiraclesHeroClient";
import MiraclesMapClient from "@/components/MiraclesMapClient";
import MiraclesInfiniteGrid from "@/components/MiraclesInfiniteGrid";
import MiracleSkiper from "@/components/MiracleSkiper";
import { miracles } from "@/components/miracles-data";
import RegionCard from "@/components/RegionCard";

export const metadata: Metadata = {
  title: "Eucharistic Miracles",
  description:
    "Explore the 136 Eucharistic miracles documented by Carlo Acutis — physical signs of the Real Presence of Christ in the Eucharist.",
};

/* ─── Intro ──────────────────────────────────────────────────────────── */
function Intro() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimateIn>
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
                What Are Eucharistic Miracles?
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed mb-6">
                A Eucharistic miracle is an extraordinary, scientifically
                unexplained phenomenon connected to the Eucharist — most often
                the visible transformation of a consecrated Host into human
                tissue or the appearance of blood, verified by medical
                scientists around the world.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed mb-8">
                Carlo Acutis spent years researching, cataloguing, and
                presenting 136 of these miracles in a travelling digital
                exhibition. His work brought the evidence for the Real Presence
                of Christ to millions of people who had never heard these
                stories.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <blockquote className="border-l-2 border-gold pl-6">
                <p className="font-serif italic text-xl text-navy leading-relaxed mb-2">
                  &ldquo;The Eucharistic miracles are the greatest miracles
                  that Jesus has given us.&rdquo;
                </p>
                <cite className="text-navy/40 text-xs tracking-widest uppercase not-italic">
                  St. Carlo Acutis
                </cite>
              </blockquote>
            </AnimateIn>
          </div>

          {/* Photo */}
          <AnimateIn delay={0.2} direction="right">
            <div className="relative rounded-sm overflow-hidden max-w-md mx-auto">
              <img
                src="/carlo2.jpg"
                alt="Carlo Acutis"
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

const CONTINENT_MAP: Record<string, string> = {
  "Italy": "Europe", "Germany": "Europe", "France": "Europe", "Poland": "Europe",
  "Spain": "Europe", "Belgium": "Europe", "Austria": "Europe", "Czech Republic": "Europe",
  "Portugal": "Europe", "Netherlands": "Europe", "Switzerland": "Europe", "Hungary": "Europe",
  "Croatia": "Europe", "Lithuania": "Europe", "Romania": "Europe", "Ireland": "Europe",
  "Malta": "Europe", "Scotland": "Europe", "Slovakia": "Europe", "Serbia": "Europe",
  "Bulgaria": "Europe", "Slovenia": "Europe", "Luxembourg": "Europe", "Latvia": "Europe",
  "Sweden": "Europe", "Denmark": "Europe", "Cyprus": "Europe", "Ukraine": "Europe",
  "Argentina": "Americas", "Peru": "Americas", "Mexico": "Americas", "Chile": "Americas",
  "Venezuela": "Americas", "Canada": "Americas", "United States": "Americas",
  "Colombia": "Americas", "Ecuador": "Americas", "Brazil": "Americas",
  "Paraguay": "Americas", "Bolivia": "Americas", "Uruguay": "Americas",
  "Philippines": "Asia", "India": "Asia", "Japan": "Asia", "Indonesia": "Asia",
  "South Korea": "Asia", "Vietnam": "Asia", "Georgia": "Asia",
  "Egypt": "Middle East", "Israel": "Middle East", "Lebanon": "Middle East",
  "Nigeria": "Africa", "Uganda": "Africa", "South Africa": "Africa",
  "Kenya": "Africa", "Ethiopia": "Africa",
  "Australia": "Oceania", "New Zealand": "Oceania",
  "Martinique": "Americas",
  "Réunion": "Africa",
};

const CONTINENT_ORDER = ["Europe", "Americas", "Asia", "Middle East", "Africa", "Oceania"];

const byContinent = miracleRegions.reduce<Record<string, { name: string; count: number }[]>>(
  (acc, region) => {
    const c = CONTINENT_MAP[region.name] ?? "Other";
    (acc[c] ??= []).push(region);
    return acc;
  },
  {}
);

function WorldMap() {
  return (
    <section className="pt-24 pb-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* LEFT — heading + continent list */}
          <div>
            <AnimateIn>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-5">
                <span className="text-[#C9A96E]">Miracles </span>
                <span className="text-navy">Across the World</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="mt-5 text-navy/55 text-lg leading-relaxed">
                Carlo personally researched and catalogued <strong className="text-navy/75 font-semibold">136 miracles</strong> in his original travelling exhibition. This site documents <strong className="text-navy/75 font-semibold">188</strong> — Carlo&apos;s 136 plus 52 additional miracles drawn from diocesan records, hagiographic sources, and Catholic reference archives, all cited individually on each card.
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
                        {continent}
                      </p>
                      <div className="flex-1 h-px bg-navy/10" />
                      <p className="text-navy/35 text-[10px] tracking-widest uppercase shrink-0">
                        {regions.length} {regions.length === 1 ? "country" : "countries"} · {total} miracles
                      </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {regions.map(({ name, count }, i) => (
                        <AnimateIn key={name} delay={i * 0.04}>
                          <RegionCard name={name} count={count} />
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
              {[
                { value: `${miracles.length}`, label: "Documented miracles", sub: "spanning 6 continents" },
                { value: "750+", label: "Years of history", sub: "earliest from 500 AD" },
                { value: `${Object.keys(countryCounts).length}`, label: "Countries", sub: "represented in the exhibition" },
                { value: "8M+", label: "Visitors worldwide", sub: "since the exhibition launched" },
              ].map(({ value, label, sub }, i) => (
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
              <p className="text-navy/35 text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">Sources</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    label: "Carlo Acutis Exhibition",
                    detail: "Primary source. The official miracolieucaristici.org website hosts individual PDF panels for each of Carlo's 136 documented miracles — linked directly on each card where available.",
                    url: "https://www.miracolieucaristici.org/en/liste/list.html",
                    primary: true,
                  },
                  {
                    label: "Wikipedia",
                    detail: "Used for the most widely documented miracles where peer-reviewed encyclopaedic articles exist — including Lanciano, Bolsena, Sokółka, Legnica, Tixtla, Akita, Knock, Wilsnack, and the Holy Chalice of Valencia.",
                    url: "https://en.wikipedia.org",
                    primary: false,
                  },
                  {
                    label: "EWTN Catholic Library",
                    detail: "Theological library of Eternal Word Television Network. Used for the Buenos Aires 1996 miracle, approved by then-Archbishop Jorge Bergoglio.",
                    url: "https://www.ewtn.com",
                    primary: false,
                  },
                  {
                    label: "Perpetual Eucharistic Adoration",
                    detail: "Catholic apostolate that documents Eucharistic phenomena worldwide. Referenced for Betania (Venezuela, 1991) and Saint-André (Réunion, 1902).",
                    url: "https://perpetualeucharisticadoration.com",
                    primary: false,
                  },
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
                          <span className="text-[8px] font-bold tracking-widest uppercase bg-gold/15 text-gold-dark px-1.5 py-0.5 rounded-sm">Primary</span>
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

const SAINTHOOD_TIMELINE = [
  { year: "2013", event: "Beatification Miracle", detail: "Matheus Vianna — Brazil", highlight: false },
  { year: "2020", event: "Carlo Beatified", detail: "Assisi, Italy", highlight: true },
  { year: "2022", event: "Canonization Miracle", detail: "Valeria Valverde — Costa Rica", highlight: false },
  { year: "2025", event: "Carlo Canonized Saint", detail: "April 27, Rome", highlight: true },
];

function CanonizedThroughMiracles() {
  return (
    <section className="bg-[#080c18] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Intro + Timeline (left) / Miracle selector (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20 pb-16 border-b border-white/8">
          {/* Left: heading + description + timeline */}
          <div>
            <AnimateIn>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">
                The Path to Sainthood
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-5xl md:text-6xl font-semibold text-white leading-[1.05]">
                Canonized Through<br />Miracles
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-8 text-white/45 text-base leading-relaxed">
                Throughout history, the Church has carefully investigated miracles as signs of God&apos;s presence in the lives of the saints. In the case of Carlo Acutis, two extraordinary healings were examined by medical experts, theologians, and Vatican officials before being officially recognized as miracles.
              </p>
            </AnimateIn>

            {/* Timeline */}
            <div className="mt-14">
              <AnimateIn delay={0.25}>
                <p className="text-white/25 text-[9px] tracking-[0.4em] uppercase font-semibold mb-10">
                  Journey to Sainthood
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
              On April 27, 2025, Carlo Acutis was officially declared<br className="hidden md:block" /> a Saint of the Catholic Church.
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
      <MiraclesHeroClient
        eyebrow="The Eucharistic Miracles Exhibition"
        title={`${miracles.length} Miracles. One Message.`}
      />
      <Intro />
      <WorldMap />
      <MiraclesInfiniteGrid />
      <CanonizedThroughMiracles />
    </>
  );
}
