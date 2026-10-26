/**
 * Two locales. Vietnamese is the default and keeps the existing, unprefixed
 * URLs (so nothing already indexed moves); English lives under /en.
 * The proxy (src/proxy.ts) maps "/x" to the internal "/vi/x" route.
 */
export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

/** Shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, { short: string; name: string }> = {
  vi: { short: "VI", name: "Tiếng Việt" },
  en: { short: "EN", name: "English" },
};

/** BCP 47 tags for <html lang>, hreflang and Intl formatting. */
export const LOCALE_TAGS: Record<Locale, string> = { vi: "vi-VN", en: "en" };

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.includes(value as Locale);
}

const PREFIX = /^\/(vi|en)(?=\/|$|\?|#)/;

/** "/en/san-pham" → { locale: "en", path: "/san-pham" }; unprefixed paths are Vietnamese. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = PREFIX.exec(pathname);
  if (!match) return { locale: DEFAULT_LOCALE, path: pathname || "/" };
  const rest = pathname.slice(match[0].length);
  return { locale: match[1] as Locale, path: rest.startsWith("/") ? rest : `/${rest}` };
}

/** Public URL of an internal path for a locale: ("/san-pham", "en") → "/en/san-pham". */
export function localizePath(path: string, locale: Locale): string {
  // Leave external links, protocol links (tel:, mailto:), anchors and API calls alone.
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/api/")) {
    return path;
  }
  const { path: bare } = splitLocale(path);
  if (locale === DEFAULT_LOCALE) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}

/** hreflang alternates + canonical for a page's metadata. */
export function localeAlternates(path: string, locale: Locale) {
  return {
    canonical: localizePath(path, locale),
    languages: {
      [LOCALE_TAGS.vi]: localizePath(path, "vi"),
      [LOCALE_TAGS.en]: localizePath(path, "en"),
      "x-default": localizePath(path, DEFAULT_LOCALE),
    },
  };
}

/**
 * A namespace of UI strings. The English half must have exactly the
 * Vietnamese half's shape, so a missing translation is a type error.
 */
export function defineMessages<T>(messages: { vi: T; en: NoInfer<T> }) {
  return messages;
}
