import Image from "next/image";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/AnimateIn";
import HomeHero from "@/components/HomeHero";
import CarloStoryButton from "@/components/CarloStoryButton";

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
                <Link
                  href="/carlo"
                  className="bg-gold text-navy-dark text-sm font-semibold px-6 py-3 transition-all duration-200 hover:bg-gold-light"
                >
                  Our Story
                </Link>
                <Link
                  href="/contact"
                  className="text-white text-sm font-semibold px-6 py-3 transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1.5px solid rgba(201,169,110,0.45)" }}
                >
                  Stay Connected
                </Link>
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
    <section className="py-24 px-6 bg-white">
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
const initiatives = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2V30M6 10H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Youth Outreach",
    description:
      "Programs and events that introduce Carlo's story to teens and young adults, giving them a Catholic role model for the digital age.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M8 16h16M16 8c-3 4-3 12 0 16M16 8c3 4 3 12 0 16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Digital Evangelization",
    description:
      "Training Catholics to use technology — social media, video, web — as instruments of the new evangelization.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="1" stroke="currentColor" strokeWidth="2" />
        <path d="M10 12h12M10 16h8M10 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Educational Resources",
    description:
      "Downloadable lesson plans, timelines, and videos for parishes, schools, and youth groups to use freely.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 28V16L16 4L26 16V28H20V20H12V28H6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Future Projects",
    description:
      "Exploring AI, immersive media, and emerging technology to spread the faith to the next generation.",
  },
];

function Initiatives() {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              What We Do
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">
              Featured Initiatives
            </h2>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.1}>
              <div className="group h-full border border-white/10 rounded-sm p-8 hover:border-gold/40 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer">
                <div className="text-gold/60 mb-6 group-hover:text-gold transition-colors duration-200">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-white font-semibold mb-3 group-hover:text-gold transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── News ───────────────────────────────────────────────────────────── */
const newsItems = [
  {
    date: "June 2025",
    tag: "Canonization",
    title: "Carlo Acutis Officially Canonized as the World's First Millennial Saint",
    excerpt:
      "In a historic ceremony in St. Peter's Square, Pope Francis canonized Carlo Acutis, making him the patron of the internet generation.",
  },
  {
    date: "May 2025",
    tag: "Events",
    title: "Foundation Announces Digital Discipleship Summit for Youth Ministers",
    excerpt:
      "Hundreds of youth ministers from across the country gather to learn how to use Carlo's story to inspire their communities.",
  },
  {
    date: "April 2025",
    tag: "Resources",
    title: "New Educational Resource Pack Released — Free for All Parishes",
    excerpt:
      "Download lesson plans, infographics, and video guides on Carlo's life for confirmation, high school, and college students.",
  },
];

function LatestNews() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
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
          <AnimateIn delay={0.15}>
            <a
              href="#"
              className="text-navy/60 hover:text-navy text-sm font-medium underline underline-offset-4 transition-colors"
            >
              View all news →
            </a>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <AnimateIn key={item.title} delay={i * 0.1}>
              <article className="group bg-white rounded-sm overflow-hidden border border-cream-dark hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 flex flex-col h-full">
                <div className="bg-navy h-1.5 w-full" />
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <span className="text-navy/30 text-xs">{item.date}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-navy mb-3 group-hover:text-navy-light transition-colors leading-snug flex-1">
                    {item.title}
                  </h3>
                  <p className="text-navy/55 text-sm leading-relaxed mb-6">{item.excerpt}</p>
                  <div className="text-xs font-semibold text-gold tracking-wide">Read more →</div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
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
            <Link href="/carlo" className="text-gold text-sm font-semibold hover:text-gold-light tracking-wide transition-colors">
              Read His Full Story →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Ways to Support ────────────────────────────────────────────────── */
const supportOptions = [
  {
    title: "Individual Giving",
    description: "Your personal gift fuels youth outreach, educational resources, and digital evangelization — one soul at a time.",
    cta: "Give Now",
    href: "/donate" as const,
    accentClass: "bg-gold",
    ctaClass: "bg-gold text-navy-dark hover:bg-gold-light",
  },
  {
    title: "Institutional Giving",
    description: "Partner with us as a foundation, diocese, or institution. Access governance documents, impact metrics, and grant information.",
    cta: "Institutional Partners",
    href: "/donate" as const,
    accentClass: "bg-navy",
    ctaClass: "bg-navy text-white hover:bg-navy-light",
  },
  {
    title: "Corporate Partnerships",
    description: "Align your brand with a mission that transcends generations. Sponsorship and co-branding opportunities available.",
    cta: "Corporate Info",
    href: "/donate" as const,
    accentClass: "bg-navy-dark",
    ctaClass: "bg-navy-dark text-white hover:bg-navy",
  },
];

function WaysToSupport() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Support the Mission
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">Ways to Give</h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-5 text-navy/55 text-lg max-w-xl mx-auto">
              Every gift — large or small — carries Carlo&apos;s message to a new generation.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((opt, i) => (
            <AnimateIn key={opt.title} delay={i * 0.1}>
              <div className="group flex flex-col h-full border border-cream-dark rounded-sm overflow-hidden hover:shadow-2xl hover:shadow-navy/10 transition-all duration-300">
                <div className={`h-1.5 w-full ${opt.accentClass}`} />
                <div className="flex-1 p-8 flex flex-col">
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-4">{opt.title}</h3>
                  <p className="text-navy/55 text-sm leading-relaxed flex-1 mb-8">{opt.description}</p>
                  <Link
                    href={opt.href}
                    className={`inline-block text-center text-sm font-semibold px-6 py-3 rounded-sm transition-all duration-200 ${opt.ctaClass}`}
                  >
                    {opt.cta} →
                  </Link>
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
