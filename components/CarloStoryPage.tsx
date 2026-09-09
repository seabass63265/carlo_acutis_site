"use client";
import { useEffect, useId, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

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

/* ─── Fade-in on scroll ────────────────────────────────────────────────── */
function Fade({
  children,
  delay = 0,
  y = 24,
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
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
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

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  const svgRef = useRef<SVGSVGElement>(null);
  const smudgeGroupRef = useRef<SVGGElement>(null);
  const rawId = useId().replace(/[:]/g, "");
  const maskId = `smudge-mask-${rawId}`;
  const filterId = `smudge-goo-${rawId}`;

  // Cursor/touch "smudge" reveal — wiping across the dark headline layer
  // paints growing, dissolving circles into an SVG mask, letting the photo
  // collage layer underneath show through wherever the visitor has moved.
  useEffect(() => {
    const heroEl = heroRef.current;
    const svg = svgRef.current;
    const smudgeContainer = smudgeGroupRef.current;
    if (!heroEl || !svg || !smudgeContainer) return;

    const config = {
      smoothing: 0.1,
      movementThreshold: 0.01,
      sizeFromSpeed: 0.2,
      expandMultiplier: 2,
      expandTime: 2,
      expandEase: "power1.inOut",
      dissolveStart: 2,
      dissolveTime: 3,
      dissolveEase: "power3.in",
    };

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };
    let hasStarted = false;
    let rafId = 0;
    const activeTimelines = new Set<gsap.core.Timeline>();

    function toLocalPoint(clientX: number, clientY: number) {
      const rect = heroEl!.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onPointerMove(x: number, y: number) {
      if (!hasStarted) {
        pointer.x = smoothPointer.x = x;
        pointer.y = smoothPointer.y = y;
        hasStarted = true;
        return;
      }
      pointer.x = x;
      pointer.y = y;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const p = toLocalPoint(e.clientX, e.clientY);
      onPointerMove(p.x, p.y);
    };
    const handleTouchStart = (e: TouchEvent) => {
      const p = toLocalPoint(e.touches[0].clientX, e.touches[0].clientY);
      onPointerMove(p.x, p.y);
    };
    const handleTouchMove = (e: TouchEvent) => {
      const p = toLocalPoint(e.touches[0].clientX, e.touches[0].clientY);
      onPointerMove(p.x, p.y);
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    heroEl.addEventListener("touchmove", handleTouchMove, { passive: true });

    function matchSVGToHero() {
      const rect = heroEl!.getBoundingClientRect();
      svg!.style.width = rect.width + "px";
      svg!.style.height = rect.height + "px";
    }
    matchSVGToHero();
    window.addEventListener("resize", matchSVGToHero);

    function stampSmudgeAt(x: number, y: number, radius: number) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", String(x));
      circle.setAttribute("cy", String(y));
      circle.setAttribute("r", String(radius));
      circle.setAttribute("fill", "#fff");
      smudgeContainer!.prepend(circle);

      const animatedRadius = { current: radius };
      const timeline = gsap.timeline({
        onUpdate() {
          circle.setAttribute("r", String(Math.max(0, animatedRadius.current)));
        },
        onComplete() {
          activeTimelines.delete(timeline);
          timeline.kill();
          circle.remove();
        },
      });
      activeTimelines.add(timeline);

      timeline.to(animatedRadius, {
        current: radius * config.expandMultiplier,
        duration: config.expandTime,
        ease: config.expandEase,
      });
      timeline.to(
        animatedRadius,
        { current: 0, duration: config.dissolveTime, ease: config.dissolveEase },
        config.dissolveStart,
      );
    }

    function update() {
      if (hasStarted) {
        smoothPointer.x += (pointer.x - smoothPointer.x) * config.smoothing;
        smoothPointer.y += (pointer.y - smoothPointer.y) * config.smoothing;

        const speed = Math.hypot(pointer.x - smoothPointer.x, pointer.y - smoothPointer.y);
        if (speed > config.movementThreshold) {
          stampSmudgeAt(smoothPointer.x, smoothPointer.y, speed * config.sizeFromSpeed);
        }
      }
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("touchstart", handleTouchStart);
      heroEl.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", matchSVGToHero);
      cancelAnimationFrame(rafId);
      activeTimelines.forEach((tl) => tl.kill());
    };
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "100svh", background: "#0d0d0d", paddingTop: 64 }}>
      {/* Dark surface — headline lives here, permanently visible except where smudged away */}
      <div
        className="absolute inset-0 flex items-end overflow-hidden"
        style={{ top: 64, padding: "0 0 clamp(24px, 4vw, 48px)" }}
      >
        <h1
          style={{
            fontFamily: C.bebas,
            fontSize: "32vw",
            lineHeight: 0.85,
            letterSpacing: "0.01em",
            color: "#D8C9A8",
            whiteSpace: "nowrap",
          }}
        >
          DIG IN
        </h1>
      </div>

      {/* Quote panel — hidden by the mask, revealed only where the visitor has smudged */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center"
        style={{
          top: 64,
          y: bgY,
          background: C.paper,
          padding: "2rem clamp(24px, 8vw, 120px)",
          paddingTop: "18vh",
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`,
        }}
      >
        <p
          style={{
            fontFamily: C.bebas,
            fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)",
            lineHeight: 1.15,
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            color: C.dark,
            maxWidth: 960,
          }}
        >
          Carlo did not become a saint because he was perfect. He became a saint because he
          chose God every day. Behind every miracle and every headline was a teenager learning
          how to love Christ more deeply.
        </p>
      </motion.div>

      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute pointer-events-none"
        style={{ top: 64, left: 0 }}
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -14" />
          </filter>
        </defs>
        <mask id={maskId}>
          <g ref={smudgeGroupRef} filter={`url(#${filterId})`} />
        </mask>
      </svg>

      <div style={{ position: "absolute", top: 72, right: "clamp(20px, 5vw, 80px)" }}>
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

        <motion.div
          initial={{ opacity: 0, rotate: 4, y: 20 }}
          animate={{ opacity: 1, rotate: 4, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          style={{ border: `2.5px solid rgba(217,164,65,0.65)`, padding: "12px 20px", textAlign: "center", marginLeft: 36, marginTop: 14 }}
        >
          <p style={{ fontFamily: C.bebas, fontSize: 20, color: C.gold, letterSpacing: "0.08em" }}>DIGITAL</p>
          <p style={{ fontFamily: C.bebas, fontSize: 20, color: C.gold, letterSpacing: "0.08em" }}>SAINT</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 1.5 }}
          style={{ background: C.accent, padding: "11px 18px", textAlign: "center", transform: "rotate(-2deg)", marginLeft: 10, marginTop: 10 }}
        >
          <p style={{ fontFamily: C.caveat, fontSize: 15, color: "#fff", lineHeight: 1.3 }}>Heaven is<br />our home</p>
        </motion.div>
      </div>

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

      <FlowArt aria-label="Carlo Acutis — The Story">

        {/* ── 01 Just A Normal Kid ──────────────────────────────────────── */}
        <FlowSection aria-label="Just a Normal Kid" style={{ backgroundColor: C.paper }}>
          <GhostNum num="01" />

          <Fade>
            <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>01 ✳</p>
            <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "#1a1a1a", lineHeight: 0.88 }}>
              JUST A<br />NORMAL KID
            </h2>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Fade delay={0.1}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "#444", lineHeight: 1.72, maxWidth: 420 }}>
                Carlo was just like any other teenager. He loved soccer, video games, his friends, animals, and making people laugh. What made him different wasn&apos;t that he lived an extraordinary life. It was that he invited God into the ordinary moments of every day.
              </p>
            </Fade>

            <div style={{ position: "relative", minHeight: 380 }}>
              <Fade delay={0.05}>
                <div style={{ position: "absolute", top: 0, right: 10 }}>
                  <PhotoCard src="/youngcarlo.png" alt="Young Carlo Acutis" w={175} h={220} rotate={-2} caption="Carlo, Milan c. 1999" />
                </div>
              </Fade>
              <Fade delay={0.18}>
                <div style={{ position: "absolute", top: 64, left: 0, zIndex: 5 }}>
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
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Fade delay={0.22}>
              <button style={{ fontFamily: C.sans, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, border: `1.5px solid ${C.accent}`, background: "transparent", padding: "10px 22px", cursor: "pointer" }}>
                Read More →
              </button>
            </Fade>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ opacity: 0.4 }}>
              <circle cx="17" cy="17" r="15" stroke={C.accent} strokeWidth="1.6" />
              <circle cx="12" cy="14" r="2.2" fill={C.accent} />
              <circle cx="22" cy="14" r="2.2" fill={C.accent} />
              <path d="M11 21 Q17 27.5 23 21" stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </FlowSection>

        {/* ── 02 Falling in Love with Jesus ────────────────────────────── */}
        <FlowSection aria-label="Falling in Love with Jesus" style={{ backgroundColor: C.paper2 }}>
          <GhostNum num="02" />

          <Fade>
            <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>02 ✳</p>
            <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3rem, 8vw, 8.5rem)", color: "#1a1a1a", lineHeight: 0.88 }}>
              FALLING IN LOVE<br />WITH JESUS
            </h2>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <Fade delay={0.06}>
              <PhotoCard src="/carlopic2.jpg" alt="Candles in church" w={220} h={270} rotate={-1.5} caption="Daily Mass, Milan" />
            </Fade>

            <Fade delay={0.14}>
              <QuoteCard quote="The Eucharist is my highway to heaven." author="Carlo Acutis" rotate={1.5} />
              <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 8, opacity: 0.5, paddingLeft: 6 }}>
                {[0,1,2,3,4].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5" fill="none" stroke={C.accent} strokeWidth="1.3" />
                  </svg>
                ))}
                <span style={{ fontFamily: C.caveat, fontSize: 12, color: "#999" }}>rosary, daily</span>
              </div>
            </Fade>

            <Fade delay={0.2}>
              <p style={{ fontFamily: C.sans, fontSize: 15, color: "#555", lineHeight: 1.72 }}>
                From a young age, Carlo found something special in the Eucharist. Going to Mass and spending time with Jesus became the best part of his day. He believed that the closer we are to Jesus, the happier we become.
              </p>
            </Fade>
          </div>

          <Fade delay={0.26}>
            <div style={{ padding: "14px 18px", background: "rgba(199,74,42,0.06)", borderLeft: `3px solid ${C.accent}`, maxWidth: 520 }}>
              <p style={{ fontFamily: C.caveat, fontSize: 16, color: C.accent, lineHeight: 1.55 }}>
                &ldquo;When we face the sun, we get a tan. When we face Jesus in the Eucharist, we become saints.&rdquo;
              </p>
            </div>
          </Fade>
        </FlowSection>

        {/* ── 03 Living His Faith ───────────────────────────────────────── */}
        <FlowSection aria-label="Living His Faith" style={{ backgroundColor: C.paper3 }}>
          <GhostNum num="03" />

          <Fade>
            <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>03 ✳</p>
            <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "#1a1a1a", lineHeight: 0.88 }}>
              LIVING<br />HIS FAITH
            </h2>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Fade delay={0.1}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "#444", lineHeight: 1.72, maxWidth: 420 }}>
                Carlo didn&apos;t keep his faith inside the walls of a church. He lived it every day by being kind, standing up for classmates who were bullied, helping people in need, and always treating others with love and respect.
              </p>
            </Fade>

            <Fade delay={0.18}>
              <NotebookPaper rotate={-1.5}>
                <p style={{ fontFamily: C.caveat, fontSize: 16.5, fontWeight: 700, color: "#333", marginBottom: 10, textDecoration: "underline" }}>
                  How He Lived It:
                </p>
                {[
                  "→  Being kind to everyone",
                  "→  Defending bullied classmates",
                  "→  Helping people in need",
                  "→  Welcoming the lonely",
                  "→  Treating everyone with love",
                  "→  Seeing God in every person",
                ].map((item) => (
                  <p key={item} style={{ fontFamily: C.caveat, fontSize: 15.5, color: "#555", lineHeight: 2.05 }}>{item}</p>
                ))}
              </NotebookPaper>
            </Fade>
          </div>
        </FlowSection>

        {/* ── 04 A Mission on the Internet ─────────────────────────────── */}
        <FlowSection aria-label="A Mission on the Internet" style={{ backgroundColor: C.dark }}>
          <GhostNum num="04" dark />

          <div>
            <Fade>
              <div style={{ display: "inline-block", border: `2px solid ${C.accent}`, borderRadius: "50%", padding: "5px 16px", marginBottom: 14 }}>
                <span style={{ fontFamily: C.caveat, fontSize: 14, color: C.accent }}>AGE 11</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>04 ✳</p>
              <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3rem, 8vw, 8.5rem)", color: "#fff", lineHeight: 0.88 }}>
                A MISSION ON<br />THE INTERNET
              </h2>
              <p style={{ fontFamily: C.sans, fontSize: 15, color: "rgba(255,255,255,0.46)", maxWidth: 440, lineHeight: 1.7, marginTop: 10 }}>
                Carlo loved computers and technology, but he saw them as more than entertainment.
              </p>
            </Fade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: "</>", label: "SELF-TAUGHT", desc: "He taught himself how to build websites because he wanted to use the internet to share Jesus with the world." },
              { icon: "✦", label: "EVANGELIST", desc: "Long before social media became part of everyday life, Carlo showed that technology could be a force for good." },
              { icon: "⊕", label: "PIONEER", desc: "He used every digital tool available to him to bring others closer to God — a saint for the digital age." },
            ].map(({ icon, label, desc }, i) => (
              <Fade key={label} delay={i * 0.1}>
                <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)", padding: "32px 24px" }}>
                  <p style={{ fontFamily: C.sans, fontSize: 26, color: "rgba(255,255,255,0.12)", marginBottom: 14 }}>{icon}</p>
                  <p style={{ fontFamily: C.bebas, fontSize: 22, color: "#fff", letterSpacing: "0.04em", marginBottom: 10 }}>{label}</p>
                  <p style={{ fontFamily: C.sans, fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.62 }}>{desc}</p>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.3}>
            <p style={{ fontFamily: C.caveat, fontSize: 22, color: "rgba(255,255,255,0.22)" }}>
              <span style={{ textDecoration: "line-through" }}>Not for school.</span>{" "}
              <span style={{ color: C.gold }}>For <span style={{ textDecorationColor: C.accent, textDecoration: "underline" }}>souls.</span></span>
            </p>
          </Fade>
        </FlowSection>

        {/* ── 05 Sharing Eucharistic Miracles ──────────────────────────── */}
        <FlowSection aria-label="Sharing Eucharistic Miracles" style={{ backgroundColor: C.paper }}>
          <GhostNum num="05" />

          <Fade>
            <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>05 ✳</p>
            <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(2.8rem, 7vw, 8rem)", color: "#1a1a1a", lineHeight: 0.88 }}>
              SHARING EUCHARISTIC<br />MIRACLES
            </h2>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Fade delay={0.1}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "#444", lineHeight: 1.72, maxWidth: 420 }}>
                At only eleven years old, Carlo began researching Eucharistic miracles from around the world. He created a website so anyone could learn about these incredible stories and discover the beauty of the Eucharist for themselves.
              </p>
              <div style={{ marginTop: 24, padding: "18px 22px", background: "rgba(199,74,42,0.06)", borderLeft: `3px solid ${C.accent}`, display: "inline-block" }}>
                <p style={{ fontFamily: C.bebas, fontSize: 56, color: C.accent, lineHeight: 1 }}>136</p>
                <p style={{ fontFamily: C.caveat, fontSize: 15, color: "#888", marginTop: 2 }}>Eucharistic Miracles catalogued</p>
              </div>
            </Fade>

            <div style={{ position: "relative", minHeight: 340 }}>
              <Fade delay={0.1}>
                <div style={{ position: "absolute", top: 0, left: 20 }}>
                  <PhotoCard src="/carlopic3.jpg" alt="Stained glass" w={180} h={220} rotate={2} caption="The Eucharistic Miracles Exhibition" />
                </div>
              </Fade>
              <Fade delay={0.22}>
                <div style={{ position: "absolute", top: 80, right: 0, zIndex: 5 }}>
                  <NotebookPaper rotate={-2} style={{ maxWidth: 200 }}>
                    <p style={{ fontFamily: C.caveat, fontSize: 15, fontWeight: 700, color: "#333", marginBottom: 8, textDecoration: "underline" }}>Why it mattered:</p>
                    {["→  Free for anyone", "→  Countries worldwide", "→  Scientific evidence", "→  Photos + history"].map((item) => (
                      <p key={item} style={{ fontFamily: C.caveat, fontSize: 13.5, color: "#666", lineHeight: 2.0 }}>{item}</p>
                    ))}
                  </NotebookPaper>
                </div>
              </Fade>
            </div>
          </div>
        </FlowSection>

        {/* ── 06 A Friend to Everyone ───────────────────────────────────── */}
        <FlowSection aria-label="A Friend to Everyone" style={{ backgroundColor: C.paper2 }}>
          <GhostNum num="06" />

          <Fade>
            <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>06 ✳</p>
            <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "#1a1a1a", lineHeight: 0.88 }}>
              A FRIEND TO<br />EVERYONE
            </h2>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <Fade delay={0.1}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "#444", lineHeight: 1.72 }}>
                One of the things people remember most about Carlo is how he treated others. He welcomed everyone, especially those who felt left out. He shared what he had with people in need and believed every person deserved to be loved because every person is a child of God.
              </p>
            </Fade>

            <div className="flex flex-col gap-5">
              <Fade delay={0.14}>
                <NotebookPaper rotate={1}>
                  <p style={{ fontFamily: C.caveat, fontSize: 16.5, fontWeight: 700, color: "#333", marginBottom: 10, textDecoration: "underline" }}>
                    What people say about him:
                  </p>
                  {[
                    "→  He always made you feel seen",
                    "→  He shared everything he had",
                    "→  He never excluded anyone",
                    "→  He treated the poor like family",
                  ].map((item) => (
                    <p key={item} style={{ fontFamily: C.caveat, fontSize: 15.5, color: "#555", lineHeight: 2.05 }}>{item}</p>
                  ))}
                </NotebookPaper>
              </Fade>
              <Fade delay={0.22}>
                <QuoteCard
                  quote="Every person deserves to be loved because every person is a child of God."
                  author="Carlo Acutis"
                  rotate={-1.5}
                />
              </Fade>
            </div>
          </div>
        </FlowSection>

        {/* ── 07 His Final Days ─────────────────────────────────────────── */}
        <FlowSection aria-label="His Final Days" style={{ backgroundColor: C.dark2 }}>
          <GhostNum num="07" dark />

          <div>
            <Fade>
              <div style={{ display: "inline-block", border: `2px solid ${C.accent}`, borderRadius: "50%", padding: "5px 16px", marginBottom: 14 }}>
                <span style={{ fontFamily: C.caveat, fontSize: 14, color: C.accent }}>AGE 15</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>07 ✳</p>
              <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "#fff", lineHeight: 0.88 }}>
                HIS FINAL<br />DAYS
              </h2>
            </Fade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <Fade delay={0.1}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "rgba(255,255,255,0.52)", lineHeight: 1.72, maxWidth: 400 }}>
                When Carlo was diagnosed with leukemia at fifteen, he faced it with incredible peace and faith. Instead of thinking only about himself, he offered his suffering for the Pope, the Church, and for people who needed God&apos;s help. His trust in Jesus never wavered.
              </p>
            </Fade>

            <Fade delay={0.18}>
              <QuoteCard
                quote="I offer all my suffering to the Lord, for the Pope and for the Church."
                author="Carlo Acutis"
                rotate={-1}
                dark
              />
              <div style={{ marginTop: 24, display: "flex", gap: 16, paddingLeft: 4 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: C.bebas, fontSize: 36, color: C.gold, lineHeight: 1 }}>2006</p>
                  <p style={{ fontFamily: C.caveat, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>Diagnosed</p>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,0.1)", alignSelf: "stretch" }} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: C.bebas, fontSize: 36, color: C.gold, lineHeight: 1 }}>OCT 12</p>
                  <p style={{ fontFamily: C.caveat, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>Passed to Heaven</p>
                </div>
              </div>
            </Fade>
          </div>
        </FlowSection>

        {/* ── 08 His Story Continues ────────────────────────────────────── */}
        <FlowSection aria-label="His Story Continues" style={{ backgroundColor: C.dark }}>
          <GhostNum num="08" dark />

          <Fade>
            <p style={{ fontFamily: C.sans, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.3em", color: C.accent, textTransform: "uppercase", marginBottom: 6 }}>08 ✳</p>
            <h2 style={{ fontFamily: C.bebas, fontSize: "clamp(3.5rem, 9vw, 9rem)", color: "#fff", lineHeight: 0.88 }}>
              HIS STORY<br />CONTINUES
            </h2>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <Fade delay={0.1}>
              <p style={{ fontFamily: C.sans, fontSize: 16, color: "rgba(255,255,255,0.52)", lineHeight: 1.72 }}>
                Carlo&apos;s life may have been short, but his impact continues to grow every day. Through the miracles recognized by the Church and the millions of people inspired by his example, Carlo reminds us that holiness isn&apos;t only for a few people. It&apos;s something every one of us is called to.
              </p>
              <div style={{ marginTop: 28, padding: "18px 22px", border: `1px solid rgba(217,164,65,0.3)`, display: "inline-block" }}>
                <p style={{ fontFamily: C.bebas, fontSize: 13, color: C.gold, letterSpacing: "0.18em", marginBottom: 4 }}>CANONIZED</p>
                <p style={{ fontFamily: C.bebas, fontSize: 28, color: "#fff", lineHeight: 1 }}>APRIL 27, 2025</p>
                <p style={{ fontFamily: C.caveat, fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>The first millennial saint</p>
              </div>
            </Fade>

            <Fade delay={0.18}>
              <QuoteCard
                quote="All people are born as originals, but many die as photocopies."
                author="Carlo Acutis"
                rotate={1.5}
                dark
              />
            </Fade>
          </div>
        </FlowSection>

      </FlowArt>

      <ClosingStatement />
    </div>
  );
}
