import type { Metadata } from "next";
import ContactHero from "@/components/ContactHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Friends of St. Carlo Acutis Foundation — for general inquiries, prayer requests, speaking opportunities, and more.",
};

export default function ContactPage() {
  return <ContactHero />;
}
