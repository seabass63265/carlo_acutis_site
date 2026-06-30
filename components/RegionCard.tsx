"use client";

interface RegionCardProps {
  name: string;
  count: number;
}

export default function RegionCard({ name, count }: RegionCardProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("miracles-filter", { detail: { country: name } }));
    document.getElementById("miracles-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm border border-navy/10 bg-white hover:border-navy/25 hover:bg-navy/[0.02] transition-all duration-200 text-left"
    >
      <p className="font-serif font-bold text-base text-navy/50 leading-none shrink-0">
        {count}
      </p>
      <p className="text-navy/70 text-xs font-medium leading-tight">
        {name}
      </p>
    </button>
  );
}
