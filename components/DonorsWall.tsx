"use client";

import ContributorsWall, { type Contributor } from "@/components/ui/contributors-section";

const names = [
  "Maria Santos", "James O'Brien", "Lucia Ferretti", "Michael Chen", "Ana Kovač",
  "Patrick Flynn", "Rosa Delgado", "Thomas Weber", "Chiara Ricci", "Sean Murphy",
  "Elena Vasquez", "David Kim", "Beatriz Alves", "Marco Bianchi", "Claire Dubois",
  "Joseph Müller", "Isabel Reyes", "Giovanni Esposito", "Fatima Al-Hassan", "Luke Brennan",
  "Sofia Lombardi", "Andrew Park", "Magdalena Torres", "Dominic Hartmann", "Cecilia Nwosu",
  "Francis Xavier", "Theresa Wójcik", "Carlos Medina", "Anne-Marie Leclerc", "Peter Okafor",
  "Valentina Cruz", "Roberto Silva", "Brigid McCarthy", "Emmanuel Adjei", "Natalia Kowalski",
  "Benedict Walsh", "Pilar Gómez", "Raphael Morin", "Stella Nakamura", "Timothy Osei",
];

const donors: Contributor[] = Array.from({ length: 200 }, (_, i) => {
  const name = names[i % names.length];
  const suffix = i >= names.length ? `_${Math.floor(i / names.length)}` : "";
  const slug = name.toLowerCase().replace(/[^a-z]/g, "") + suffix;
  return {
    username: name + (suffix ? ` (${suffix.slice(1)})` : ""),
    avatarUrl: `https://i.pravatar.cc/120?u=${encodeURIComponent(slug + i)}`,
  };
});

export default function DonorsWall() {
  return (
    <section
      className="py-24 bg-navy-dark text-white"
      style={{ "--wall-bg": "#060b18" } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <p className="text-gold text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
          Our Community
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4">
          Thank You, Donors
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Every gift — large or small — helps carry Carlo&apos;s mission forward. We are grateful for each one.
        </p>
      </div>

      <ContributorsWall
        title="Donors"
        subtitle={
          <>
            Supported by a community of{" "}
            <span className="font-semibold" style={{ color: "#D9A441" }}>
              ___+
            </span>{" "}
            generous donors worldwide.
          </>
        }
        contributors={donors}
        totalCount={871}
        columns={16}
        height={300}
        speed={20}
        className="text-white"
      />
    </section>
  );
}
