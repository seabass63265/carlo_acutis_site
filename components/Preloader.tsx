"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WORDS = ["Hello", "Hola", "Ciao", "Bonjour", "Olá"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const wordWrapRef = useRef<HTMLDivElement>(null);
  const wordTextRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const wordWrap = wordWrapRef.current;
    const wordText = wordTextRef.current;
    const path = pathRef.current;
    if (!preloader || !wordWrap || !wordText || !path) return;

    const dimension = { width: window.innerWidth, height: window.innerHeight };

    const getPaths = () => {
      const { width, height } = dimension;
      const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
      const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
      return { initialPath, targetPath };
    };

    const setInitialPath = () => path.setAttribute("d", getPaths().initialPath);
    setInitialPath();

    const onResize = () => {
      dimension.width = window.innerWidth;
      dimension.height = window.innerHeight;
      setInitialPath();
    };
    window.addEventListener("resize", onResize);

    let index = 0;
    wordText.textContent = WORDS[index];

    gsap.to(wordWrap, { opacity: 0.85, duration: 1, delay: 0.2 });

    const textEl = wordText;
    const INITIAL_WORD_HOLD = 1.2;
    const WORD_HOLD = 0.7;
    const FINAL_WORD_HOLD = 1.2;

    function cycleWords() {
      if (index === WORDS.length - 1) return;
      const delay = index === 0 ? INITIAL_WORD_HOLD : WORD_HOLD;
      gsap.delayedCall(delay, () => {
        index += 1;
        textEl.textContent = WORDS[index];
        cycleWords();
      });
    }
    cycleWords();

    const totalDelay = INITIAL_WORD_HOLD + (WORDS.length - 2) * WORD_HOLD + FINAL_WORD_HOLD;

    const finishCall = gsap.delayedCall(totalDelay, () => {
      const { initialPath, targetPath } = getPaths();

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setHidden(true);
          onComplete();
        },
      });

      tl.to(wordWrap, { opacity: 0, duration: 0.3 }, 0);
      tl.to(preloader, { y: "-100vh", duration: 0.8, delay: 0.2, ease: "power4.inOut" }, 0);
      tl.fromTo(
        path,
        { attr: { d: initialPath } },
        { attr: { d: targetPath }, duration: 0.7, delay: 0.3, ease: "power4.inOut" },
        0,
      );
    });

    return () => {
      window.removeEventListener("resize", onResize);
      finishCall.kill();
      gsap.killTweensOf([wordWrap, preloader, path]);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "#0A1428" }}
    >
      <div
        ref={wordWrapRef}
        className="absolute z-10 flex items-center gap-2.5 opacity-0"
        style={{ color: "#F9F6F0" }}
      >
        <span
          className="block rounded-full flex-shrink-0"
          style={{ width: 10, height: 10, background: "#C9A96E" }}
        />
        <span ref={wordTextRef} className="font-serif" style={{ fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1 }} />
      </div>

      <svg
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: "calc(100% + 300px)" }}
        preserveAspectRatio="none"
      >
        <path ref={pathRef} fill="#0A1428" />
      </svg>
    </div>
  );
}
