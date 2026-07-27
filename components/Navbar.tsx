"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSvgWipe } from "@/components/SvgWipeProvider";

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

type NavTheme = {
  bg: string;
  scrollBg: string;
  mobileBg: string;
  logoText: string;
  linkText: string;
  linkHover: string;
  divider: string;
  /** Optional overrides applied once the header goes solid (scrolled/mobile open). Falls back to the base colors above when omitted. */
  scrollLogoText?: string;
  scrollLinkText?: string;
  scrollLinkHover?: string;
  scrollDivider?: string;
};

const PAGE_THEMES: Record<string, NavTheme> = {
  "/": {
    bg: "bg-transparent",
    scrollBg: "bg-cream/95 backdrop-blur-sm",
    mobileBg: "bg-cream",
    logoText: "text-navy",
    linkText: "text-navy/50",
    linkHover: "hover:text-navy",
    divider: "border-navy/10",
  },
  "/about": {
    bg: "bg-transparent",
    scrollBg: "bg-cream/95 backdrop-blur-sm",
    mobileBg: "bg-cream",
    logoText: "text-navy",
    linkText: "text-navy/50",
    linkHover: "hover:text-navy",
    divider: "border-navy/10",
  },
  "/carlo": {
    bg: "bg-transparent",
    scrollBg: "bg-[#EFE5D6]/95 backdrop-blur-sm",
    mobileBg: "bg-[#EFE5D6]",
    logoText: "text-[#F5F0E6]",
    linkText: "text-[#F5F0E6]/60",
    linkHover: "hover:text-[#F5F0E6]",
    divider: "border-white/10",
    scrollLogoText: "text-[#222222]",
    scrollLinkText: "text-[#222222]/50",
    scrollLinkHover: "hover:text-[#222222]",
    scrollDivider: "border-[#222222]/10",
  },
  "/eucharistic-miracles": {
    bg: "bg-transparent",
    scrollBg: "bg-navy-dark/90 backdrop-blur-sm",
    mobileBg: "bg-navy-dark",
    logoText: "text-white",
    linkText: "text-white/60",
    linkHover: "hover:text-white",
    divider: "border-white/10",
  },
  "/contact": {
    bg: "bg-[#1C1C2E]",
    scrollBg: "bg-[#1C1C2E]",
    mobileBg: "bg-[#1C1C2E]",
    logoText: "text-white",
    linkText: "text-white/50",
    linkHover: "hover:text-white",
    divider: "border-white/10",
  },
  "/donate": {
    bg: "bg-transparent",
    scrollBg: "bg-cream/95 backdrop-blur-sm",
    mobileBg: "bg-cream",
    logoText: "text-navy",
    linkText: "text-navy/50",
    linkHover: "hover:text-navy",
    divider: "border-navy/10",
  },
};

function LanguageSwitcher({ theme }: { theme: NavTheme }) {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string | undefined)?.toUpperCase() ?? "EN";

  function handleClick() {
    localStorage.removeItem("carlo-locale");
    router.push("/");
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 transition-colors duration-200 group ${theme.linkText} ${theme.linkHover}`}
      aria-label="Change language"
    >
      <span className={`transition-colors duration-200 ${theme.linkText} ${theme.linkHover}`}>
        <GlobeIcon />
      </span>
      <span className="text-[10px] font-sans tracking-[0.15em] font-medium">{locale}</span>
    </button>
  );
}

function CrossIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2V26M7 9H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [carloVideo, setCarloVideo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { trigger: wipeTo } = useSvgWipe();

  const rawTheme = PAGE_THEMES[pathname as keyof typeof PAGE_THEMES] ?? PAGE_THEMES["/about"];

  function handleCarloClick(e: React.MouseEvent) {
    e.preventDefault();
    setCarloVideo(true);
    setFadeOut(false);
  }

  function handleVideoEnd() {
    setFadeOut(true);
    setTimeout(() => {
      router.push("/carlo");
      // Keep overlay up — dismissed by the pathname effect below
    }, 800);
  }

  // Dismiss overlay once the Carlo page has actually rendered
  useEffect(() => {
    if (carloVideo && pathname === "/carlo") {
      const t = setTimeout(() => {
        setCarloVideo(false);
        setFadeOut(false);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [pathname, carloVideo]);

  // Listen for CarloStoryButton (and any other trigger) firing the event
  useEffect(() => {
    function onCarloClick() {
      setCarloVideo(true);
      setFadeOut(false);
    }
    window.addEventListener("carlo-story-click", onCarloClick);
    return () => window.removeEventListener("carlo-story-click", onCarloClick);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 70);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // On the About page, keep the fixed navbar hidden until AboutHero's image
  // cascade settles — otherwise it overlaps the busy photo animation.
  const [heroReady, setHeroReady] = useState(pathname !== "/about");
  useEffect(() => {
    if (pathname !== "/about") {
      setHeroReady(true);
      return;
    }
    setHeroReady(false);
    function onReady() {
      setHeroReady(true);
    }
    window.addEventListener("about-hero-images-done", onReady);
    const fallback = setTimeout(onReady, 9000);
    return () => {
      window.removeEventListener("about-hero-images-done", onReady);
      clearTimeout(fallback);
    };
  }, [pathname]);

  const solid = scrolled || mobileOpen;

  const theme: NavTheme = solid
    ? {
        ...rawTheme,
        logoText: rawTheme.scrollLogoText ?? rawTheme.logoText,
        linkText: rawTheme.scrollLinkText ?? rawTheme.linkText,
        linkHover: rawTheme.scrollLinkHover ?? rawTheme.linkHover,
        divider: rawTheme.scrollDivider ?? rawTheme.divider,
      }
    : rawTheme;

  return (
    <>
    {/* ── Carlo intro video overlay ── */}
    <AnimatePresence>
      {carloVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black"
        >
          <video
            src="/cameravideo.mp4"
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            onError={() => { setCarloVideo(false); router.push("/carlo"); }}
          />
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: fadeOut ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>

    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? theme.scrollBg : theme.bg
      } ${heroReady ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="w-full px-4 lg:px-14 flex items-center justify-between h-16 lg:h-[88px]">

        {/* ── Logo ── */}
        <button onClick={() => wipeTo("/")} className="flex items-center gap-1.5 lg:gap-3.5 group shrink-0">
          <span className="text-gold transition-transform duration-300 group-hover:scale-110 scale-75 lg:scale-100 origin-left shrink-0">
            <CrossIcon />
          </span>
          <div className="leading-none">
            <p className={`font-serif font-semibold tracking-tighter lg:tracking-wide transition-colors duration-500 text-[11px] lg:text-[13px] whitespace-nowrap ${theme.logoText}`}>
              Friends of St. Carlo Acutis
            </p>
            <p className="text-gold text-[8.5px] lg:text-[9px] font-sans tracking-[0.2em] lg:tracking-[0.28em] uppercase mt-[3px] text-left">
              Foundation
            </p>
          </div>
        </button>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-9">
          <button
            onClick={() => wipeTo("/about")}
            className={`text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
              pathname === "/about" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`
            }`}
          >
            About Us
          </button>

          <button
            onClick={handleCarloClick}
            className={`text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
              pathname === "/carlo" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`
            }`}
          >
            Carlo&apos;s Story
          </button>

          <button
            onClick={() => wipeTo("/eucharistic-miracles")}
            className={`text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
              pathname === "/eucharistic-miracles" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`
            }`}
          >
            Miracles
          </button>

          <button
            onClick={() => wipeTo("/contact")}
            className={`text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
              pathname === "/contact" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => wipeTo("/donate")}
            className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200 ${
              pathname === "/donate" ? `${theme.logoText}` : "text-gold/80 hover:text-gold"
            }`}
          >
            Donate
          </button>

          <LanguageSwitcher theme={theme} />
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 -mr-2 transition-colors duration-500 ${theme.logoText}`}
          aria-label="Toggle navigation menu"
        >
          <div className="relative w-5 h-[14px]">
            <span className={`absolute inset-x-0 h-[2px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? "top-[6px] rotate-45" : "top-0"}`} />
            <span className={`absolute inset-x-0 h-[2px] bg-current rounded-full top-[6px] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`absolute inset-x-0 h-[2px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? "top-[6px] -rotate-45" : "top-[12px]"}`} />
          </div>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`lg:hidden border-t overflow-hidden transition-all duration-300 ${theme.mobileBg} ${theme.divider} ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-8 py-6 flex flex-col gap-1">
          <button
            onClick={() => { setMobileOpen(false); wipeTo("/about"); }}
            className={`py-3.5 text-[11px] font-sans font-medium tracking-[0.2em] uppercase border-b text-left transition-colors duration-200 ${theme.divider} ${pathname === "/about" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`}`}
          >
            About Us
          </button>
          <button
            onClick={() => { setMobileOpen(false); handleCarloClick({ preventDefault: () => {} } as React.MouseEvent); }}
            className={`py-3.5 text-[11px] font-sans font-medium tracking-[0.2em] uppercase border-b text-left transition-colors duration-200 ${theme.divider} ${pathname === "/carlo" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`}`}
          >
            Carlo&apos;s Story
          </button>
          <button
            onClick={() => { setMobileOpen(false); wipeTo("/eucharistic-miracles"); }}
            className={`py-3.5 text-[11px] font-sans font-medium tracking-[0.2em] uppercase border-b text-left transition-colors duration-200 ${theme.divider} ${pathname === "/eucharistic-miracles" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`}`}
          >
            Miracles
          </button>
          <button
            onClick={() => { setMobileOpen(false); wipeTo("/contact"); }}
            className={`py-3.5 text-[11px] font-sans font-medium tracking-[0.2em] uppercase border-b text-left transition-colors duration-200 ${theme.divider} ${pathname === "/contact" ? "text-gold" : `${theme.linkText} ${theme.linkHover}`}`}
          >
            Contact
          </button>
          <button
            onClick={() => { setMobileOpen(false); wipeTo("/donate"); }}
            className="py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold text-left"
          >
            Donate
          </button>
          <div className={`mt-4 pt-4 border-t ${theme.divider}`}>
            <LanguageSwitcher theme={theme} />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
