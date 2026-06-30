"use client";
import { useState } from "react";
import AnimateIn from "./AnimateIn";

const timelineEvents = [
  {
    year: "1991",
    title: "Born in London",
    detail:
      "Carlo Maria Acutis is born on May 3, 1991 in London, England. His family soon moves to Milan, where he grows up.",
  },
  {
    year: "1998",
    title: "First Communion",
    detail:
      "Carlo receives his First Holy Communion at age 7, earlier than the norm for his parish. He begins attending daily Mass — a practice he maintains for the rest of his life.",
  },
  {
    year: "2000",
    title: "Begins Learning to Code",
    detail:
      "At age 9, Carlo teaches himself programming, creating video games and websites. He sees technology not as entertainment alone but as a powerful tool for spreading the faith.",
  },
  {
    year: "2002",
    title: "Starts Cataloguing Miracles",
    detail:
      "Carlo begins his landmark project: a website and travelling exhibition cataloguing Eucharistic miracles worldwide. He travels across Italy to research each case personally.",
  },
  {
    year: "2006",
    title: "Diagnosed & Death",
    detail:
      "In October 2006, Carlo is diagnosed with fulminant leukemia. He offers his suffering 'for the Pope and the Church' and dies on October 12, 2006 at the age of 15, with the peace of a saint.",
  },
  {
    year: "2020",
    title: "Beatification in Assisi",
    detail:
      "Blessed Carlo Acutis is beatified in a ceremony at the Basilica of St. Francis in Assisi — his own requested burial site. Thousands attend; millions watch globally.",
  },
  {
    year: "2025",
    title: "Canonization",
    detail:
      "Pope Francis canonizes Carlo in Rome, making him the world's first millennial saint and the patron of the internet generation.",
  },
];

export default function CarloTimeline() {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Year tabs */}
      <div className="flex overflow-x-auto gap-0 border-b border-cream-dark mb-12 pb-0 scrollbar-hide">
        {timelineEvents.map(({ year }, i) => (
          <button
            key={year}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-[2px] ${
              active === i
                ? "border-gold text-navy"
                : "border-transparent text-navy/40 hover:text-navy/70"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Active event */}
      <AnimateIn key={active} direction="none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-gold font-serif text-6xl font-semibold mb-4 leading-none">
              {timelineEvents[active].year}
            </span>
            <h3 className="font-serif text-3xl font-semibold text-navy mb-6 leading-tight">
              {timelineEvents[active].title}
            </h3>
            <p className="text-navy/65 text-lg leading-relaxed">
              {timelineEvents[active].detail}
            </p>
          </div>
          {/* Visual placeholder */}
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-sm aspect-[4/3] flex items-center justify-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(201,169,110,0.3) 8px, rgba(201,169,110,0.3) 9px)",
              }}
            />
            <div className="text-center relative z-10 px-8">
              <p className="text-gold/60 font-serif text-5xl font-bold mb-2">{timelineEvents[active].year}</p>
              <p className="text-white/50 font-serif italic text-lg">{timelineEvents[active].title}</p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-cream-dark">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          className="text-sm font-semibold text-navy/40 hover:text-navy disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        <div className="flex gap-2">
          {timelineEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === active ? "bg-gold w-6" : "bg-navy/20 hover:bg-navy/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((p) => Math.min(timelineEvents.length - 1, p + 1))}
          disabled={active === timelineEvents.length - 1}
          className="text-sm font-semibold text-navy/40 hover:text-navy disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
