"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ChangeLanguageButton() {
  const t = useTranslations("footer");
  const router = useRouter();

  function handleClick() {
    localStorage.removeItem("carlo-locale");
    router.push("/");
  }

  return (
    <button
      onClick={handleClick}
      className="text-gold/50 hover:text-gold text-xs tracking-wide transition-colors duration-200 border border-gold/20 hover:border-gold/40 px-3 py-1 rounded-full"
    >
      {t("changeLanguage")}
    </button>
  );
}
