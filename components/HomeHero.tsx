"use client";

import { useTranslations } from "next-intl";
import { FiFacebook, FiMail, FiLinkedin } from "react-icons/fi";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export default function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <MinimalistHero
      logoText="FoC."
      navLinks={[
        { label: t("navHome"), href: "/" },
        { label: t("navCarlo"), href: "/carlo" },
        { label: t("navMiracles"), href: "/eucharistic-miracles" },
        { label: t("navAbout"), href: "/about" },
      ]}
      mainText={t("mainText")}
      readMoreLink="/carlo"
      onReadMoreClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("carlo-story-click"));
      }}
      imageSrc="/carloheropic0.png"
      imageAlt={t("imageAlt")}
      overlayText={{ part1: t("overlayPart1"), part2: t.raw("overlayWords") as string[] }}
      socialLinks={[
        { icon: FiFacebook, href: "https://www.facebook.com/friendsofstcarlo" },
        { icon: FiMail, href: "/contact" },
        { icon: FiLinkedin, href: "https://www.linkedin.com/company/friendsofstcarlo/" },
      ]}
      locationText={t("locationText")}
    />
  );
}
