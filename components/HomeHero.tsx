"use client";

import { FiFacebook, FiMail, FiLinkedin } from "react-icons/fi";
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
        { icon: FiFacebook, href: "https://www.facebook.com/friendsofstcarlo" },
        { icon: FiMail, href: "/contact" },
        { icon: FiLinkedin, href: "https://www.linkedin.com/company/friendsofstcarlo/" },
      ]}
      locationText="Los Angeles, California"
    />
  );
}
