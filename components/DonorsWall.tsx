import Image from "next/image";
import { getTranslations } from "next-intl/server";
import AnimateIn from "@/components/AnimateIn";

const communityPhotos = [
  "/donors.jpeg",
  "/donors1.jpeg",
  "/donors2.jpeg",
  "/donors3.jpeg",
  "/donors4.jpeg",
  "/donors5.jpeg",
];

export default async function DonorsWall() {
  const t = await getTranslations("donate.wall");

  return (
    <section className="py-24 bg-navy-dark text-white overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimateIn>
          <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
            {t("eyebrow")}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.08}>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
            {t("title")}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.14}>
          <p className="text-white/50 text-lg leading-relaxed">
            {t("body")}
          </p>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.2}>
        <div className="group mt-16 overflow-hidden">
          <div className="donors-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
            {[...communityPhotos, ...communityPhotos].map((src, i) => (
              <div key={`${src}-${i}`} className="relative h-[220px] w-[220px] shrink-0 overflow-hidden rounded-sm">
                <Image src={src} alt="" fill sizes="220px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      <style>{`
        .donors-marquee {
          animation: donors-scroll 60s linear infinite;
        }
        @keyframes donors-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 0.5rem)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .donors-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
