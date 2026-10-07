import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { getLocale, getTranslations } from "next-intl/server";
import AnimateIn from "@/components/AnimateIn";
import HomeHero from "@/components/HomeHero";
import CarloStoryButton from "@/components/CarloStoryButton";
import NewsGrid, { type NewsCard } from "@/components/NewsGrid";
import WipeLink from "@/components/WipeLink";
import { getFacebookPosts, type FacebookPost } from "@/lib/facebook";

/* ─── Mission ────────────────────────────────────────────────────────── */
async function Mission() {
  const t = await getTranslations("home.mission");

  return (
    <section className="overflow-hidden bg-navy-dark">

      {/* Headline + icon */}
      <div className="px-6 pt-20 pb-14 text-center">
        <AnimateIn>
          <h2
            className="font-sans font-black uppercase leading-[0.88] tracking-tight text-balance mx-auto text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", maxWidth: "860px" }}
          >
            {t("headlineLine1")}<br />{t("headlineLine2")}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <div className="mt-8 flex justify-center text-gold opacity-70">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 4C11.373 4 6 9.373 6 16V32H30V16C30 9.373 24.627 4 18 4Z" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <path d="M18 4V32M6 20H30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </AnimateIn>
      </div>

      {/* ── Two mirrored arch panels — edge-to-edge ── */}
      <div className="flex flex-col lg:flex-row lg:gap-2">

        {/* Left: text — arch on top-right corner only */}
        <div
          className="relative w-full lg:w-1/2 flex flex-col justify-end lg:justify-center pb-16 lg:pb-0 px-10 lg:px-16 pt-8"
          style={{ height: "clamp(420px, 50vw, 640px)" }}
        >
          {/* Subtle gold-tinted arch layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "0 clamp(200px, 24vw, 340px) 0 0",
              backgroundColor: "rgba(201,169,110,0.07)",
            }}
          />
          <div className="relative z-10">
            <AnimateIn direction="left">
              <p className="text-white/50 text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-6">
                {t("eyebrow")}
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.1}>
              <p
                className="font-serif font-semibold text-gold leading-snug mb-10"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)" }}
              >
                {t("body")}
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <WipeLink
                  href="/about"
                  className="bg-gold text-navy-dark text-sm font-semibold px-6 py-3 transition-all duration-200 hover:bg-gold-light"
                >
                  {t("aboutUs")}
                </WipeLink>
                <WipeLink
                  href="/contact"
                  className="text-white text-sm font-semibold px-6 py-3 transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(201,169,110,0.45)" }}
                >
                  {t("stayConnected")}
                </WipeLink>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Right: image — arch on top-left corner only */}
        <div className="w-full lg:w-1/2">
          <AnimateIn direction="left">
            <div
              className="relative overflow-hidden w-full"
              style={{
                height: "clamp(420px, 50vw, 640px)",
                borderRadius: "clamp(200px, 24vw, 340px) 0 0 0",
              }}
            >
              <Image
                src="/calro1.webp"
                alt={t("imageAlt")}
                fill
                className="object-cover object-center"
              />
            </div>
          </AnimateIn>
        </div>

      </div>
    </section>
  );
}

/* ─── Who Was Carlo? ─────────────────────────────────────────────────── */
async function WhoWasCarlo() {
  const t = await getTranslations("home.who");

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src="/youngcarlo.png"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient overlay for quote readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold font-serif italic text-xl leading-relaxed mb-2">
                    {t("quote")}
                  </p>
                  <p className="text-white/50 text-xs tracking-widest uppercase">{t("quoteBy")}</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gold text-navy-dark font-serif text-sm px-6 py-3 shadow-xl">
                <span className="font-bold">1991</span>
                <span className="mx-2 opacity-50">–</span>
                <span className="font-bold">2006</span>
              </div>
            </div>
          </AnimateIn>

          <div className="space-y-6 order-1 lg:order-2">
            <AnimateIn direction="left">
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase">
                {t("eyebrow")}
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight">
                {t("title")}
              </h2>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed">{t("p1")}</p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed">{t("p2")}</p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.25}>
              <div className="flex gap-8 pt-4 border-t border-cream-dark">
                {[
                  { value: t("statAgeValue"), label: t("statAgeLabel") },
                  { value: t("statMiraclesValue"), label: t("statMiraclesLabel") },
                  { value: t("statCanonizedValue"), label: t("statCanonizedLabel") },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-serif text-3xl font-semibold text-gold">{value}</p>
                    <p className="text-navy/50 text-xs mt-1 leading-tight max-w-[80px]">{label}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.3}>
              <CarloStoryButton className="inline-block mt-2 bg-navy text-white text-sm font-semibold px-8 py-4 rounded-sm hover:bg-navy-light transition-colors duration-200">
                {t("cta")}
              </CarloStoryButton>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Initiatives ────────────────────────────────────────────────────── */
function CardMeta({ number, tags }: { number: string; tags: string[] }) {
  return (
    <div className="flex items-center gap-3 font-sans text-[9px] tracking-[0.2em] uppercase text-white/40 mb-4">
      <span className="text-gold text-[11px] font-medium">{number}</span>
      {tags.map((tag) => (
        <span key={tag} className="flex items-center gap-3">
          <span className="w-px h-2.5 bg-white/10" />
          {tag}
        </span>
      ))}
    </div>
  );
}

function CardTitle({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h3 className="relative font-sans text-lg tracking-[0.15em] uppercase text-white mb-3 pb-3 w-fit">
      {children}
      <span
        className={`absolute bottom-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-10 ${
          center ? "left-1/2 -translate-x-1/2" : "left-0"
        }`}
      />
    </h3>
  );
}

function CardLink({ text, href = "#" }: { text: string; href?: string }) {
  return (
    <WipeLink
      href={href}
      className="inline-flex items-center gap-3 mt-6 font-sans text-[9px] tracking-[0.2em] uppercase text-white hover:text-gold transition-colors duration-300"
    >
      {text}
      <FiArrowRight className="text-gold transition-transform duration-300 group-hover:translate-x-1" />
    </WipeLink>
  );
}

async function Initiatives() {
  const t = await getTranslations("home.initiatives");

  return (
    <section className="relative overflow-hidden bg-navy-dark py-24 md:py-40 px-6 md:px-[5vw]">
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-[5vw] w-px bg-white/5" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/5 hidden lg:block" />
        <div className="absolute inset-y-0 right-[5vw] w-px bg-white/5" />
      </div>

      {/* Faint watermark */}
      <div
        className="absolute top-[22%] -left-[5%] font-sans font-light uppercase tracking-[0.1em] text-white/[0.025] whitespace-nowrap pointer-events-none select-none"
        style={{ fontSize: "15vw" }}
      >
        {t("watermark")}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimateIn>
          <p className="flex items-center gap-4 text-gold text-[10px] font-semibold tracking-[0.3em] uppercase mb-6">
            {t("eyebrow")}
            <span className="h-px w-10 bg-gold" />
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h2 className="mb-16 md:mb-24">
            <span className="block font-sans text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-white">
              {t("titleTop")}
            </span>
            <em className="block font-serif italic text-5xl md:text-6xl text-white mt-2">{t("titleBottom")}</em>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 01 — Youth Outreach */}
          <AnimateIn
            delay={0.15}
            className="group lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 lg:pr-10 lg:border-r lg:border-white/10"
          >
            <CardMeta number="01" tags={t.raw("card01.tags") as string[]} />
            <div className="relative w-full h-[280px] lg:h-[600px] overflow-hidden bg-navy mb-6">
              <Image
                src="/aboutus43.jpeg"
                alt={t("card01.imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardTitle>{t("card01.title")}</CardTitle>
            <p className="text-white/40 text-base font-light leading-relaxed max-w-[80%]">
              {t("card01.body")}
            </p>
            <CardLink text={t("contactUs")} href="/contact" />
          </AnimateIn>

          {/* 02 — Digital Outreach */}
          <AnimateIn
            delay={0.2}
            className="group lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 lg:pl-10 lg:top-20 lg:relative"
          >
            <CardMeta number="02" tags={t.raw("card02.tags") as string[]} />
            <div className="relative w-full h-[240px] lg:h-[350px] overflow-hidden bg-navy mb-6">
              <Image
                src="/aboutus15.jpeg"
                alt={t("card02.imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardTitle>{t("card02.title")}</CardTitle>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-[90%]">
              {t("card02.body")}
            </p>
            <CardLink text={t("contactUs")} href="/contact" />
          </AnimateIn>

          {/* 03 — Educational Resources */}
          <AnimateIn
            delay={0.25}
            className="group lg:col-start-2 lg:col-span-4 lg:row-start-4 lg:row-span-2 lg:mt-16 flex flex-col items-start lg:items-center lg:text-center"
          >
            <CardMeta number="03" tags={t.raw("card03.tags") as string[]} />
            <div className="relative w-full h-[280px] lg:w-[280px] lg:h-[280px] lg:rounded-full overflow-hidden bg-navy mb-8 lg:mx-auto">
              <Image
                src="/aboutus17.jpeg"
                alt={t("card03.imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardTitle center>{t("card03.title")}</CardTitle>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-[90%]">
              {t("card03.body")}
            </p>
            <CardLink text={t("discoverMiracles")} href="/eucharistic-miracles" />
          </AnimateIn>

          {/* 04 — Future Projects */}
          <AnimateIn
            delay={0.3}
            className="group lg:col-start-7 lg:col-span-6 lg:row-start-3 lg:row-span-3 lg:pl-10 lg:border-t lg:border-white/10 lg:pt-10 lg:mt-10"
          >
            <div className="relative w-full h-[240px] overflow-hidden bg-navy mb-8">
              <Image
                src="/aboutus21.jpeg"
                alt={t("card04.imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardMeta number="04" tags={t.raw("card04.tags") as string[]} />
            <CardTitle>{t("card04.title")}</CardTitle>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              {t("card04.body")}
            </p>
            <CardLink text={t("contactUs")} href="/contact" />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

/* ─── News ───────────────────────────────────────────────────────────── */
// Shown whenever FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN aren't set, or
// the Graph API request fails — keeps the section populated either way.
const FALLBACK_POST_IMAGE = "/gallery/church-dome.jpg";

function fbPostToCard(post: FacebookPost, locale: string, fallbackTitle: string): NewsCard {
  const message = post.message ?? "";
  const firstLine = message.split("\n")[0] ?? "";
  const title = firstLine.length > 90 ? `${firstLine.slice(0, 87)}…` : firstLine;
  return {
    date: new Date(post.created_time).toLocaleDateString(locale, { month: "long", year: "numeric" }),
    tag: "Facebook",
    title: title || fallbackTitle,
    excerpt: message,
    href: post.permalink_url,
    external: true,
    image: post.full_picture || FALLBACK_POST_IMAGE,
  };
}

async function LatestNews() {
  const t = await getTranslations("home.news");
  const locale = await getLocale();
  const posts = await getFacebookPosts(24);

  const fallbackNewsItems: NewsCard[] = [
    {
      date: t("fallback1Date"),
      tag: t("fallback1Tag"),
      title: t("fallback1Title"),
      excerpt: t("fallback1Excerpt"),
      href: "#",
      external: false,
      image: "/gallery/vatican-square.jpg",
    },
    {
      date: t("fallback2Date"),
      tag: t("fallback2Tag"),
      title: t("fallback2Title"),
      excerpt: t("fallback2Excerpt"),
      href: "#",
      external: false,
      image: "/gallery/cathedral-interior.jpg",
    },
    {
      date: t("fallback3Date"),
      tag: t("fallback3Tag"),
      title: t("fallback3Title"),
      excerpt: t("fallback3Excerpt"),
      href: "#",
      external: false,
      image: "/gallery/candles-church.jpg",
    },
  ];

  const newsItems =
    posts && posts.length > 0
      ? posts.map((post) => fbPostToCard(post, locale, t("viewOnFacebook")))
      : fallbackNewsItems;

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              {t("title")}
            </h2>
          </AnimateIn>
        </div>

        <NewsGrid items={newsItems} />
      </div>
    </section>
  );
}

/* ─── Quote Banner ───────────────────────────────────────────────────── */
async function QuoteBanner() {
  const t = await getTranslations("home.quote");

  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn>
          <div className="text-gold/25 font-serif text-9xl leading-none mb-4 select-none">&ldquo;</div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-semibold italic leading-tight text-balance">
            {t("text")}
          </blockquote>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <cite className="block mt-8 text-white/40 text-sm tracking-widest uppercase not-italic">
            {t("cite")}
          </cite>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <div className="mt-10">
            <WipeLink href="/carlo" className="text-gold text-sm font-semibold hover:text-gold-light tracking-wide transition-colors">
              {t("cta")}
            </WipeLink>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Ways to Support ────────────────────────────────────────────────── */
async function WaysToSupport() {
  const t = await getTranslations("home.support");

  const supportOptions = [
    {
      number: "01",
      titleLines: [t("option01Title1"), t("option01Title2")],
      description: t("option01Body"),
      cta: t("option01Cta"),
      href: "/donate" as const,
      barClass: "bg-gold",
      numberClass: "text-gold/40",
      ctaClass: "bg-gold text-navy-dark hover:bg-gold-light",
    },
    {
      number: "02",
      titleLines: [t("option02Title1"), t("option02Title2")],
      description: t("option02Body"),
      cta: t("option02Cta"),
      href: "/donate" as const,
      barClass: "bg-navy",
      numberClass: "text-navy/20",
      ctaClass: "bg-navy text-white hover:bg-navy-light",
    },
    {
      number: "03",
      titleLines: [t("option03Title1"), t("option03Title2")],
      description: t("option03Body"),
      cta: t("option03Cta"),
      href: "/donate" as const,
      barClass: "bg-navy",
      numberClass: "text-navy/20",
      ctaClass: "bg-navy text-white hover:bg-navy-light",
    },
  ];

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <AnimateIn>
            <div className="flex flex-col items-center gap-6">
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase">
                {t("eyebrow")}
              </p>
              <span className="w-12 h-px bg-gold/50" />
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-navy mt-8 mb-6 leading-tight">
              {t("title")}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-lg md:text-xl text-navy/55 font-light leading-relaxed">
              {t("subtitle")}
            </p>
          </AnimateIn>
        </div>

        <div className="border-t border-navy/10">
          {supportOptions.map((opt, i) => (
            <AnimateIn key={opt.number} delay={i * 0.1}>
              <div className="group relative flex flex-col lg:flex-row lg:items-center py-10 lg:py-14 border-b border-navy/10 transition-colors duration-500 hover:bg-white/70 -mx-6 px-6 lg:-mx-12 lg:px-12">
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1 ${opt.barClass} scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center hidden lg:block`}
                />

                <div className="w-full lg:w-4/12 flex items-start gap-5 mb-6 lg:mb-0 pr-8">
                  <span className={`font-serif italic text-3xl mt-1 shrink-0 ${opt.numberClass}`}>{opt.number}</span>
                  <h3 className="font-serif text-3xl lg:text-4xl text-navy leading-tight">
                    {opt.titleLines[0]}
                    <br />
                    {opt.titleLines[1]}
                  </h3>
                </div>

                <div className="w-full lg:w-5/12 mb-8 lg:mb-0 pr-8 lg:pr-16">
                  <p className="text-navy/55 text-lg font-light leading-relaxed">{opt.description}</p>
                </div>

                <div className="w-full lg:w-3/12 flex lg:justify-end">
                  <WipeLink
                    href={opt.href}
                    className={`inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${opt.ctaClass}`}
                  >
                    {opt.cta}
                    <FiArrowRight className="ml-3" />
                  </WipeLink>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Mission />
      <WhoWasCarlo />
      <Initiatives />
      <LatestNews />
      <QuoteBanner />
      <WaysToSupport />
    </>
  );
}
