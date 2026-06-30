"use client";

import { ReactNode } from "react";

export default function CarloStoryButton({ className, children }: { className?: string; children?: ReactNode }) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("carlo-story-click"));
  }

  return (
    <button
      onClick={handleClick}
      className={
        className ??
        "px-7 py-3.5 rounded-full bg-gold text-navy-dark text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:bg-gold-light"
      }
    >
      {children ?? "Carlo’s Story"}
    </button>
  );
}
