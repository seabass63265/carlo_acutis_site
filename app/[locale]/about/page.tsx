import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import AboutEditorial from "@/components/AboutEditorial";
import TeamShowcase, { type TeamMember } from "@/components/ui/team-showcase";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Friends of St. Carlo Acutis Foundation — our story, board of directors, and governance.",
};

/* ─── Foundation Story ───────────────────────────────────────────────── */
function FoundationStory() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <AnimateIn>
              <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                Our Story
              </p>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-8">
                Born from a Conviction That Faith and Technology Belong Together
              </h2>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="text-navy/65 text-lg leading-relaxed mb-6">
                The Friends of St. Carlo Acutis Foundation was established by a
                group of Catholics who saw in Carlo Acutis something extraordinary:
                a teenager who had discovered that the same tools young people use
                for entertainment and communication could also be used to lead
                souls to God.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-navy/65 text-lg leading-relaxed mb-6">
                As the world recognized Carlo through beatification in 2020 and
                canonization in 2025, we saw an urgent need: to channel the
                enthusiasm surrounding Carlo&apos;s story into lasting, mission-driven
                programs that inspire the next generation of digital disciples.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.25}>
              <p className="text-navy/65 text-lg leading-relaxed">
                We believe the Church is not behind the times. She simply needs
                saints — like Carlo — to show the way.
              </p>
            </AnimateIn>
          </div>

          {/* Values */}
          <div className="space-y-6">
            {[
              {
                title: "Mission",
                body: "To inspire a new generation of Catholics to use technology, creativity, and digital media as instruments of evangelization, following the example of St. Carlo Acutis.",
              },
              {
                title: "Vision",
                body: "A world where young Catholics see their gifts — including technological ones — as vocations in service to the Gospel.",
              },
              {
                title: "Values",
                body: "Faith, transparency, innovation, excellence, community, and an unwavering commitment to truth in the digital age.",
              },
            ].map(({ title, body }, i) => (
              <AnimateIn key={title} direction="left" delay={i * 0.1}>
                <div className="border border-cream-dark rounded-sm p-8 bg-cream hover:shadow-lg hover:shadow-navy/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="block w-6 h-[2px] bg-gold" />
                    <h3 className="font-serif text-xl font-semibold text-navy">{title}</h3>
                  </div>
                  <p className="text-navy/60 text-base leading-relaxed">{body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline ───────────────────────────────────────────────────────── */
const milestones = [
  {
    year: "2006",
    title: "Carlo Acutis Passes Away",
    desc: "At just 15, Carlo offers his suffering for the Pope and the Church, dying with extraordinary peace.",
  },
  {
    year: "2013",
    title: "Cause for Canonization Opened",
    desc: "The Diocese of Milan officially opens the cause for beatification and canonization of Carlo Acutis.",
  },
  {
    year: "2018",
    title: "Declared Venerable",
    desc: "Pope Francis recognizes Carlo's heroic virtue, declaring him Venerable Carlo Acutis.",
  },
  {
    year: "2020",
    title: "Beatification",
    desc: "Carlo is beatified in Assisi — a ceremony broadcast globally — with hundreds of thousands attending.",
  },
  {
    year: "2023",
    title: "Foundation Established",
    desc: "The Friends of St. Carlo Acutis Foundation is formally incorporated to carry his digital mission forward.",
  },
  {
    year: "2025",
    title: "Canonization",
    desc: "Carlo Acutis is canonized by Pope Francis — the world's first millennial saint and patron of the internet.",
  },
];

function Timeline() {
  return (
    <section className="py-24 px-6 bg-cream" id="timeline">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              History
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-navy">
              Foundation Milestones
            </h2>
          </AnimateIn>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-[2px] bg-cream-dark" />

          <div className="space-y-12">
            {milestones.map(({ year, title, desc }, i) => (
              <AnimateIn key={year} delay={i * 0.1}>
                <div className="flex gap-8 items-start relative">
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-navy border-2 border-gold flex items-center justify-center shadow-lg shadow-navy/20">
                    <span className="text-gold font-serif font-semibold text-xs">{year}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-2 pt-3">
                    <h3 className="font-serif text-xl font-semibold text-navy mb-2">{title}</h3>
                    <p className="text-navy/60 text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Board ──────────────────────────────────────────────────────────── */
const boardMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Maria Gonzalez",
    role: "Board Chair",
    image: "https://i.pravatar.cc/400?img=47",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "2",
    name: "Fr. James O'Brien",
    role: "Spiritual Director",
    image: "https://i.pravatar.cc/400?img=52",
    social: { twitter: "#" },
  },
  {
    id: "3",
    name: "Sebastian Rocha",
    role: "Technology Director",
    image: "/seabasspic.jpg",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "4",
    name: "Dr. Sarah Williams",
    role: "Education Director",
    image: "https://i.pravatar.cc/400?img=25",
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Thomas Bernardini",
    role: "Finance Director",
    image: "https://i.pravatar.cc/400?img=68",
    social: { linkedin: "#" },
  },
  {
    id: "6",
    name: "Anne Fitzgerald",
    role: "Communications Director",
    image: "https://i.pravatar.cc/400?img=9",
    social: { linkedin: "#", twitter: "#" },
  },
];

function Board() {
  return (
    <section className="py-28 px-6 bg-navy-dark" id="board">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <AnimateIn>
            <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Leadership
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">
              Board of Directors
            </h2>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15}>
          <TeamShowcase members={boardMembers} />
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Governance ─────────────────────────────────────────────────────── */
function Governance() {
  return (
    <section className="py-24 px-6 bg-white" id="governance">
      <div className="max-w-5xl mx-auto">

        {/* Centered headline */}
        <div className="text-center mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              Governance
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-6">
              Transparency You Can Trust
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.14}>
            <p className="text-navy/55 text-lg max-w-2xl mx-auto leading-relaxed">
              We operate with the highest standards of nonprofit governance and
              financial transparency. Our donors deserve to know that every
              dollar is being used to advance the mission.
            </p>
          </AnimateIn>
        </div>

        {/* 3×2 stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Companies trust our governance model", value: "501(c)(3)" },
            { label: "Years of transparent operations",      value: "2+"        },
            { label: "Dedicated board members",              value: "6"         },
            { label: "Administrative overhead rate",         value: "< 15%"     },
            { label: "Annual report availability",           value: "Available" },
            { label: "Independent charity rating",           value: "Excellent" },
          ].map(({ label, value }, i) => (
            <AnimateIn key={label} delay={i * 0.08}>
              <div className="bg-[#f4f4f4] rounded-xl p-10 text-center">
                <p className="text-navy font-bold text-3xl mb-3">
                  <span className="text-gold mr-1">↑</span>{value}
                </p>
                <p className="text-navy/50 text-sm leading-snug">{label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutEditorial />
      <Board />
      <FoundationStory />
      <Timeline />
      <Governance />
    </>
  );
}
