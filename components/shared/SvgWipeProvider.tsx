"use client";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { gsap } from "gsap";

interface Ctx {
  trigger: (href: string) => void;
}

const SvgWipeCtx = createContext<Ctx>({ trigger: () => {} });
export const useSvgWipe = () => useContext(SvgWipeCtx);

const STROKE_1 = "#0F1E3C"; // navy
const STROKE_2 = "#C9A96E"; // gold

function leave(paths: SVGPathElement[]): Promise<void> {
  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });
    paths.forEach((path) => {
      tl.to(path, { strokeDashoffset: 0, attr: { "stroke-width": 700 }, duration: 1, ease: "power1.inOut" }, 0);
    });
  });
}

function enter(paths: SVGPathElement[]): Promise<void> {
  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });
    paths.forEach((path) => {
      const length = path.getTotalLength();
      tl.to(
        path,
        { strokeDashoffset: -length, attr: { "stroke-width": 200 }, duration: 1, ease: "power1.inOut" },
        0,
      );
    });
  });
}

export function SvgWipeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    [path1Ref.current, path2Ref.current].forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });
  }, []);

  const trigger = useCallback(
    async (href: string) => {
      if (isTransitioning.current) return;
      const paths = [path1Ref.current, path2Ref.current].filter((p): p is SVGPathElement => p !== null);
      if (paths.length === 0) {
        router.push(href as "/");
        return;
      }

      isTransitioning.current = true;
      await leave(paths);
      router.push(href as "/");
      await enter(paths);
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDashoffset: length });
      });
      isTransitioning.current = false;
    },
    [router],
  );

  return (
    <SvgWipeCtx.Provider value={{ trigger }}>
      {children}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.5)",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 300,
        }}
      >
        <svg viewBox="0 0 2453 2535" fill="none" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path
            ref={path1Ref}
            d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
            stroke={STROKE_1}
            strokeWidth={200}
            strokeLinecap="round"
            style={{ strokeDasharray: 99999, strokeDashoffset: 99999 }}
          />
          <path
            ref={path2Ref}
            d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
            stroke={STROKE_2}
            strokeWidth={200}
            strokeLinecap="round"
            style={{ strokeDasharray: 99999, strokeDashoffset: 99999 }}
          />
        </svg>
      </div>
    </SvgWipeCtx.Provider>
  );
}
