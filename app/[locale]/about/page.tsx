import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import AboutHero from "@/components/AboutHero";
import ScrollWaveGallery from "@/components/ScrollWaveGallery";
import AboutScrollTypography from "@/components/AboutScrollTypography";
import TeamShowcase, { type TeamMember } from "@/components/ui/team-showcase";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Friends of St. Carlo Acutis Foundation — our story, board of directors, and governance.",
};

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
    id: "6",
    name: "Anne Fitzgerald",
    role: "Communications Director",
    image: "https://i.pravatar.cc/400?img=9",
    column: 3,
    social: { linkedin: "#", twitter: "#" },
  },
];

function Board() {
  return (
    <section className="py-28 px-6 bg-navy-dark" id="board">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <AnimateIn>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gold">
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
      <AboutHero />
      <ScrollWaveGallery />
      <AboutScrollTypography />
      <Board />
      <Governance />
    </>
  );
}
