import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CarloStoryPage from "@/components/CarloStoryPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("carlo");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function CarloPage() {
  return <CarloStoryPage />;
}
