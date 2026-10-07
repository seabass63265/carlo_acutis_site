import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/AnimateIn";
import HashScroll from "@/components/HashScroll";
import AboutHero from "@/components/AboutHero";
import ScrollWaveGallery from "@/components/ScrollWaveGallery";
import AboutScrollTypography from "@/components/AboutScrollTypography";
import TeamShowcase, { type TeamMember } from "@/components/ui/team-showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

/* ─── Board ──────────────────────────────────────────────────────────── */
// Names, photos, and links live here. Role and bio text come from the "about.board"
// messages, keyed by `key`.
const boardMembers: (Omit<TeamMember, "role" | "bio"> & { key: string })[] = [
  {
    key: "josefina",
    id: "2",
    name: "Josefina Fernandez McEvoy",
    image: "/jfm-foc.jpg",
    column: 2,
    social: { linkedin: "https://www.linkedin.com/in/josefinafernandezmcevoy/" },
  },
  {
    key: "matthew",
    id: "7",
    name: "Father Matthew",
    image: "/Fr.Matthew-FOC.png",
    column: 1,
    social: { linkedin: "#" },
  },
  {
    key: "carmen",
    id: "1",
    name: "Carmen Romero",
    image: "/carmenpic1.jpeg",
    social: { linkedin: "https://www.linkedin.com/in/romerocarmen/" },
  },
  {
    key: "sebastian",
    id: "3",
    name: "Sebastian Rocha",
    image: "/seaheadshot.jpg",
    objectPosition: "center 25%",
    social: { linkedin: "https://www.linkedin.com/in/sebastian-rocha1/" },
  },
  {
    key: "johnny",
    id: "6",
    name: "Johnny Vrba",
    image: "/JohnnyVrba_Headshot_02.webp",
    column: 3,
    social: { linkedin: "https://www.linkedin.com/in/vrba/" },
  },
  {
    key: "john",
    id: "4",
    name: "John McEvoy",
    image: "/john-foc.jpg",
    column: 2,
    social: { linkedin: "#" },
  },
];

async function Board() {
  const t = await getTranslations("about.board");
  const members: TeamMember[] = boardMembers.map(({ key, ...member }) => ({
    ...member,
    role: t(`${key}.role`),
    bio: t.raw(`${key}.bio`) as string[],
  }));

  return (
    <section className="py-16 md:py-24 px-6 bg-navy-dark scroll-mt-20 overflow-x-hidden" id="board">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <AnimateIn>
            <p className="text-gold/70 text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.06}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-gold">
              {t("title")}
            </h2>
          </AnimateIn>
        </div>

        <AnimateIn delay={0.15}>
          <TeamShowcase members={members} />
        </AnimateIn>
      </div>
    </section>
  );
}

/* ─── Governance ─────────────────────────────────────────────────────── */
const statValues = ["501(c)(3)", "2+", "6", "< 15%", "Available", "Excellent"];

async function Governance() {
  const t = await getTranslations("about.governance");

  return (
    <section className="py-16 md:py-20 px-6 bg-white scroll-mt-20 overflow-x-hidden" id="governance">
      <div className="max-w-5xl mx-auto">

        {/* Centered headline */}
        <div className="text-center mb-14">
          <AnimateIn>
            <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
              {t("eyebrow")}
            </p>
          </AnimateIn>
          <AnimateIn delay={0.08}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight mb-6">
              {t("title")}
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.14}>
            <p className="text-navy/55 text-lg max-w-2xl mx-auto leading-relaxed">
              {t("body")}
            </p>
          </AnimateIn>
        </div>

        {/* 3×2 stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statValues.map((value, i) => (
            <AnimateIn key={i} delay={i * 0.08}>
              <div className="bg-[#f4f4f4] rounded-xl p-6 md:p-8 text-center">
                <p className="text-navy font-bold text-3xl mb-3">
                  <span className="text-gold mr-1">↑</span>{value}
                </p>
                <p className="text-navy/50 text-sm leading-snug">{t(`stat${i + 1}`)}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Governance detail */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimateIn delay={0.05}>
            <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
              {t("oversightTitle")}
            </h3>
            <p className="text-navy/60 text-base leading-relaxed">
              {t("oversightBody")}
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h3 className="font-serif text-2xl font-semibold text-navy mb-4">
              {t("bylawsTitle")}
            </h3>
            <p className="text-navy/60 text-base leading-relaxed">
              {t("bylawsBody")}
            </p>
          </AnimateIn>
        </div>

      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <HashScroll />
      <AboutHero />
      <ScrollWaveGallery />
      <AboutScrollTypography />
      <Board />
      <Governance />
    </>
  );
}
