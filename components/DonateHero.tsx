"use client";

import { useTranslations } from "next-intl";
import { Globe, Heart, Share2, Send } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function DonateHero() {
  const t = useTranslations("donate.hero");

  return (
    <MinimalistHero
      logoText="FoC."
      navLinks={[]}
      mainText={t("mainText")}
      readMoreLink="#donate-now"
      imageSrc="/carlopeaking.png"
      imageAlt={t("imageAlt")}
      circleSrc="/backcircle.png"
      circleSize="h-[150vh] w-auto md:h-[1100px] md:w-[1100px] lg:h-[1300px] lg:w-[1300px]"
      circleTop="5%"
      imageTop="25%"
      headlineSplit
      centerLabel={t("centerLabel")}
      footerText={t("footerText")}
      overlayText={{ part1: t("overlayPart1"), part2: t("overlayPart2") }}
      socialLinks={[
        { icon: Globe, href: "#" },
        { icon: Heart, href: "#" },
        { icon: Share2, href: "#" },
        { icon: Send, href: "/contact" },
      ]}
      locationText={t("locationText")}
    />
  );
}
