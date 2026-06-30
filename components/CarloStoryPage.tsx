"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

/* ─── Chapter config ───────────────────────────────────────────────────── */
const CHAPTERS = [
  { id: "normal-kid",      num: "01", label: "Just A Normal Kid" },
  { id: "faith",           num: "02", label: "Discovering Faith" },
  { id: "digital-mission", num: "03", label: "The Digital Mission" },
  { id: "doing-at-15",     num: "04", label: "What Were You Doing At 15?" },
  { id: "toolkit",         num: "05", label: "Carlo's Toolkit" },
  { id: "miracles",        num: "06", label: "Eucharistic Miracles" },
  { id: "final-days",      num: "07", label: "Carlo's Final Days" },
  { id: "legacy",          num: "08", label: "The Legacy Continues" },
] as const;

/* ─── Design tokens ────────────────────────────────────────────────────── */
const C = {
  paper:  "#EFE5D6",
  paper2: "#F4ECE1",
  paper3: "#E8DCC8",
  dark:   "#111111",
  dark2:  "#181818",
  accent: "#C74A2A",
  gold:   "#D9A441",
  tape:   "rgba(213,195,161,0.82)",
  text:   "#222222",
  bebas:  "var(--font-bebas)",
  caveat: "var(--font-caveat)",
  sans:   "var(--font-sans)",
};

/* ─── Scroll util ──────────────────────────────────────────────────────── */
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Fade-in on scroll ────────────────────────────────────────────────── */
function Fade({
  children,
  delay = 0,
  y = 30,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Tape strip ───────────────────────────────────────────────────────── */
function Tape({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        background: C.tape,
        mixBlendMode: "multiply",
        position: "absolute",
        zIndex: 10,
        ...style,
      }}
    />
  );
}

/* ─── Polaroid / photo card ────────────────────────────────────────────── */
function PhotoCard({
  src,
  alt,
  rotate = 0,
  caption,
  w = 200,
  h = 160,
  className,
  style,
}: {
  src: string;
  alt: string;
  rotate?: number;
  caption?: string;
  w?: number;
  h?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        background: "#fff",
        padding: "8px 8px 36px 8px",
        boxShadow: "3px 5px 20px rgba(0,0,0,0.18)",
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      whileHover={{ scale: 1.04, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Tape style={{ top: -13, left: "50%", transform: "translateX(-50%) rotate(-1.5deg)", width: 52, height: 20 }} />
      <div style={{ position: "relative", overflow: "hidden", width: w, height: h }}>
        <Image src={src} alt={alt} fill sizes="300px" className="object-cover" />
      </div>
      {caption && (
        <p style={{ fontFamily: C.caveat, fontSize: 13, color: "#666", textAlign: "center", marginTop: 5, lineHeight: 1.3 }}>
          {caption}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Notebook-lined paper ─────────────────────────────────────────────── */
function NotebookPaper({
  children,
  rotate = 0,
  style,
}: {
  children: React.ReactNode;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#FFFEF5",
        boxShadow: "3px 4px 16px rgba(0,0,0,0.13)",
        transform: `rotate(${rotate}deg)`,
        padding: "20px 24px 24px",
        backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #ddd6c8 27px, #ddd6c8 28px)",
        backgroundSize: "100% 28px",
        backgroundPositionY: "20px",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Handwritten quote card ───────────────────────────────────────────── */
function QuoteCard({
  quote,
  author,
  rotate = 0,
  dark = false,
}: {
  quote: string;
  author?: string;
  rotate?: number;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        background: dark ? "#1c1c1c" : "#FFFEF5",
        boxShadow: "4px 6px 20px rgba(0,0,0,0.2)",
        padding: "28px 32px 24px",
        transform: `rotate(${rotate}deg)`,
        borderLeft: `4px solid ${C.accent}`,
        position: "relative",
      }}
    >
      <Tape style={{ top: -12, right: 24, width: 40, height: 17, transform: "rotate(3deg)" }} />
      <p style={{ fontFamily: C.caveat, fontSize: 22, color: dark ? "#f0e8d8" : C.text, lineHeight: 1.45 }}>
        &ldquo;{quote}&rdquo;
      </p>
      {author && (
        <p style={{ fontFamily: C.caveat, fontSize: 14, color: "#999", marginTop: 12 }}>
          — {author}
        </p>
      )}
    </div>
  );
}

/* ─── Ghost chapter number ─────────────────────────────────────────────── */
function GhostNum({ num, dark = false }: { num: string; dark?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: "clamp(8px, 2vw, 30px)",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
        lineHeight: 1,
        fontFamily: C.bebas,
        fontSize: "clamp(100px, 18vw, 220px)",
        color: dark ? "rgba(199,74,42,0.09)" : "rgba(199,74,42,0.07)",
      }}
    >
      {num}
    </div>
  );
}

/* ─── Torn paper divider ───────────────────────────────────────────────── */
function TornEdge({ fill }: { fill: string }) {
  return (
    <div style={{ position: "relative", height: 48, overflow: "hidden" }}>
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        style={{ position: "absolute", bottom: 0, width: "100%", height: "100%" }}
      >
        <path
          d="M0,0 C90,32 180,12 270,22 C360,34 450,8 540,20 C630,32 720,6 810,18 C900,30 990,8 1080,20 C1140,28 1170,16 1200,18 L1200,48 L0,48 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  return (
    <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100svh", background: "#0d0d0d", paddingTop: 64 }}>
      {/* Parallax B&W background */}
      <motion.div
        className="absolute inset-0"
        style={{
          top: 64,
          y: bgY,
          backgroundImage: "url('/carloabout.png')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) contrast(1.08)",
        }}
      />

      {/* "The First Digital Saint" label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{ position: "absolute", top: 80, left: "clamp(18px, 5vw, 64px)" }}
      >
        <span style={{
          background: "#fff",
          color: "#111",
          fontFamily: C.sans,
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          padding: "5px 14px",
        }}>
          The First Digital Saint
        </span>
      </motion.div>


      {/* Scrapbook stickers — right side, hidden on mobile */}
      <div className="hidden md:block" style={{ position: "absolute", top: 72, right: "clamp(20px, 5vw, 80px)" }}>
        {/* Quote note */}
        <motion.div
          initial={{ opacity: 0, rotate: -3, y: -24 }}
          animate={{ opacity: 1, rotate: -3, y: 0 }}
          transition={{ duration: 0.75, delay: 1.0 }}
          style={{
            background: "#FFFEF5",
            padding: "20px 24px 22px",
            boxShadow: "4px 6px 22px rgba(0,0,0,0.38)",
            maxWidth: 220,
            position: "relative",
          }}
        >
          <Tape style={{ top: -11, left: "50%", transform: "translateX(-50%) rotate(-1deg)", width: 42, height: 17 }} />
          <p style={{ fontFamily: C.caveat, fontSize: 19, color: C.text, lineHeight: 1.45 }}>
            To always be close to Jesus, that is my life plan.
          </p>
          <p style={{ fontFamily: C.caveat, fontSize: 13, color: "#888", marginTop: 10 }}>— Carlo Acutis</p>
          <svg style={{ position: "absolute", bottom: 10, right: 12 }} width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path d="M11 18C11 18 2 12 2 6C2 3.2 4.2 1 7 1C8.8 1 10.3 2 11 3.5C11.7 2 13.2 1 15 1C17.8 1 20 3.2 20 6C20 12 11 18 11 18Z" stroke={C.accent} strokeWidth="1.5" fill="rgba(199,74,42,0.1)" />
          </svg>
        </motion.div>

        {/* "Digital Saint" badge */}
        <motion.div
          initial={{ opacity: 0, rotate: 4, y: 20 }}
          animate={{ opacity: 1, rotate: 4, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          style={{ border: `2.5px solid rgba(217,164,65,0.65)`, padding: "12px 20px", textAlign: "center", marginLeft: 36, marginTop: 14 }}
        >
          <p style={{ fontFamily: C.bebas, fontSize: 20, color: C.gold, letterSpacing: "0.08em" }}>DIGITAL</p>
          <p style={{ fontFamily: C.bebas, fontSize: 20, color: C.gold, letterSpacing: "0.08em" }}>SAINT</p>
        </motion.div>

        {/* "Heaven is our home" stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 1.5 }}
          style={{ background: C.accent, padding: "11px 18px", textAlign: "center", transform: "rotate(-2deg)", marginLeft: 10, marginTop: 10 }}
        >
          <p style={{ fontFamily: C.caveat, fontSize: 15, color: "#fff", lineHeight: 1.3 }}>Heaven is<br />our home</p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 10 }}>
        <span style={{ color: "rgba(255,255,255,0.28)", fontSize: 8.5, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: C.sans }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 1, height: 26, background: "linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)" }}
        />
      </div>
    </div>
  );
}

/* ─── Chapter 01: Just A Normal Kid ───────────────────────────────────── */
function Chapter01() {
  return (
    <section id="normal-kid" style={{ background: C.paper, padding: "80px clamp(20px,5vw,72px) 96px", position: "relative", overflow: "hidden" }}>
      <GhostNum num="01" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div style={{ paddingTop: 56 }}>
            <Fade>
              <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>01 ✳</p>
              <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3rem, 6.5vw, 6rem)", color: "#1a1a1a", lineHeight: 0.92, marginBottom: 20 }}>
                JUST A<br />NORMAL KID
              </h2>
            </Fade>
            <Fade delay={0.12}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "#444", lineHeight: 1.72, marginBottom: 28, maxWidth: 420 }}>
                Carlo was a cheerful, generous, and ordinary boy who loved life, his friends, and the little things.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <button style={{ fontFamily: C.sans, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, border: `1.5px solid ${C.accent}`, background: "transparent", padding: "10px 22px", cursor: "pointer" }}>
                Read More →
              </button>
            </Fade>
          </div>

          {/* Right: scrapbook collage */}
          <div style={{ position: "relative", minHeight: 400 }}>
            <Fade delay={0.06}>
              <div style={{ position: "absolute", top: 0, right: 10 }}>
                <PhotoCard src="/youngcarlo.png" alt="Young Carlo Acutis" w={175} h={220} rotate={-2} caption="Carlo, Milan c. 1999" />
              </div>
            </Fade>

            <Fade delay={0.2}>
              <div style={{ position: "absolute", top: 70, left: 0, zIndex: 5 }}>
                <NotebookPaper rotate={1.5}>
                  <p style={{ fontFamily: C.caveat, fontSize: 16.5, fontWeight: 700, color: "#333", marginBottom: 10, textDecoration: "underline" }}>
                    Little Things He Loved:
                  </p>
                  {["→  Soccer", "→  Video games", "→  Animals", "→  Friends", "→  Family", "→  Laughing", "→  Adventure"].map((item) => (
                    <p key={item} style={{ fontFamily: C.caveat, fontSize: 15.5, color: "#555", lineHeight: 2.05 }}>{item}</p>
                  ))}
                </NotebookPaper>
              </div>
            </Fade>

            {/* Smiley doodle */}
            <Fade delay={0.32}>
              <div style={{ position: "absolute", bottom: 8, right: 8, opacity: 0.45 }}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <circle cx="17" cy="17" r="15" stroke={C.accent} strokeWidth="1.6" />
                  <circle cx="12" cy="14" r="2.2" fill={C.accent} />
                  <circle cx="22" cy="14" r="2.2" fill={C.accent} />
                  <path d="M11 21 Q17 27.5 23 21" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 02: Discovering Faith ──────────────────────────────────── */
function Chapter02() {
  return (
    <section id="faith" style={{ background: C.paper2, padding: "80px clamp(20px,5vw,72px) 96px", position: "relative", overflow: "hidden" }}>
      <GhostNum num="02" />
      <div className="max-w-5xl mx-auto relative z-10">
        <Fade>
          <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>02 ✳</p>
          <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3rem, 6.5vw, 6rem)", color: "#1a1a1a", lineHeight: 0.92, marginBottom: 44 }}>
            DISCOVERING FAITH
          </h2>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <Fade delay={0.06}>
            <PhotoCard src="/gallery/candles-church.jpg" alt="Candles in church" w={220} h={270} rotate={-1.5} caption="Daily Mass, Milan" />
          </Fade>

          <Fade delay={0.15} style={{ alignSelf: "center" } as React.CSSProperties}>
            <div style={{ transform: "rotate(1.5deg)" }}>
              <QuoteCard quote="The Eucharist is my highway to heaven." author="Carlo Acutis" />
            </div>
            {/* Rosary doodle */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, opacity: 0.55, paddingLeft: 6 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12">
                  <circle cx="6" cy="6" r="5" fill="none" stroke={C.accent} strokeWidth="1.3" />
                </svg>
              ))}
              <span style={{ fontFamily: C.caveat, fontSize: 12, color: "#999" }}>rosary, daily</span>
            </div>
          </Fade>

          <Fade delay={0.22}>
            <p style={{ fontFamily: C.sans, fontSize: 15, color: "#555", lineHeight: 1.72 }}>
              Everything changed when Carlo discovered the immense love of Jesus in the Eucharist. He begged to receive First Communion early, and from age 7 attended daily Mass — not because anyone required it, but because he wanted to.
            </p>
            <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(199,74,42,0.06)", borderLeft: `3px solid ${C.accent}` }}>
              <p style={{ fontFamily: C.caveat, fontSize: 15, color: C.accent }}>
                &ldquo;When we face the sun, we get a tan. When we face Jesus in the Eucharist, we become saints.&rdquo;
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 03: The Digital Mission ────────────────────────────────── */
function Chapter03() {
  const cards = [
    { icon: "</>", label: "PROGRAMMER", desc: "He taught himself coding and built websites from scratch." },
    { icon: "✏", label: "DESIGNER", desc: "He had an eye for design, structure, and communicating truth." },
    { icon: "⊕", label: "CREATOR", desc: "He created a website cataloging every Eucharistic miracle in the world." },
  ];

  return (
    <section id="digital-mission" style={{ background: C.dark, padding: "80px clamp(20px,5vw,72px) 96px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -10, left: "clamp(8px,2vw,24px)", fontFamily: C.bebas, fontSize: "clamp(100px,18vw,220px)", lineHeight: 1, color: "rgba(199,74,42,0.08)", userSelect: "none", pointerEvents: "none" }}>
        03
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Fade>
          <div style={{ display: "inline-block", border: `2px solid ${C.accent}`, borderRadius: "50%", padding: "5px 16px", marginBottom: 18 }}>
            <span style={{ fontFamily: C.caveat, fontSize: 14, color: C.accent }}>AGE 11</span>
          </div>
        </Fade>
        <Fade delay={0.06}>
          <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>03 ✳</p>
          <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3rem, 6.5vw, 6rem)", color: "#fff", lineHeight: 0.92, marginBottom: 14 }}>
            THE DIGITAL<br />MISSION
          </h2>
          <p style={{ fontFamily: C.sans, fontSize: 15, color: "rgba(255,255,255,0.48)", maxWidth: 480, lineHeight: 1.7, marginBottom: 48 }}>
            At just 11 years old, Carlo started using his talent with computers to evangelize.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {cards.map(({ icon, label, desc }, i) => (
            <Fade key={label} delay={i * 0.1}>
              <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", padding: "32px 24px" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 26, color: "rgba(255,255,255,0.12)", marginBottom: 14 }}>{icon}</p>
                <p style={{ fontFamily: C.bebas, fontSize: 22, color: "#fff", letterSpacing: "0.04em", marginBottom: 10 }}>{label}</p>
                <p style={{ fontFamily: C.sans, fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.62 }}>{desc}</p>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.32}>
          <p style={{ fontFamily: C.caveat, fontSize: 20, color: "rgba(255,255,255,0.2)" }}>
            <span style={{ textDecoration: "line-through" }}>Not for school.</span>{" "}
            <span style={{ color: C.gold }}>For <span style={{ textDecoration: `underline ${C.accent}`, textDecorationColor: C.accent }}>souls.</span></span>
          </p>
        </Fade>
      </div>
    </section>
  );
}

/* ─── Chapter 04: What Were You Doing At 15? ────────────────────────── */
function Chapter04() {
  const avg = [
    "Hanging out with friends",
    "Studying for tests",
    "Playing sports",
    "Scrolling social media",
    "Figuring life out (as always)",
  ];
  const carlo = [
    "Building websites",
    "Cataloging Eucharistic miracles",
    "Going to daily Mass",
    "Helping classmates",
    "Learning new programming languages",
  ];

  return (
    <section id="doing-at-15" style={{ background: C.paper3, padding: "80px clamp(20px,5vw,72px) 96px", position: "relative", overflow: "hidden" }}>
      <GhostNum num="04" />
      <div className="max-w-5xl mx-auto relative z-10">
        <Fade>
          <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>04 ✳</p>
          <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3rem, 6.5vw, 6rem)", color: "#1a1a1a", lineHeight: 0.92, marginBottom: 10 }}>
            WHAT WERE YOU<br />DOING AT 15?
          </h2>
          <p style={{ fontFamily: C.caveat, fontSize: 14, color: "#999", marginBottom: 44 }}>Swipe to compare ↓</p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] gap-6 items-start">
          {/* Average teen */}
          <Fade delay={0.1}>
            <NotebookPaper rotate={-1}>
              <p style={{ fontFamily: C.caveat, fontSize: 15.5, color: "#999", textDecoration: "underline", marginBottom: 12 }}>YOUR AGE 15</p>
              {avg.map((item) => (
                <p key={item} style={{ fontFamily: C.caveat, fontSize: 15, color: "#666", lineHeight: 2.1 }}>→ {item}</p>
              ))}
            </NotebookPaper>
          </Fade>

          {/* VS */}
          <Fade delay={0.16}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 48, paddingBottom: 24 }}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <ellipse cx="36" cy="36" rx="32" ry="28" stroke={C.accent} strokeWidth="2" strokeDasharray="5 3" />
                </svg>
                <p style={{ fontFamily: C.bebas, fontSize: 42, color: C.accent, lineHeight: 1 }}>VS</p>
              </div>
            </div>
          </Fade>

          {/* Carlo */}
          <Fade delay={0.22}>
            <NotebookPaper rotate={1}>
              <p style={{ fontFamily: C.caveat, fontSize: 15.5, color: C.accent, textDecoration: "underline", marginBottom: 12 }}>CARLO AT 15</p>
              {carlo.map((item) => (
                <p key={item} style={{ fontFamily: C.caveat, fontSize: 15, color: "#444", lineHeight: 2.1 }}>→ {item}</p>
              ))}
            </NotebookPaper>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapters 05–08: Bottom grid ────────────────────────────────────── */
const GRID_CHAPTERS = [
  {
    id:    "toolkit",
    num:   "05",
    title: "Carlo's Toolkit",
    img:   "/gallery/stained-glass.jpg",
    desc:  "A rosary, a camera, a laptop, and a Bible. Simple instruments in the hands of a saint.",
    badge: null,
  },
  {
    id:    "miracles",
    num:   "06",
    title: "Eucharistic Miracles",
    img:   "/gallery/cathedral-interior.jpg",
    desc:  "He catalogued 136 Eucharistic miracles from around the world — a living testament of faith.",
    badge: "EUCHARISTIC NERD",
  },
  {
    id:    "final-days",
    num:   "07",
    title: "Carlo's Final Days",
    img:   "/gallery/cross-sunset.jpg",
    desc:  "He offered his sufferings for the Pope and the Church. Heaven was his final destination.",
    badge: null,
  },
  {
    id:    "legacy",
    num:   "08",
    title: "The Legacy Continues",
    img:   "/gallery/vatican-square.jpg",
    desc:  "His story didn't end. It just began. Canonized April 27, 2025 — the first millennial saint.",
    badge: null,
  },
] as const;

function BottomChapters() {
  return (
    <section style={{ background: C.dark2, padding: "0" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {GRID_CHAPTERS.map(({ id, num, title, img, desc, badge }, i) => (
          <Fade key={id} delay={i * 0.08}>
            <div
              id={id}
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden", position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 190, flexShrink: 0 }}>
                <Image src={img} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" style={{ filter: "grayscale(55%) brightness(0.55)" }} />
                {badge && (
                  <div style={{ position: "absolute", bottom: 12, left: 12, background: C.accent, padding: "4px 10px", transform: "rotate(-2deg)" }}>
                    <p style={{ fontFamily: C.caveat, fontSize: 13, color: "#fff", fontWeight: 700 }}>{badge}</p>
                  </div>
                )}
              </div>
              {/* Text */}
              <div style={{ padding: "20px 20px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                <p style={{ fontFamily: C.bebas, fontSize: 12, color: C.accent, letterSpacing: "0.18em", marginBottom: 5 }}>{num} ✳</p>
                <p style={{ fontFamily: C.bebas, fontSize: 20, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>{title.toUpperCase()}</p>
                <p style={{ fontFamily: C.sans, fontSize: 12.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.62, marginBottom: 18, flex: 1 }}>{desc}</p>
                <button style={{ fontFamily: C.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, background: "transparent", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                  Explore →
                </button>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

/* ─── Closing statement ───────────────────────────────────────────────── */
function ClosingStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      style={{
        background: "#0c0c0c",
        padding: "110px clamp(20px,7vw,96px) 120px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(199,74,42,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

      <motion.div ref={ref} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
        <p style={{ fontFamily: C.bebas, fontSize: "clamp(2.8rem,7vw,6.5rem)", color: "#fff", lineHeight: 0.92, marginBottom: 4 }}>
          WE ARE ALL BORN
        </p>
        <div style={{ display: "inline-block", position: "relative" }}>
          <p style={{ fontFamily: C.bebas, fontSize: "clamp(2.8rem,7vw,6.5rem)", color: "#fff", lineHeight: 0.92 }}>
            ORIGINALS.
          </p>
          <svg
            style={{ position: "absolute", bottom: -10, left: 0, width: "100%", overflow: "visible" }}
            viewBox="0 0 300 22"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M4,12 Q75,2 150,12 Q225,22 296,12"
              stroke={C.accent}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.1, delay: 0.55 }}
            />
          </svg>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.65 }}
        style={{ fontFamily: C.caveat, fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "rgba(255,255,255,0.38)", marginTop: 24, marginBottom: 54 }}
      >
        Don&apos;t die as photocopies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.85 }}
      >
        <Link
          href="/contact"
          style={{
            fontFamily: C.sans,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#111",
            background: "#fff",
            padding: "15px 40px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Continue Carlo&apos;s Mission →
        </Link>
      </motion.div>
    </section>
  );
}

/* ─── Root export ─────────────────────────────────────────────────────── */
export default function CarloStoryPage() {
  return (
    <div>
      <Hero />
      <Chapter01 />
      <Chapter02 />
      <Chapter03 />
      <Chapter04 />
      <BottomChapters />
      <ClosingStatement />
    </div>
  );
}
