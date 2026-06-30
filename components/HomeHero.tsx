"use client";

import { Globe, Heart, Share2, Send } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function HomeHero() {
  return (
    <MinimalistHero
      logoText="FoSCA."
      navLinks={[
        { label: "HOME", href: "/" },
        { label: "CARLO", href: "/carlo" },
        { label: "MIRACLES", href: "/eucharistic-miracles" },
        { label: "ABOUT US", href: "/about" },
      ]}
      mainText="Inspired by St. Carlo Acutis — the first millennial saint — we exist to bring the Gospel to a new generation through faith, technology, and encounter."
      readMoreLink="/carlo"
      imageSrc="/carloheropic0.png"
      imageAlt="St. Carlo Acutis"
      overlayText={{ part1: "Born", part2: ["Original.", "Holy.", "Beloved.", "Chosen.", "Called.", "Eternal."] }}
      socialLinks={[
        { icon: Globe, href: "#" },
        { icon: Heart, href: "#" },
        { icon: Share2, href: "#" },
        { icon: Send, href: "/contact" },
      ]}
      locationText="Friends of St. Carlo Acutis Foundation"
    />
  );
}
