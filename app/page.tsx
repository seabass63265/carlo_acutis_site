"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Preloader from "@/components/Preloader";

const LOCALES = [
  { code: "en", label: "English",   native: "English"    },
  { code: "es", label: "Español",   native: "Español"    },
  { code: "it", label: "Italiano",  native: "Italiano"   },
  { code: "fr", label: "Français",  native: "Français"   },
  { code: "pt", label: "Português", native: "Português"  },
];

// Deterministic particle positions to avoid hydration mismatch
const PARTICLES = [
  { x: 12,  y: 18,  size: 1.5, delay: 0,    dur: 6  },
  { x: 78,  y: 8,   size: 2,   delay: 1.2,  dur: 8  },
  { x: 92,  y: 45,  size: 1,   delay: 0.5,  dur: 7  },
  { x: 5,   y: 62,  size: 2.5, delay: 2,    dur: 9  },
  { x: 55,  y: 5,   size: 1.5, delay: 0.8,  dur: 6  },
  { x: 88,  y: 78,  size: 1,   delay: 1.5,  dur: 10 },
  { x: 22,  y: 88,  size: 2,   delay: 0.3,  dur: 7  },
  { x: 68,  y: 92,  size: 1.5, delay: 2.5,  dur: 8  },
  { x: 45,  y: 15,  size: 1,   delay: 1,    dur: 6  },
  { x: 35,  y: 75,  size: 2,   delay: 1.8,  dur: 9  },
  { x: 82,  y: 32,  size: 1.5, delay: 0.6,  dur: 7  },
  { x: 15,  y: 42,  size: 1,   delay: 2.2,  dur: 8  },
  { x: 62,  y: 55,  size: 2,   delay: 1.4,  dur: 6  },
  { x: 48,  y: 85,  size: 1.5, delay: 0.9,  dur: 10 },
  { x: 8,   y: 30,  size: 1,   delay: 1.7,  dur: 7  },
];

type BezierCurve = [number, number, number, number];
const easeOut: BezierCurve = [0.25, 0.46, 0.45, 0.94];
const easeInOut: BezierCurve = [0.4, 0, 0.2, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.7 } },
  exit: { opacity: 0, scale: 1.06, transition: { duration: 0.75, ease: easeInOut } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: easeOut } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay: i * 0.15, ease: easeOut },
  }),
};

export default function SplashPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [videoLocale, setVideoLocale] = useState<string | null>(null);
  const [fadeToBlack, setFadeToBlack] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("carlo-locale");
    if (stored && LOCALES.some((l) => l.code === stored)) {
      router.replace(`/${stored}`);
    } else {
      setReady(true);
    }
  }, [router]);

  function selectLocale(code: string) {
    if (videoLocale) return;
    localStorage.setItem("carlo-locale", code);
    setVideoLocale(code);
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* ── Full-screen background image ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/language_section.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [0.08, 0.35, 0.08] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Preloader — plays once before the language screen is revealed ── */}
      {ready && !preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* ── Intro video overlay ── */}
      <AnimatePresence>
        {videoLocale && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <video
              src="/carlointro.mp4"
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => {
                setFadeToBlack(true);
                setTimeout(() => router.push(`/${videoLocale}`), 2000);
              }}
              onError={() => router.push(`/${videoLocale}`)}
            />
            {/* Fade to black after video ends */}
            <motion.div
              className="absolute inset-0 bg-black pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: fadeToBlack ? 1 : 0 }}
              transition={{ duration: 2.0, ease: easeInOut }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Logo — top right on mobile, bottom right on desktop ── */}
      {ready && preloaderDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-6 left-4 md:top-auto md:bottom-8 md:left-auto md:right-8 z-20"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-full overflow-hidden w-[150px] h-[150px] md:w-[100px] md:h-[100px]"
            style={{
              boxShadow:
                "0 0 0 1px rgba(201,169,110,0.35), 0 0 0 5px rgba(201,169,110,0.08), 0 0 0 6px rgba(201,169,110,0.18), 0 8px 40px rgba(0,0,0,0.55), 0 0 60px rgba(201,169,110,0.18)",
            }}
          >
            <Image
              src="/FoC Logo w Halo.png"
              alt="Friends of Carlo Acutis"
              width={150}
              height={150}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      )}

      {/* ── Main content — bottom left ── */}
      {ready && preloaderDone && (
        <motion.div
          className="absolute bottom-3 left-4 md:bottom-8 md:left-20 z-10 flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Language label */}
          <motion.p
            variants={itemVariants}
            className="mb-2 md:mb-4 text-[9px] md:text-[10px] font-sans font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#4a4540" }}
          >
            Choose your language
          </motion.p>

          {/* Language pills */}
          <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2">
            {LOCALES.map((locale, i) => (
              <motion.button
                key={locale.code}
                custom={i}
                variants={cardVariants}
                onClick={() => selectLocale(locale.code)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between gap-1.5 px-3 py-1.5 md:px-5 md:py-2 rounded-full font-sans text-xs md:text-sm transition-all duration-200 focus:outline-none w-full md:w-auto"
                style={{
                  color: "#4a4540",
                  border: "1px solid rgba(74,69,64,0.45)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {locale.label}
                <span className="opacity-60">→</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
