import type { AgarwoodProfile } from "@/types/product";
import type { Locale } from "@/i18n/config";

type Grade = NonNullable<AgarwoodProfile["grade"]>;

const GRADE_EN: Record<Grade, string> = {
  chìm: "Sinking agarwood",
  "bán chìm": "Semi-sinking agarwood",
  nổi: "Floating agarwood",
  tốc: "Tốc agarwood",
};

const SOURCE_EN: Record<NonNullable<AgarwoodProfile["source"]>, string> = {
  "tự nhiên": "Natural",
  "trồng cấy": "Cultivated",
};

/** Origin values that occur in the catalog data; anything else is shown as-is. */
const ORIGIN_EN: Record<string, string> = {
  "Việt Nam": "Vietnam",
  "Khánh Hòa, Việt Nam": "Khanh Hoa, Vietnam",
  Indonesia: "Indonesia",
  Philippines: "Philippines",
};

const LABELS = {
  vi: {
    grade: "Loại trầm",
    origin: "Vùng trầm",
    resinAge: "Tuổi tích trầm",
    source: "Nguồn trầm",
    oil: "Độ dầu",
    scent: "Tầng hương",
    water: "Thả nước",
    sinks: "Chìm",
    floats: "Nổi",
    bead: "Kích thước hạt",
    certificate: "Giấy tờ",
  },
  en: {
    grade: "Grade",
    origin: "Region",
    resinAge: "Resin age",
    source: "Source",
    oil: "Oil content",
    scent: "Scent notes",
    water: "In water",
    sinks: "Sinks",
    floats: "Floats",
    bead: "Bead size",
    certificate: "Certificate",
  },
} satisfies Record<Locale, Record<string, string>>;

/** "chìm" → "Trầm chìm" / "Sinking agarwood" */
export const gradeLabel = (grade: Grade, locale: Locale = "vi") =>
  locale === "en" ? GRADE_EN[grade] : `Trầm ${grade}`;

/** "Khánh Hòa, Việt Nam" → "Khanh Hoa, Vietnam" in English; unknown values pass through. */
export const originLabel = (origin: string, locale: Locale = "vi") =>
  locale === "en" ? (ORIGIN_EN[origin] ?? origin) : origin;

/** "15–20 năm" → "15–20 years"; "Trên 25 năm" → "Over 25 years". */
function resinAgeEn(age: string) {
  return age
    .replace(/^Trên\s*/i, "Over ")
    .replace(/^Từ\s*/i, "")
    .replace(/\s*năm$/i, " years")
    .trim();
}

/** Card chips: loại trầm · vùng · tuổi trầm, only those with data. */
export function profileChips(profile: AgarwoodProfile, locale: Locale = "vi"): string[] {
  const age = profile.resinAgeYears;
  return [
    profile.grade && gradeLabel(profile.grade, locale),
    profile.origin && originLabel(profile.origin, locale),
    // "15–20 năm" → "Tích 15–20 năm"; "Trên 25 năm" → "Tích trên 25 năm"
    age &&
      (locale === "en"
        ? `${resinAgeEn(age)} of resin`
        : `Tích ${age.charAt(0).toLowerCase()}${age.slice(1)}`),
  ].filter((chip): chip is string => Boolean(chip));
}

/** "Hồ sơ trầm" table rows; null fields are left out entirely. */
export function profileRows(profile: AgarwoodProfile, locale: Locale = "vi") {
  const l = LABELS[locale];
  const en = locale === "en";
  const rows: Array<{ label: string; value: string | null | undefined }> = [
    { label: l.grade, value: profile.grade && gradeLabel(profile.grade, locale) },
    { label: l.origin, value: profile.origin && originLabel(profile.origin, locale) },
    {
      label: l.resinAge,
      value: profile.resinAgeYears && (en ? resinAgeEn(profile.resinAgeYears) : profile.resinAgeYears),
    },
    {
      label: l.source,
      value: profile.source && (en ? SOURCE_EN[profile.source] : `Trầm ${profile.source}`),
    },
    // Free-text fields are the owner's own words and stay as written.
    { label: l.oil, value: profile.oilContent },
    {
      label: l.scent,
      value: profile.scentProfile?.length ? profile.scentProfile.join(", ") : null,
    },
    {
      label: l.water,
      value: profile.sinksInWater === null ? null : profile.sinksInWater ? l.sinks : l.floats,
    },
    { label: l.bead, value: profile.beadSizeMm ? `${profile.beadSizeMm} mm` : null },
    { label: l.certificate, value: profile.certificate },
  ];
  return rows.filter((row): row is { label: string; value: string } => Boolean(row.value));
}
