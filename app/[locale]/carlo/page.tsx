import type { Metadata } from "next";
import CarloStoryPage from "@/components/CarloStoryPage";

export const metadata: Metadata = {
  title: "Carlo's Story",
  description:
    "Discover the life of St. Carlo Acutis — the first millennial saint who used technology to bring millions closer to God.",
};

export default function CarloPage() {
  return <CarloStoryPage />;
}
