"use client";

const FLAGS: Record<string, string> = {
  // Europe
  Italy: "🇮🇹", Spain: "🇪🇸", Germany: "🇩🇪", France: "🇫🇷",
  Belgium: "🇧🇪", Netherlands: "🇳🇱", Poland: "🇵🇱", Austria: "🇦🇹",
  Portugal: "🇵🇹", Switzerland: "🇨🇭", Hungary: "🇭🇺", Croatia: "🇭🇷",
  Lithuania: "🇱🇹", Romania: "🇷🇴", Ireland: "🇮🇪", Malta: "🇲🇹",
  Slovakia: "🇸🇰", Serbia: "🇷🇸", Bulgaria: "🇧🇬", Slovenia: "🇸🇮",
  Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", Luxembourg: "🇱🇺", Ukraine: "🇺🇦", Latvia: "🇱🇻",
  Sweden: "🇸🇪", Denmark: "🇩🇰", Cyprus: "🇨🇾",
  "Czech Republic": "🇨🇿",
  // Americas
  Argentina: "🇦🇷", Peru: "🇵🇪", Mexico: "🇲🇽", Venezuela: "🇻🇪",
  Chile: "🇨🇱", Canada: "🇨🇦", "United States": "🇺🇸", Colombia: "🇨🇴",
  Ecuador: "🇪🇨", Brazil: "🇧🇷", Paraguay: "🇵🇾", Bolivia: "🇧🇴",
  Uruguay: "🇺🇾", Martinique: "🇲🇶", Réunion: "🇷🇪",
  // Asia
  Philippines: "🇵🇭", India: "🇮🇳", Japan: "🇯🇵", Indonesia: "🇮🇩",
  "South Korea": "🇰🇷", Vietnam: "🇻🇳", Georgia: "🇬🇪",
  // Middle East
  Egypt: "🇪🇬", Israel: "🇮🇱", Lebanon: "🇱🇧",
  // Africa
  Nigeria: "🇳🇬", Uganda: "🇺🇬", "South Africa": "🇿🇦", Kenya: "🇰🇪", Ethiopia: "🇪🇹",
  // Oceania
  Australia: "🇦🇺", "New Zealand": "🇳🇿",
};

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
      <span className="text-lg leading-none shrink-0">{FLAGS[name] ?? "🌐"}</span>
      <p className="text-navy/70 text-xs font-medium leading-tight flex-1">{name}</p>
      <p className="font-serif font-bold text-sm text-navy/35 leading-none shrink-0">{count}</p>
    </button>
  );
}
