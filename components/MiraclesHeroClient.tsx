"use client";

interface Props {
  eyebrow: string;
  title: string;
}

export default function MiraclesHeroClient({ eyebrow, title }: Props) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        height: "85vh",
        background: "#0B1628",
      }}
    >
      <div
        className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-[22vh] text-center"
      >
        <p
          className="text-gold text-[11px] font-semibold tracking-[0.28em] uppercase mb-6"
          style={{ textShadow: "0 1px 12px rgba(11,22,40,0.9)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] font-semibold text-white leading-[1.05] text-balance"
          style={{ textShadow: "0 2px 32px rgba(11,22,40,1), 0 0 80px rgba(11,22,40,0.8)" }}
        >
          {title}
        </h1>
        <div className="mt-10">
          <span className="block w-12 h-[2px] bg-gold" />
        </div>
      </div>
    </div>
  );
}
