import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import PageHero from "@/components/PageHero";
import { Link } from "@/i18n/navigation";
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
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                Global Reach
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
                Miracles Across the World
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="mt-5 text-navy/55 text-lg">
                Carlo personally researched each documented miracle, tracing physical evidence of Christ&apos;s Real Presence across six continents.
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

        {/* ── Intro ── */}
        <div className="text-center mb-20 pb-16 border-b border-white/8">
          <AnimateIn>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">
              The Path to Sainthood
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-5xl md:text-7xl font-semibold text-white leading-[1.05]">
              Canonized Through<br />Miracles
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-8 text-white/45 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Throughout history, the Church has carefully investigated miracles as signs of God&apos;s presence in the lives of the saints. In the case of Carlo Acutis, two extraordinary healings were examined by medical experts, theologians, and Vatican officials before being officially recognized as miracles.
            </p>
          </AnimateIn>
        </div>

        {/* ── Interactive miracle selector ── */}
        <MiracleSkiper />

        {/* ── Timeline ── */}
        <div className="my-16 py-16 border-t border-b border-white/8">
          <AnimateIn>
            <p className="text-center text-white/25 text-[9px] tracking-[0.4em] uppercase font-semibold mb-14">
              Journey to Sainthood
            </p>
          </AnimateIn>
          <div className="flex flex-col items-center">
            {SAINTHOOD_TIMELINE.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <AnimateIn delay={i * 0.1}>
                  <div className={`flex items-center gap-6 py-2 transition-opacity ${item.highlight ? "opacity-100" : "opacity-55"}`}>
                    <div className="text-right w-16">
                      <span className={`font-mono text-base font-bold tabular-nums ${item.highlight ? "text-gold" : "text-white/50"}`}>
                        {item.year}
                      </span>
                    </div>
                    <div className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 ${item.highlight ? "bg-gold border-gold shadow-[0_0_10px_rgba(201,169,110,0.5)]" : "bg-transparent border-white/25"}`} />
                    <div className="w-56">
                      <p className={`font-semibold text-sm ${item.highlight ? "text-white" : "text-white/50"}`}>
                        {item.event}
                      </p>
                      <p className="text-white/25 text-xs mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                </AnimateIn>
                {i < SAINTHOOD_TIMELINE.length - 1 && (
                  <div className="w-px h-10 bg-gradient-to-b from-white/15 to-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing Quote ── */}
        <AnimateIn>
          <div className="mt-20 pt-16 border-t border-white/8 text-center">
            <blockquote className="mb-10">
              <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto italic">
                &ldquo;The Church does not canonize miracles. It canonizes saints. Miracles simply reveal the extraordinary ways God continues to work through them.&rdquo;
              </p>
            </blockquote>
            <div className="w-10 h-px bg-gold/40 mx-auto mb-10" />
            <p className="text-white text-base md:text-lg font-semibold tracking-wide">
              On April 27, 2025, Carlo Acutis was officially declared<br className="hidden md:block" /> a Saint of the Catholic Church.
            </p>
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}

/* ─── Educational Resources ──────────────────────────────────────────── */
function EducationalResources() {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Resources
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">
              For Parishes &amp; Schools
            </h2>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Video Presentation",
              description:
                "A professionally produced 20-minute documentary suitable for youth groups, RCIA, and adult faith formation.",
              action: "Request Access",
            },
            {
              title: "Travelling Exhibition",
              description:
                "Carlo's original 136-miracle travelling exhibition, available as printed panels or a downloadable digital format.",
              action: "Book the Exhibition",
            },
            {
              title: "Lesson Plans",
              description:
                "Downloadable curriculum packs for middle school, high school, and college students on the Eucharist and Carlo's work.",
              action: "Download Free",
            },
          ].map(({ title, description, action }, i) => (
            <AnimateIn key={title} delay={i * 0.1}>
              <div className="border border-white/10 rounded-sm p-8 hover:border-gold/30 hover:bg-white/[0.03] transition-all duration-300">
                <h3 className="font-serif text-xl text-white font-semibold mb-4">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{description}</p>
                <Link
                  href="/contact"
                  className="inline-block text-gold text-xs font-semibold tracking-wide hover:text-gold-light transition-colors"
                >
                  {action} →
                </Link>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EucharisticMiraclesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Eucharistic Miracles Exhibition"
        title={`${miracles.length} Miracles. One Message.`}
        crowdCanvas
      />
      <Intro />
      <WorldMap />
      <MiraclesInfiniteGrid />
      <CanonizedThroughMiracles />
      <EducationalResources />
    </>
  );
}
