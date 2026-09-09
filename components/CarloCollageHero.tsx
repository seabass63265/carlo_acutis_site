"use client";
import { motion, type Transition } from "framer-motion";

const float: { animate: { y: number[] }; transition: Transition } = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

export default function CarloCollageHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100svh" }}>
      {/* B&W background */}
      <div
        className="absolute inset-0 scale-105"
        style={{
          backgroundImage: "url('/carloabout.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          filter: "grayscale(100%)",
        }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(201,169,110,0.06) 0%, transparent 65%)",
        }}
      />

      {/* ── OVERSIZED TITLE — lower left ── */}
      <div className="absolute bottom-20 left-8 lg:left-16 z-10">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gold text-[10px] font-sans font-bold tracking-[0.5em] uppercase mb-3"
        >
          1991 — 2006
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif font-bold text-white leading-[0.88] select-none"
          style={{ fontSize: "clamp(4.5rem, 13vw, 12rem)" }}
        >
          CARLO
          <br />
          <em className="italic text-gold">ACUTIS</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/40 text-xs font-sans tracking-[0.3em] uppercase mt-4"
        >
          The First Millennial Saint
        </motion.p>
      </div>

      {/* ── STICKER 1: Browser window — upper right ── */}
      <motion.div
        initial={{ opacity: 0, y: -16, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        style={{ rotate: "3deg" }}
        className="absolute top-28 right-8 lg:right-20 w-64 lg:w-72 shadow-2xl rounded-sm overflow-hidden z-20"
      >
        <motion.div {...float} transition={{ ...float.transition, delay: 0.3 }}>
          {/* Title bar */}
          <div className="bg-navy-dark px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 block" />
            </div>
            <span className="text-white/50 text-[9px] font-mono ml-1 truncate">
              miracolieucaristici.org
            </span>
          </div>
          {/* Body */}
          <div className="bg-white px-5 py-4">
            <p className="text-navy text-[11px] font-mono leading-relaxed">
              🌐 Eucharistic Miracles
              <br />
              of the World
              <br />
              <br />
              <span className="text-[#b8860b] font-bold">136 documented miracles</span>
              <br />
              <span className="text-navy/50">across 21 countries</span>
              <br />
              <br />
              <span className="text-navy/35 text-[10px]">
                Catalogued by Carlo Acutis, age 11
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── STICKER 2: Quote card — right side ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        style={{ rotate: "-2deg" }}
        className="absolute bottom-28 right-12 lg:right-28 w-56 lg:w-64 bg-gold p-5 shadow-2xl z-20"
      >
        <motion.div {...float} transition={{ ...float.transition, delay: 1 }}>
          <p className="font-serif italic text-navy-dark text-sm leading-relaxed">
            &ldquo;The Eucharist is my highway to Heaven.&rdquo;
          </p>
          <div className="mt-3 pt-3 border-t border-navy-dark/20">
            <p className="text-navy-dark/55 text-[10px] tracking-widest uppercase font-sans">
              — St. Carlo Acutis
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ── STICKER 3: Canonization badge — mid left ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: 1 }}
        animate={{ opacity: 1, scale: 1, rotate: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        style={{ rotate: "1deg" }}
        className="absolute top-28 left-8 lg:left-16 z-20 border border-white/15 bg-black/40 backdrop-blur-md px-5 py-3"
      >
        <motion.div {...float} transition={{ ...float.transition, delay: 0.6 }}>
          <p className="text-white/45 text-[9px] font-mono tracking-widest uppercase mb-1">
            Canonized
          </p>
          <p className="text-gold font-serif text-xl font-semibold">
            April 27, 2025
          </p>
          <p className="text-white/30 text-[9px] font-mono mt-0.5">St. Peter&apos;s Square, Rome</p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10">
        <span className="text-white/20 text-[9px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
