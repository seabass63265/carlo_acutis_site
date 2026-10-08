import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/shared/AnimateIn";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("youth.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

/* The live application form. Once the Council is formed and applications close,
   swap this section for the "Annual Project" / "Meet the Council" content. */
const APPLICATION_URL = "https://form.jotform.com/262287157535060";

type Item = { title: string; body: string };
type Requirement = { value: string; label: string };

/* ─── Hero ───────────────────────────────────────────────────────────── */
async function Hero() {
  const t = await getTranslations("youth.hero");

  return (
    <section className="bg-cream pt-32 md:pt-44 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-navy leading-[0.95] mb-8">
              {t("title1")}
              <br />
              {t("title2")}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-navy/65 text-lg lg:text-xl leading-relaxed mb-10">
              {t("body")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.22}>
            <div className="flex flex-wrap gap-4">
              <a
                href={APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
              >
                {t("apply")}
              </a>
              <a
                href="#expectations"
                className="inline-block border border-navy/20 text-navy font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:border-navy/50 transition-colors"
              >
                {t("expected")}
              </a>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15} direction="left">
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-xl shadow-navy/10">
            <Image
              src="/youth-council/youthsitting.jpeg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Purpose ────────────────────────────────────────────────────────── */
async function Purpose() {
  const t = await getTranslations("youth.purpose");

  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <AnimateIn>
          <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
            {t("eyebrow")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
            {t("title")}
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimateIn delay={0.12}>
            <p className="text-navy/65 text-lg leading-relaxed">
              {t("body1")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.18}>
            <div className="bg-cream border border-cream-dark rounded-sm p-8">
              <p className="text-navy/70 text-base leading-relaxed">
                {t("body2Before")}{" "}
                <span className="font-semibold text-navy">{t("body2Emphasis")}</span>{" "}
                {t("body2After")}
              </p>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.24}>
          <Link
            href="/about#board"
            className="group inline-flex items-center gap-3 mt-12 border border-navy/20 text-navy font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:border-navy/50 transition-colors"
          >
            {t("meetBoard")}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Expectations ───────────────────────────────────────────────────── */
async function Expectations() {
  const t = await getTranslations("youth.expect");
  const responsibilities = t.raw("items") as Item[];

  return (
    <section id="expectations" className="bg-cream py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
            {t("eyebrow")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-6">
            {t("title")}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.12}>
          <p className="text-navy/60 text-lg leading-relaxed max-w-2xl mb-14">
            {t("intro")}
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {responsibilities.map(({ title, body }, i) => (
            <AnimateIn key={title} delay={i * 0.06}>
              <div className="bg-white border border-cream-dark rounded-sm p-7 h-full">
                <p className="font-serif text-xl font-semibold text-navy mb-3">
                  {title}
                </p>
                <p className="text-navy/60 text-sm leading-relaxed">{body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Who Can Apply ──────────────────────────────────────────────────── */
async function WhoCanApply() {
  const t = await getTranslations("youth.who");
  const requirements = t.raw("requirements") as Requirement[];

  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-12">
              {t("title")}
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {requirements.map(({ value, label }, i) => (
              <AnimateIn key={value} delay={i * 0.08}>
                <div className="bg-cream border border-cream-dark rounded-sm p-6 h-full">
                  <p className="font-serif text-2xl font-semibold text-gold mb-3">
                    {value}
                  </p>
                  <p className="text-navy/60 text-sm leading-relaxed">{label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={0.28}>
            <p className="text-navy/55 text-base leading-relaxed mt-10">
              {t("note")}
            </p>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.12} direction="left">
          <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-xl shadow-navy/10">
            <Image
              src="/youth-council/youth2.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Apply ──────────────────────────────────────────────────────────── */
async function Apply() {
  const t = await getTranslations("youth.apply");

  return (
    <section id="apply" className="bg-navy-dark py-28 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateIn>
          <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
            {t("eyebrow")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            {t("title")}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            {t("body")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-navy-dark font-semibold px-10 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
          >
            {t("cta")}
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}

export default function YouthCouncilPage() {
  return (
    <>
      <Hero />
      <Purpose />
      <Expectations />
      <WhoCanApply />
      <Apply />
      {/* TODO: once the Council is formed, add "Annual Project" and
          "Meet the Council" sections here, and retire the Apply section
          (or move it to a recruiting-window note). */}
    </>
  );
}
