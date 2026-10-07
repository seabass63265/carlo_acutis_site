import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/AnimateIn";
import { Link } from "@/i18n/navigation";
import DonorsWall from "@/components/DonorsWall";
import DonateHero from "@/components/DonateHero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("donate.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

/* ─── Why Support ────────────────────────────────────────────────────── */
async function WhySupport() {
  const t = await getTranslations("donate.why");
  const metrics = [
    { value: "___", label: t("metrics.funds") },
    { value: "___", label: t("metrics.young") },
    { value: "6", label: t("metrics.communities") },
    { value: "< 15%", label: t("metrics.overhead") },
    { value: "100%", label: t("metrics.audited") },
    { value: "6", label: t("metrics.board") },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimateIn>
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                {t("eyebrow")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
                {t("title")}
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed mb-6">
                {t("body1")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed mb-8">
                {t("body2")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <Link
                href="#donate-now"
                className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
              >
                {t("cta")}
              </Link>
            </AnimateIn>
          </div>

          {/* Impact metrics */}
          <div className="grid grid-cols-2 gap-5">
            {metrics.map(({ value, label }, i) => (
              <AnimateIn key={label} delay={i * 0.08}>
                <div className="bg-cream border border-cream-dark rounded-sm p-6 hover:shadow-lg hover:shadow-navy/5 transition-all">
                  <p className="font-serif text-3xl font-semibold text-gold mb-1">{value}</p>
                  <p className="text-navy/60 text-xs leading-relaxed">{label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Photo strip ────────────────────────────────────────────────────── */
const photoStripSources = ["/aboutus26.jpeg", "/aboutus6.jpeg", "/Aboutus3.png"];

async function PhotoStrip() {
  const t = await getTranslations("donate.photos");
  const photoStrip = [
    { src: photoStripSources[0], alt: t("photo1") },
    { src: photoStripSources[1], alt: t("photo2") },
    { src: photoStripSources[2], alt: t("photo3") },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {photoStrip.map(({ src, alt }, i) => (
          <AnimateIn key={src} delay={i * 0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src={src} alt={alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}

/* ─── Ministry Partners ──────────────────────────────────────────────── */
type Partner = { name: string; location: string };

async function MinistryPartners() {
  const t = await getTranslations("donate.partners");
  const ministryPartners = t.raw("items") as Partner[];

  return (
    <section className="py-24 px-6 bg-cream" id="partners">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy mb-6">
              {t("title")}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-navy/60 text-lg leading-relaxed max-w-2xl mx-auto">
              {t("body")}
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ministryPartners.map(({ name, location }, i) => (
            <AnimateIn key={name} delay={(i % 2) * 0.08}>
              <div className="bg-white border border-cream-dark rounded-sm p-7 h-full flex flex-col">
                <p className="font-serif text-lg font-semibold text-navy leading-snug mb-3">
                  {name}
                </p>
                <p className="text-navy/50 text-sm mt-auto flex items-center gap-2">
                  <span className="text-gold text-[10px]">◆</span>
                  {location}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Giving Tiers ───────────────────────────────────────────────────── */
const tiers = [
  {
    name: "Digital Disciple",
    amount: "$25 / month",
    impact: "Provides digital resources for one youth group for a year.",
    features: [
      "Monthly impact report",
      "Exclusive newsletter",
      "Donor recognition",
    ],
    cta: "Become a Disciple",
    featured: false,
  },
  {
    name: "Digital Apostle",
    amount: "$100 / month",
    impact: "Sponsors an entire class of students through our curriculum program.",
    features: [
      "All Disciple benefits",
      "Signed certificate of appreciation",
      "Access to exclusive videos",
      "Priority event invitations",
    ],
    cta: "Become an Apostle",
    featured: true,
  },
  {
    name: "Mission Partner",
    amount: "$500 / month",
    impact: "Funds a full digital evangelization project for one parish.",
    features: [
      "All Apostle benefits",
      "Personal call with leadership",
      "Named in annual report",
      "Exhibition access for your parish",
    ],
    cta: "Become a Partner",
    featured: false,
  },
];

function GivingTiers() {
  return (
    <section className="py-24 px-6 bg-cream" id="donate-now">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Individual Giving
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              Choose Your Level of Support
            </h2>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map(({ name, amount, impact, features, cta, featured }, i) => (
            <AnimateIn key={name} delay={i * 0.1}>
              <div
                className={`flex flex-col h-full rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  featured
                    ? "border-2 border-gold shadow-xl shadow-gold/10 -mt-3"
                    : "border border-cream-dark hover:border-gold/30"
                }`}
              >
                {featured && (
                  <div className="bg-gold text-navy-dark text-[10px] font-bold tracking-widest uppercase text-center py-2">
                    Most Popular
                  </div>
                )}
                <div className={`flex-1 flex flex-col p-8 ${featured ? "bg-white" : "bg-white"}`}>
                  <p className="text-gold-dark text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">{name}</p>
                  <p className="font-serif text-3xl font-semibold text-navy mb-2">{amount}</p>
                  <p className="text-navy/55 text-sm leading-relaxed mb-6 pb-6 border-b border-cream-dark">{impact}</p>
                  <ul className="space-y-3 flex-1 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-navy/65">
                        <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full text-sm font-semibold py-4 rounded-sm transition-all duration-200 ${
                      featured
                        ? "bg-gold text-navy-dark hover:bg-gold-light"
                        : "bg-navy text-white hover:bg-navy-light"
                    }`}
                  >
                    {cta} →
                  </button>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.4}>
          <p className="text-center text-navy/40 text-sm mt-8">
            Prefer to give a one-time gift?{" "}
            <button className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors">
              Make a one-time donation →
            </button>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Institutional Giving ───────────────────────────────────────────── */
type Item = { title: string; body: string };

async function InstitutionalGiving() {
  const t = await getTranslations("donate.institutional");
  const items = t.raw("items") as Item[];

  return (
    <section className="py-24 px-6 bg-navy" id="institutional">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <AnimateIn>
              <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                {t("eyebrow")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8">
                {t("title")}
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                {t("body1")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {t("body2")}
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <Link
                href="/contact"
                className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
              >
                {t("cta")}
              </Link>
            </AnimateIn>
          </div>

          {/* What we offer */}
          <div className="space-y-4">
            {items.map(({ title, body }, i) => (
              <AnimateIn key={title} direction="left" delay={i * 0.08}>
                <div className="border border-white/10 rounded-sm p-6 hover:border-gold/30 transition-colors">
                  <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Corporate ──────────────────────────────────────────────────────── */
type CorporateItem = { title: string; description: string };

async function CorporatePartnerships() {
  const t = await getTranslations("donate.corporate");
  const items = t.raw("items") as CorporateItem[];

  return (
    <section className="py-24 px-6 bg-white" id="corporate">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              {t("title")}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-5 text-navy/55 text-lg max-w-2xl mx-auto">
              {t("body")}
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {items.map(({ title, description }, i) => (
            <AnimateIn key={title} delay={(i % 3) * 0.08}>
              <div className="border border-cream-dark rounded-sm p-8 hover:border-gold/30 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300">
                <div className="w-8 h-[2px] bg-gold mb-5" />
                <h3 className="font-serif text-xl font-semibold text-navy mb-3">{title}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3}>
          <div className="bg-navy rounded-sm p-10 text-center">
            <h3 className="font-serif text-3xl font-semibold text-white mb-4">
              {t("ctaTitle")}
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {t("ctaBody")}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
            >
              {t("cta")}
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────── */
async function FinalCTA() {
  const t = await getTranslations("donate.finalCta");

  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateIn>
          <div className="text-gold/25 font-serif text-8xl leading-none mb-4 select-none">&ldquo;</div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <blockquote className="font-serif text-3xl md:text-4xl text-white font-semibold italic leading-tight mb-8 text-balance">
            {t("quote")}
          </blockquote>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <cite className="block text-white/35 text-xs tracking-widest uppercase not-italic mb-10">
            {t("cite")}
          </cite>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <Link
            href="#donate-now"
            className="inline-block bg-gold text-navy-dark font-semibold px-10 py-5 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            {t("cta")}
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <WhySupport />
      <PhotoStrip />
      <MinistryPartners />
      <InstitutionalGiving />
      <CorporatePartnerships />
      <DonorsWall />
      <FinalCTA />
    </>
  );
}
