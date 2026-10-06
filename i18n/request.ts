import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    if (value && typeof value === "object" && !Array.isArray(value) && current && typeof current === "object") {
      out[key] = deepMerge(current as Messages, value as Messages);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  const english = (await import("../messages/en.json")).default as Messages;
  const localized = (await import(`../messages/${locale}.json`)).default as Messages;
  // Fall back to English for any string a locale hasn't been translated into yet.
  return {
    locale,
    messages: locale === "en" ? english : deepMerge(english, localized),
  };
});
