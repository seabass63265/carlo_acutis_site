"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MIRACLE_STEPS_1 = [
  "A young boy named Matheus was born with a serious congenital pancreatic condition causing severe digestive complications.",
  "His family sought Carlo's intercession through prayer.",
  "During a prayer service, Matheus touched a relic of Carlo Acutis and prayed for healing.",
  "Soon afterward, his condition unexpectedly disappeared entirely.",
  "Medical examinations confirmed the child had been completely healed.",
  "Doctors were unable to provide any scientific explanation for the recovery.",
  "After years of Vatican investigation, the healing was officially recognized as a miracle attributed to Carlo Acutis.",
];

const MIRACLE_STEPS_2 = [
  "Valeria suffered a devastating traumatic brain injury following a serious bicycle accident.",
  "Doctors believed her chances of recovery were extremely low.",
  "Her mother traveled to Assisi and prayed at Carlo Acutis' tomb, entrusting her daughter's life to his intercession.",
  "On the very same day, Valeria unexpectedly began to improve.",
  "In the days that followed, she recovered at a pace doctors could not explain.",
  "Brain scans showed dramatic, medically unexplained healing.",
  "She made a remarkable recovery that exceeded all medical expectations.",
  "Following extensive review, the Vatican officially recognized this as the second miracle attributed to Carlo Acutis.",
];

const MIRACLES = [
  {
    num: "I",
    label: "The Miracle That Led to Beatification",
    person: "Matheus Vianna",
    location: "Brazil",
    year: "2013",
    steps: MIRACLE_STEPS_1,
    recognition: "Officially Recognized by the Vatican · Beatification 2020",
    imageSrc: "/mircale1.png",
    expandedImageSrc: "/miracle01.png",
    imageAlt: "Miracle I — The Beatification Miracle, Brazil 2013",
  },
  {
    num: "II",
    label: "The Miracle That Led to Canonization",
    person: "Valeria Valverde",
    location: "Costa Rica",
    year: "2022",
    steps: MIRACLE_STEPS_2,
    recognition: "Officially Recognized by the Vatican · Canonization 2025",
    imageSrc: "/miracle002.png",
    expandedImageSrc: "/miracle02.png",
    imageAlt: "Miracle II — The Canonization Miracle, Costa Rica 2022",
  },
];

export default function MiracleSkiper() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full min-h-screen">
      {activeIndex === null ? (
        <>
          {/* ── Desktop: draggable floating image ── */}
          <motion.div
            drag
            dragMomentum={false}
            layoutId="miracle-img"
            className="hidden lg:block absolute left-[4%] top-[8%] z-10"
            style={{
              width: "40%",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(217,164,65,0.18)",
              cursor: "grab",
            }}
            whileDrag={{ cursor: "grabbing", scale: 1.01 }}
          >
            <div style={{ position: "relative", aspectRatio: "4/3" }}>
              <Image
                src={MIRACLES[hoveredIndex].imageSrc}
                alt={MIRACLES[hoveredIndex].imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"
            />
            <div className="absolute bottom-5 left-5 pointer-events-none">
              <p className="text-white/40 text-[8px] tracking-widest uppercase">
                {MIRACLES[hoveredIndex].location}
              </p>
              <p className="text-white font-semibold text-sm">{MIRACLES[hoveredIndex].year}</p>
            </div>
          </motion.div>

          {/* ── Desktop: miracle list ── */}
          <ul className="hidden lg:flex flex-col gap-4 absolute right-[5%] bottom-[18%] z-10">
            <li className="flex w-full items-center gap-3 text-[9px] uppercase text-white/20 tracking-[0.4em] font-semibold mb-2">
              Miracles of Carlo Acutis
              <span className="h-px flex-1 bg-white/10" />
            </li>
            {MIRACLES.map((m, i) => (
              <motion.li
                key={i}
                layoutId={`miracle-title-${i}`}
                style={{ opacity: hoveredIndex === i ? 1 : 0.38 }}
                className="relative flex items-start gap-5 cursor-pointer max-w-md"
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setActiveIndex(i)}
                whileHover={{ x: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <span className="text-gold/50 font-mono text-xs pt-2.5 shrink-0">{m.num}</span>
                <span className="font-serif text-3xl xl:text-4xl text-white leading-tight">
                  {m.label}
                </span>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-gold mt-3 shrink-0"
                  />
                )}
              </motion.li>
            ))}
          </ul>

          {/* ── Mobile: stacked tap-to-expand cards ── */}
          <div className="lg:hidden px-6 py-16 flex flex-col gap-5">
            <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-semibold mb-2">
              Miracles of Carlo Acutis
            </p>
            {MIRACLES.map((m, i) => (
              <button
                key={i}
                onClick={() => { setHoveredIndex(i); setActiveIndex(i); }}
                className="text-left border border-white/10 rounded-sm overflow-hidden hover:border-gold/30 transition-colors duration-200"
              >
                <div className="relative aspect-[16/9]">
                  <Image src={m.imageSrc} alt={m.imageAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white/40 text-[8px] tracking-widest uppercase">{m.location}</p>
                    <p className="text-white font-semibold text-sm">{m.year}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gold/50 text-[9px] tracking-widest uppercase mb-2">Miracle {m.num}</p>
                  <p className="font-serif text-xl text-white leading-snug">{m.label}</p>
                  <p className="text-white/30 text-xs mt-2">Tap to read more →</p>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        /* ── Expanded detail view ── */
        <div className="min-h-screen w-full" onClick={() => setActiveIndex(null)}>
          <div
            className="max-w-2xl mx-auto px-6 py-20 flex flex-col gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <div>
              <p className="text-gold/50 text-[9px] tracking-[0.4em] uppercase font-semibold mb-4">
                Miracle {MIRACLES[activeIndex].num}
              </p>
              <motion.h3
                layoutId={`miracle-title-${activeIndex}`}
                className="font-serif text-3xl lg:text-4xl text-white leading-tight"
              >
                {MIRACLES[activeIndex].label}
              </motion.h3>
            </div>

            {/* Image */}
            <motion.div
              layoutId="miracle-img"
              className="relative w-full rounded-sm overflow-hidden"
              style={{
                aspectRatio: "16/9",
                border: "1px solid rgba(217,164,65,0.15)",
              }}
            >
              <Image
                src={MIRACLES[activeIndex].expandedImageSrc}
                alt={MIRACLES[activeIndex].imageAlt}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content fades in after layout animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
            >
              {/* Metadata */}
              <div className="flex gap-8 pb-6 border-b border-white/8 mb-6">
                {[
                  ["Person", MIRACLES[activeIndex].person],
                  ["Location", MIRACLES[activeIndex].location],
                  ["Year", MIRACLES[activeIndex].year],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-white/25 text-[8px] tracking-widest uppercase mb-1">{k}</p>
                    <p className="text-white font-semibold text-sm">{v}</p>
                  </div>
                ))}
              </div>

              {/* Story steps */}
              <div className="space-y-3 mb-8">
                {MIRACLES[activeIndex].steps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-gold/30 font-mono text-[10px] mt-0.5 shrink-0 w-5 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-white/60 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>

              {/* Recognition */}
              <div className="flex items-center gap-2.5 pt-5 border-t border-white/8 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                <p className="text-gold text-[9px] font-semibold tracking-[0.2em] uppercase">
                  {MIRACLES[activeIndex].recognition}
                </p>
              </div>

              <button
                className="text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
                onClick={() => setActiveIndex(null)}
              >
                ← Back to Miracles
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
