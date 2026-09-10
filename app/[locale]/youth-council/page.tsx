import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Youth Council",
  description:
    "The Friends of Carlo Youth Council is an advisory body of young people (ages 14–21) helping shape youth programming, digital evangelization, and organizational culture. Applications are open.",
};

/* The live application form. Once the Council is formed and applications close,
   swap this section for the "Annual Project" / "Meet the Council" content. */
const APPLICATION_URL = "https://form.jotform.com/262287157535060";

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="bg-cream pt-32 md:pt-44 pb-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
              The Friends of Carlo Youth Council
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight text-navy leading-[0.95] mb-8">
              A Seat at
              <br />
              the Table
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-navy/65 text-lg lg:text-xl leading-relaxed mb-10">
              Carlo Acutis was a teenager who used what he had — a laptop, a
              camera, a deep love for the Eucharist — to reach the whole world.
              The Youth Council is a group of young people doing the same thing
              for our generation: helping decide what Friends of Carlo builds,
              who it reaches, and how it feels to be part of it.
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
                Apply to Join →
              </a>
              <a
                href="#expectations"
                className="inline-block border border-navy/20 text-navy font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:border-navy/50 transition-colors"
              >
                What&apos;s expected
              </a>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15} direction="left">
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-xl shadow-navy/10">
            <Image
              src="/youthsitting.jpeg"
              alt="Young people gathered together"
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
function Purpose() {
  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <AnimateIn>
          <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
            What It Is
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
            An advisory body to the Board of Directors
          </h2>
        </AnimateIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimateIn delay={0.12}>
            <p className="text-navy/65 text-lg leading-relaxed">
              The Youth Council advises the Board of Directors and Executive
              Director on matters relating to youth programming, digital
              evangelization, and organizational culture. It leads at least one
              project each year in furtherance of the mission, and its members
              serve as ambassadors of the organization&apos;s charism within
              their parishes, schools, communities, and the internet.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.18}>
            <div className="bg-cream border border-cream-dark rounded-sm p-8">
              <p className="text-navy/70 text-base leading-relaxed">
                The Youth Council operates in an{" "}
                <span className="font-semibold text-navy">advisory</span> — not
                fiduciary — capacity. It does not hold legal governance
                authority over the organization. Your job is to bring the
                perspective of the people we&apos;re actually trying to reach,
                and to make sure it&apos;s heard where decisions get made.
              </p>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.24}>
          <Link
            href="/about#board"
            className="group inline-flex items-center gap-3 mt-12 border border-navy/20 text-navy font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:border-navy/50 transition-colors"
          >
            Meet the Board of Directors
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Expectations ───────────────────────────────────────────────────── */
const responsibilities = [
  {
    title: "Quarterly meetings",
    body: "Meet with the Council four times a year to review programs, weigh in on direction, and plan the annual project.",
  },
  {
    title: "Monthly check-ins",
    body: "A short monthly touchpoint to stay connected between meetings and keep projects moving.",
  },
  {
    title: "One annual project",
    body: "Lead or co-lead at least one project per term that advances the mission — you help choose what it is.",
  },
  {
    title: "Recommendations to the Board",
    body: "Submit written recommendations so your ideas reach the Board of Directors in a form they can act on.",
  },
  {
    title: "Be an ambassador",
    body: "Represent the Friends of Carlo charism in your parish, school, community, and online.",
  },
  {
    title: "Show up fully",
    body: "Participate in all Council activities and bring the perspective of your own community to the table.",
  },
];

function Expectations() {
  return (
    <section id="expectations" className="bg-cream py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
            What You&apos;d Do
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-6">
            The fun part comes with real commitments
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.12}>
          <p className="text-navy/60 text-lg leading-relaxed max-w-2xl mb-14">
            Being appointed to the Council means people are counting on you.
            Here&apos;s what a term looks like — it&apos;s a one-year
            commitment.
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
const requirements = [
  { value: "14–21", label: "Open to applicants between the ages of 14 and 21" },
  { value: "Any faith", label: "Applicants of any faith background are welcome" },
  { value: "1 year", label: "A one-year commitment to the Council and its work" },
];

function WhoCanApply() {
  return (
    <section className="bg-white py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Who Can Apply
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-12">
              If this sounds like you, apply
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
              We want the Council to represent a real range of parishes,
              schools, and communities — so wherever you&apos;re from, your
              perspective is part of what makes it work.
            </p>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.12} direction="left">
          <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-xl shadow-navy/10">
            <Image
              src="/youth2.jpg"
              alt="Young people together"
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
function Apply() {
  return (
    <section id="apply" className="bg-navy-dark py-28 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateIn>
          <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-6">
            Applications Are Open
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
            Ready to help build it?
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            The application takes a few minutes. Tell us who you are, where
            you&apos;re from, and why you want a seat at the table.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <a
            href={APPLICATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-navy-dark font-semibold px-10 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
          >
            Start the Application →
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
