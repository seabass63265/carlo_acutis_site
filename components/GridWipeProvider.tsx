"use client";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";

const COLS = 12;
const ROWS = 7;
const CELL_DURATION = 0.14;
const MAX_STAGGER = 0.4;

function buildWaveDelays(cols: number, rows: number): number[] {
  const raw: number[] = [];
  let min = Infinity, max = -Infinity;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v = Math.hypot(x - (cols - 1) / 2, y - (rows - 1) / 2);
      raw.push(v);
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  const range = max - min || 1;
  return raw.map((v) => ((v - min) / range) * MAX_STAGGER);
}

const DELAYS = buildWaveDelays(COLS, ROWS);
const WIPE_MS = (MAX_STAGGER + CELL_DURATION) * 1000;

interface Ctx {
  trigger: (href: string) => void;
}

const GridWipeCtx = createContext<Ctx>({ trigger: () => {} });
export const useGridWipe = () => useContext(GridWipeCtx);

type Phase = "idle" | "in" | "out";

export function GridWipeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const trigger = useCallback(
    (href: string) => {
      timers.current.forEach(clearTimeout);
      setPhase("in");

      timers.current[0] = setTimeout(() => {
        router.push(href as "/");
        setPhase("out");
      }, WIPE_MS + 60);

      timers.current[1] = setTimeout(() => {
        setPhase("idle");
      }, (WIPE_MS + 60) * 2);
    },
    [router],
  );

  return (
    <GridWipeCtx.Provider value={{ trigger }}>
      {children}
      {phase !== "idle" && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            pointerEvents: "none",
          }}
        >
          {DELAYS.map((delay, i) => (
            <motion.div
              key={`${phase}-${i}`}
              style={{ background: "#0d0d0d" }}
              initial={{ opacity: phase === "in" ? 0 : 1 }}
              animate={{ opacity: phase === "in" ? 1 : 0 }}
              transition={{ duration: CELL_DURATION, delay, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </GridWipeCtx.Provider>
  );
}
