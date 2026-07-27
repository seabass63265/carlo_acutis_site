import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import AnimateIn from "@/components/AnimateIn";
import HomeHero from "@/components/HomeHero";
import CarloStoryButton from "@/components/CarloStoryButton";
import NewsGrid, { type NewsCard } from "@/components/NewsGrid";
import WipeLink from "@/components/WipeLink";
import { getFacebookPosts, type FacebookPost } from "@/lib/facebook";

/* ─── Mission ────────────────────────────────────────────────────────── */
function Mission() {
  return (
    <section className="overflow-hidden bg-navy-dark">

      {/* Headline + icon */}
      <div className="px-6 pt-20 pb-14 text-center">
        <AnimateIn>
          <h2
            className="font-sans font-black uppercase leading-[0.88] tracking-tight text-balance mx-auto text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)", maxWidth: "860px" }}
          >
            A Foundation for Real Faith<br />&amp; Encounters with God
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
                Our Mission
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.1}>
              <p
                className="font-serif font-semibold text-gold leading-snug mb-10"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)" }}
              >
                Inspired by the life and witness of St. Carlo Acutis, we exist to help people encounter Christ, deepen their faith, and continue Carlo&apos;s mission of bringing the Gospel into the digital world.
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <WipeLink
                  href="/about"
                  className="bg-gold text-navy-dark text-sm font-semibold px-6 py-3 transition-all duration-200 hover:bg-gold-light"
                >
                  About Us
                </WipeLink>
                <WipeLink
                  href="/contact"
                  className="text-white text-sm font-semibold px-6 py-3 transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(201,169,110,0.45)" }}
                >
                  Stay Connected
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
                alt="St. Carlo Acutis"
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
function WhoWasCarlo() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimateIn direction="right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src="/youngcarlo.png"
                  alt="Young Carlo Acutis"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient overlay for quote readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-gold font-serif italic text-xl leading-relaxed mb-2">
                    &ldquo;All people are born as originals, but many die as photocopies.&rdquo;
                  </p>
                  <p className="text-white/50 text-xs tracking-widest uppercase">Carlo Acutis</p>
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
                The Story of Carlo
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight">
                Who Was Carlo Acutis?
              </h2>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed">
                Born in London and raised in Milan, Carlo Acutis was a teenager
                who loved soccer, video games, and God. He was diagnosed with
                leukemia at 15 and offered his suffering &ldquo;for the Pope and for
                the Church&rdquo; — dying in 2006 with the serenity of a saint.
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed">
                Carlo taught himself to code and built a website cataloguing
                Eucharistic miracles worldwide — a digital act of faith that
                reached millions. He was beatified in 2020 and canonized as the
                world&apos;s first millennial saint in 2025.
              </p>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.25}>
              <div className="flex gap-8 pt-4 border-t border-cream-dark">
                {[
                  { value: "15", label: "Age at death" },
                  { value: "136", label: "Eucharistic miracles catalogued" },
                  { value: "2025", label: "Canonized" },
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
                Explore Carlo&apos;s Story →
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

function CardLink() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-3 mt-6 font-sans text-[9px] tracking-[0.2em] uppercase text-white hover:text-gold transition-colors duration-300"
    >
      Discover Details
      <FiArrowRight className="text-gold transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function Initiatives() {
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
        Initiatives
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <AnimateIn>
          <p className="flex items-center gap-4 text-gold text-[10px] font-semibold tracking-[0.3em] uppercase mb-6">
            What We Do
            <span className="h-px w-10 bg-gold" />
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h2 className="mb-16 md:mb-24">
            <span className="block font-sans text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-white">
              Featured
            </span>
            <em className="block font-serif italic text-5xl md:text-6xl text-white mt-2">Initiatives</em>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 01 — Youth Outreach */}
          <AnimateIn
            delay={0.15}
            className="group lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3 lg:pr-10 lg:border-r lg:border-white/10"
          >
            <CardMeta number="01" tags={["Focus: Community", "Status: Active"]} />
            <div className="relative w-full h-[280px] lg:h-[600px] overflow-hidden bg-navy mb-6">
              <Image
                src="/aboutus43.jpeg"
                alt="Group of youth looking towards light"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardTitle>Youth Outreach</CardTitle>
            <p className="text-white/40 text-base font-light leading-relaxed max-w-[80%]">
              Fostering a new generation through immersive community programs. We create spaces where tradition
              meets contemporary understanding, providing mentorship and spiritual grounding for young minds
              navigating a complex world.
            </p>
            <CardLink />
          </AnimateIn>

          {/* 02 — Digital Evangelization */}
          <AnimateIn
            delay={0.2}
            className="group lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 lg:pl-10 lg:top-20 lg:relative"
          >
            <CardMeta number="02" tags={["Focus: Technology"]} />
            <div className="relative w-full h-[240px] lg:h-[350px] overflow-hidden bg-navy mb-6">
              <Image
                src="/aboutus15.jpeg"
                alt="Abstract digital light network"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardTitle>Digital Evangelization</CardTitle>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-[90%]">
              Translating timeless messages into modern mediums. Utilizing cutting-edge platforms to build global
              digital parishes, ensuring our reach extends far beyond physical walls into the daily digital lives
              of millions.
            </p>
            <CardLink />
          </AnimateIn>

          {/* 03 — Educational Resources */}
          <AnimateIn
            delay={0.25}
            className="group lg:col-start-2 lg:col-span-4 lg:row-start-4 lg:row-span-2 lg:mt-16 flex flex-col items-start lg:items-center lg:text-center"
          >
            <CardMeta number="03" tags={["Focus: Knowledge"]} />
            <div className="relative w-full h-[280px] lg:w-[280px] lg:h-[280px] lg:rounded-full overflow-hidden bg-navy mb-8 lg:mx-auto">
              <Image
                src="/aboutus17.jpeg"
                alt="Classical architecture and light"
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardTitle center>Educational Resources</CardTitle>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-[90%]">
              A comprehensive library of theological, historical, and philosophical materials, curated and
              digitized for scholars and seekers alike. Elevating discourse through accessible, high-fidelity
              knowledge.
            </p>
            <CardLink />
          </AnimateIn>

          {/* 04 — Future Projects */}
          <AnimateIn
            delay={0.3}
            className="group lg:col-start-7 lg:col-span-6 lg:row-start-3 lg:row-span-3 lg:pl-10 lg:border-t lg:border-white/10 lg:pt-10 lg:mt-10"
          >
            <div className="relative w-full h-[240px] overflow-hidden bg-navy mb-8">
              <Image
                src="/aboutus21.jpeg"
                alt="Minimalist structural architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover [filter:brightness(0.8)_contrast(1.1)_saturate(0.8)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
            </div>
            <CardMeta number="04" tags={["Phase: Development"]} />
            <CardTitle>Future Projects</CardTitle>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Architecting the next decade of structural and spiritual growth. From sustainable community centers
              to innovative philanthropic models, these blueprints define our forward trajectory.
            </p>
            <CardLink />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

/* ─── News ───────────────────────────────────────────────────────────── */
// Shown whenever FACEBOOK_PAGE_ID / FACEBOOK_PAGE_ACCESS_TOKEN aren't set, or
// the Graph API request fails — keeps the section populated either way.
const fallbackNewsItems: NewsCard[] = [
  {
    date: "June 2025",
    tag: "Canonization",
    title: "Carlo Acutis Officially Canonized as the World's First Millennial Saint",
    excerpt:
      "In a historic ceremony in St. Peter's Square, Pope Francis canonized Carlo Acutis, making him the patron of the internet generation.",
    href: "#",
    external: false,
    image: "/gallery/vatican-square.jpg",
  },
  {
    date: "May 2025",
    tag: "Events",
    title: "Foundation Announces Digital Discipleship Summit for Youth Ministers",
    excerpt:
      "Hundreds of youth ministers from across the country gather to learn how to use Carlo's story to inspire their communities.",
    href: "#",
    external: false,
    image: "/gallery/cathedral-interior.jpg",
  },
  {
    date: "April 2025",
    tag: "Resources",
    title: "New Educational Resource Pack Released — Free for All Parishes",
    excerpt:
      "Download lesson plans, infographics, and video guides on Carlo's life for confirmation, high school, and college students.",
    href: "#",
    external: false,
    image: "/gallery/candles-church.jpg",
  },
];

const FALLBACK_POST_IMAGE = "/gallery/church-dome.jpg";

function fbPostToCard(post: FacebookPost): NewsCard {
  const message = post.message ?? "";
  const firstLine = message.split("\n")[0] ?? "";
  const title = firstLine.length > 90 ? `${firstLine.slice(0, 87)}…` : firstLine;
  return {
    date: new Date(post.created_time).toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    tag: "Facebook",
    title: title || "View post on Facebook",
    excerpt: message,
    href: post.permalink_url,
    external: true,
    image: post.full_picture || FALLBACK_POST_IMAGE,
  };
}

async function LatestNews() {
  const posts = await getFacebookPosts(24);
  const newsItems = posts && posts.length > 0 ? posts.map(fbPostToCard) : fallbackNewsItems;

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">
              Latest
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              News &amp; Updates
            </h2>
          </AnimateIn>
        </div>

        <NewsGrid items={newsItems} />
      </div>
    </section>
  );
}

/* ─── Quote Banner ───────────────────────────────────────────────────── */
function QuoteBanner() {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn>
          <div className="text-gold/25 font-serif text-9xl leading-none mb-4 select-none">&ldquo;</div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-semibold italic leading-tight text-balance">
            To always be close to Jesus — that&apos;s my life&apos;s program.
          </blockquote>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <cite className="block mt-8 text-white/40 text-sm tracking-widest uppercase not-italic">
            St. Carlo Acutis
          </cite>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <div className="mt-10">
            <WipeLink href="/carlo" className="text-gold text-sm font-semibold hover:text-gold-light tracking-wide transition-colors">
              Read His Full Story →
            </WipeLink>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Ways to Support ────────────────────────────────────────────────── */
const supportOptions = [
  {
    number: "01",
    titleLines: ["Individual", "Giving"],
    description:
      "Your personal gift fuels youth outreach, educational resources, and digital evangelization — one soul at a time.",
    cta: "Give Now",
    href: "/donate" as const,
    barClass: "bg-gold",
    numberClass: "text-gold/40",
    ctaClass: "bg-gold text-navy-dark hover:bg-gold-light",
  },
  {
    number: "02",
    titleLines: ["Institutional", "Giving"],
    description:
      "Partner with us as a foundation, diocese, or institution. Access governance documents, impact metrics, and grant information.",
    cta: "Institutional Partners",
    href: "/donate" as const,
    barClass: "bg-navy",
    numberClass: "text-navy/20",
    ctaClass: "bg-navy text-white hover:bg-navy-light",
  },
  {
    number: "03",
    titleLines: ["Corporate", "Partnerships"],
    description:
      "Align your brand with a mission that transcends generations. Sponsorship and co-branding opportunities available.",
    cta: "Corporate Info",
    href: "/donate" as const,
    barClass: "bg-navy",
    numberClass: "text-navy/20",
    ctaClass: "bg-navy text-white hover:bg-navy-light",
  },
];

function WaysToSupport() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <AnimateIn>
            <div className="flex flex-col items-center gap-6">
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase">
                Support the Mission
              </p>
              <span className="w-12 h-px bg-gold/50" />
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-navy mt-8 mb-6 leading-tight">
              Ways to Give
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-lg md:text-xl text-navy/55 font-light leading-relaxed">
              Every gift — large or small — carries Carlo&apos;s message to a new generation.
            </p>
          </AnimateIn>
        </div>

        <div className="border-t border-navy/10">
          {supportOptions.map((opt, i) => (
            <AnimateIn key={opt.titleLines.join(" ")} delay={i * 0.1}>
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
