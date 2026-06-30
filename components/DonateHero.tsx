"use client";

import { Globe, Heart, Share2, Send } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function DonateHero() {
  return (
    <MinimalistHero
      logoText="FoSCA."
      navLinks={[]}
      mainText="Every gift helps carry forward the mission of St. Carlo Acutis. Your generosity allows us to inspire young people, strengthen Eucharistic devotion, support pilgrimages and educational initiatives, and create digital resources that bring others closer to Christ."
      readMoreLink="#donate-now"
      imageSrc="/carlopeaking.png"
      imageAlt="St. Carlo Acutis — Friends of St. Carlo Acutis Foundation"
      circleSrc="/backcircle.png"
      circleSize="h-[150vh] w-auto md:h-[1100px] md:w-[1100px] lg:h-[1300px] lg:w-[1300px]"
      circleTop="5%"
      imageTop="25%"
      headlineSplit
      centerLabel="Donate"
      footerText="Scroll down for more info"
      overlayText={{ part1: "Your Gift", part2: "Changes Lives" }}
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
