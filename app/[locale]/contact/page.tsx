import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactHero from "@/components/contact/ContactHero";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function ContactPage() {
  return <ContactHero />;
}
