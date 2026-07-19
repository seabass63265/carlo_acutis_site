"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CrowdCanvasClient from "@/components/CrowdCanvasClient";

interface Props {
  eyebrow: string;
  title: string;
}

export default function MiraclesHeroClient({ eyebrow, title }: Props) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  // crowd moves down 18% as section scrolls off — creates parallax lag
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div
      ref={container}
      className="relative overflow-hidden"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        height: "85vh",
        background: "#0B1628",
      }}
    >
      {/* Parallax crowd layer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[115%]"
        style={{ y }}
      >
        <CrowdCanvasClient />
      </motion.div>

      {/* Navy-to-transparent gradient — keeps text legible, dissolves into crowd */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #0B1628 0%, #0B1628 28%, rgba(11,22,40,0.55) 55%, rgba(11,22,40,0.05) 80%, transparent 100%)",
        }}
      />

      {/* Text — centred in the upper 55% so it sits above the crowd */}
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
