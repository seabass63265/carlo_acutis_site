import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "it", "fr", "pt", "de"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
