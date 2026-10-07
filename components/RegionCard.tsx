"use client";

import "flag-icons/css/flag-icons.min.css";

const FLAG_CODES: Record<string, string> = {
  // Europe
  Italy: "it", Spain: "es", Germany: "de", France: "fr",
  Belgium: "be", Netherlands: "nl", Poland: "pl", Austria: "at",
  Portugal: "pt", Switzerland: "ch", Hungary: "hu", Croatia: "hr",
  Lithuania: "lt", Romania: "ro", Ireland: "ie", Malta: "mt",
  Slovakia: "sk", Serbia: "rs", Bulgaria: "bg", Slovenia: "si",
  Scotland: "gb-sct", Luxembourg: "lu", Ukraine: "ua", Latvia: "lv",
  Sweden: "se", Denmark: "dk", Cyprus: "cy",
  "Czech Republic": "cz",
  // Americas
  Argentina: "ar", Peru: "pe", Mexico: "mx", Venezuela: "ve",
  Chile: "cl", Canada: "ca", "United States": "us", Colombia: "co",
  Ecuador: "ec", Brazil: "br", Paraguay: "py", Bolivia: "bo",
  Uruguay: "uy", Martinique: "mq", Réunion: "re",
  // Asia
  Philippines: "ph", India: "in", Japan: "jp", Indonesia: "id",
  "South Korea": "kr", Vietnam: "vn", Georgia: "ge",
  // Middle East
  Egypt: "eg", Israel: "il", Lebanon: "lb",
  // Africa
  Nigeria: "ng", Uganda: "ug", "South Africa": "za", Kenya: "ke", Ethiopia: "et",
  // Oceania
  Australia: "au", "New Zealand": "nz",
};

interface RegionCardProps {
  /** English country name, used for the flag lookup and grid filter */
  country: string;
  /** Translated country name shown on the card */
  label: string;
  count: number;
}

export default function RegionCard({ country, label, count }: RegionCardProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("miracles-filter", { detail: { country } }));
    document.getElementById("miracles-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const flagCode = FLAG_CODES[country];

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm border border-navy/10 bg-white hover:border-navy/25 hover:bg-navy/[0.02] transition-all duration-200 text-left"
    >
      <span className="shrink-0 w-6 flex justify-center">
        {flagCode ? (
          <span className={`fi fi-${flagCode} rounded-[2px] shadow-sm`} role="img" aria-label={label} />
        ) : (
          <span className="text-lg leading-none" aria-hidden="true">🌐</span>
        )}
      </span>
      <p className="text-navy/70 text-xs font-medium leading-tight flex-1">{label}</p>
      <p className="font-serif font-bold text-sm text-navy/35 leading-none shrink-0">{count}</p>
    </button>
  );
}
