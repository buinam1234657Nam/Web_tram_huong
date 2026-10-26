import { LOCALE_TAGS, type Locale } from "@/i18n/config";

/** "2026-10-08" → "8 tháng 10, 2026" (vi) or "October 8, 2026" (en). */
export function formatArticleDate(isoDate: string, locale: Locale = "vi") {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  if (locale === "vi") return `${day} tháng ${month}, ${year}`;
  // Noon UTC so the calendar day never shifts with the server's timezone.
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}
