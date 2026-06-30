import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import { Link } from "@/i18n/navigation";
import DonorsWall from "@/components/DonorsWall";
import DonateHero from "@/components/DonateHero";

export const metadata: Metadata = {
  title: "Ways to Give",
  description:
    "Support the Friends of St. Carlo Acutis Foundation — individual giving, institutional partnerships, grants, and corporate sponsorships.",
};

/* ─── Why Support ────────────────────────────────────────────────────── */
function WhySupport() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <AnimateIn>
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                Why Give
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
                Your Gift Funds the Next Generation of Digital Saints
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed mb-6">
                Carlo Acutis proved that faith and technology are not in
                conflict — they can be the most powerful combination of all.
                Your support makes it possible to bring that message to
                teenagers, parishes, schools, and families around the world.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed mb-8">
                We operate with exceptional stewardship, keeping overhead
                below 15% so that your dollars are deployed where they matter
                most: in programs, outreach, and mission.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <Link
                href="#donate-now"
                className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
              >
                Donate Now →
              </Link>
            </AnimateIn>
          </div>

          {/* Impact metrics */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: "$1M+", label: "Total funds deployed to mission" },
              { value: "50K+", label: "Young people reached annually" },
              { value: "200+", label: "Parishes served with resources" },
              { value: "< 15%", label: "Administrative overhead" },
              { value: "100%", label: "Financials audited annually" },
              { value: "6", label: "Board-governed with full transparency" },
            ].map(({ value, label }, i) => (
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
    name: "Foundation Partner",
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
function InstitutionalGiving() {
  return (
    <section className="py-24 px-6 bg-navy" id="institutional">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <AnimateIn>
              <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                Institutional &amp; Foundation Giving
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8">
                For Foundations, Dioceses &amp; Institutions
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                The Friends of St. Carlo Acutis Foundation welcomes major gifts
                and grants from Catholic foundations, dioceses, religious
                orders, and aligned institutions. We offer full governance
                transparency, audited financials, and partnership flexibility.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Our team works closely with institutional donors to align gifts
                with specific program areas — from youth outreach to digital
                infrastructure to international mission expansion.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <Link
                href="/contact"
                className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
              >
                Contact Our Giving Team →
              </Link>
            </AnimateIn>
          </div>

          {/* What we offer */}
          <div className="space-y-4">
            {[
              {
                title: "Full Financial Transparency",
                body: "Audited annual financials, IRS Form 990, and real-time program expense reporting available to all institutional partners.",
              },
              {
                title: "Board Governance Documentation",
                body: "Complete bylaws, board composition, conflict of interest policies, and meeting minutes available upon request.",
              },
              {
                title: "Grant Opportunity Matching",
                body: "Our giving team will work with you to identify grant programs that align with your foundation's priorities and eligibility criteria.",
              },
              {
                title: "Impact Reporting",
                body: "Bi-annual detailed impact reports showing exactly how your gift was deployed and the measurable results achieved.",
              },
              {
                title: "Restricted Giving Options",
                body: "Gifts can be designated for specific programs — youth outreach, digital evangelization, international expansion, or endowment.",
              },
            ].map(({ title, body }, i) => (
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

/* ─── Annual Reports ─────────────────────────────────────────────────── */
function AnnualReports() {
  return (
    <section className="py-24 px-6 bg-cream" id="reports">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Financial Transparency
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              Annual Reports &amp; Filings
            </h2>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { year: "2024", title: "Annual Report", type: "PDF", size: "2.4 MB" },
            { year: "2024", title: "Form 990", type: "PDF", size: "1.1 MB" },
            { year: "2024", title: "Audited Financials", type: "PDF", size: "3.2 MB" },
            { year: "2023", title: "Annual Report", type: "PDF", size: "2.1 MB" },
            { year: "2023", title: "Form 990", type: "PDF", size: "0.9 MB" },
            { year: "2023", title: "Audited Financials", type: "PDF", size: "2.8 MB" },
          ].map(({ year, title, type, size }, i) => (
            <AnimateIn key={`${year}-${title}`} delay={(i % 3) * 0.08}>
              <div className="group flex items-center justify-between bg-white border border-cream-dark rounded-sm px-6 py-5 hover:border-gold/40 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div>
                  <p className="text-navy font-semibold text-sm">{year} {title}</p>
                  <p className="text-navy/40 text-xs mt-0.5">{type} · {size}</p>
                </div>
                <span className="text-gold/60 group-hover:text-gold transition-colors text-lg">↓</span>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3}>
          <p className="text-center text-navy/40 text-sm mt-10">
            Additional documents available upon request.{" "}
            <Link href="/contact" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors">
              Contact us →
            </Link>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Corporate ──────────────────────────────────────────────────────── */
function CorporatePartnerships() {
  return (
    <section className="py-24 px-6 bg-white" id="corporate">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Corporate Giving
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              Corporate Partnerships &amp; Sponsorships
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="mt-5 text-navy/55 text-lg max-w-2xl mx-auto">
              Align your brand with a mission that speaks to the next generation —
              Catholics who are young, digitally fluent, and values-driven.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {[
            {
              title: "Title Sponsorship",
              description:
                "Premier brand placement on our website, all events, and the Eucharistic Miracles Exhibition. Includes executive speaking opportunities.",
            },
            {
              title: "Event Sponsorship",
              description:
                "Sponsor individual events — youth summits, retreats, conferences. Includes branded materials and on-site presence.",
            },
            {
              title: "Digital Co-Branding",
              description:
                "Your brand featured in our digital content, email newsletters, and social channels — reaching a devout, engaged Catholic audience.",
            },
            {
              title: "Resource Sponsorship",
              description:
                "Fund and co-brand a specific educational resource: lesson plans, videos, or digital tools distributed to parishes nationwide.",
            },
            {
              title: "Matching Gift Program",
              description:
                "Amplify individual donations by matching gifts from your employees or customers during a campaign period.",
            },
            {
              title: "Custom Partnership",
              description:
                "We welcome creative partnership proposals tailored to your company's CSR goals and employee values.",
            },
          ].map(({ title, description }, i) => (
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
              Ready to Explore a Partnership?
            </h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Our corporate partnership team will create a customized proposal aligned with your organization&apos;s goals and values.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors"
            >
              Get in Touch →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateIn>
          <div className="text-gold/25 font-serif text-8xl leading-none mb-4 select-none">&ldquo;</div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <blockquote className="font-serif text-3xl md:text-4xl text-white font-semibold italic leading-tight mb-8 text-balance">
            You only have to be good in this short time of earthly life,
            and you will be happy forever.
          </blockquote>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <cite className="block text-white/35 text-xs tracking-widest uppercase not-italic mb-10">
            St. Carlo Acutis
          </cite>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <Link
            href="#donate-now"
            className="inline-block bg-gold text-navy-dark font-semibold px-10 py-5 rounded-sm text-sm tracking-wide hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            Make a Gift Today →
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
      <InstitutionalGiving />
      <AnnualReports />
      <CorporatePartnerships />
      <DonorsWall />
      <FinalCTA />
    </>
  );
}
