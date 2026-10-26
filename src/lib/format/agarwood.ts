import type { AgarwoodProfile } from "@/types/product";

/** "chìm" → "Trầm chìm" */
export const gradeLabel = (grade: NonNullable<AgarwoodProfile["grade"]>) =>
  `Trầm ${grade}`;

/** Card chips: loại trầm · vùng · tuổi trầm, only those with data. */
export function profileChips(profile: AgarwoodProfile): string[] {
  return [
    profile.grade && gradeLabel(profile.grade),
    profile.origin,
    // "15–20 năm" → "Tích 15–20 năm"; "Trên 25 năm" → "Tích trên 25 năm"
    profile.resinAgeYears &&
      `Tích ${profile.resinAgeYears.charAt(0).toLowerCase()}${profile.resinAgeYears.slice(1)}`,
  ].filter((chip): chip is string => Boolean(chip));
}

/** "Hồ sơ trầm" table rows; null fields are left out entirely. */
export function profileRows(profile: AgarwoodProfile) {
  const rows: Array<{ label: string; value: string | null | undefined }> = [
    { label: "Loại trầm", value: profile.grade && gradeLabel(profile.grade) },
    { label: "Vùng trầm", value: profile.origin },
    { label: "Tuổi tích trầm", value: profile.resinAgeYears },
    { label: "Nguồn trầm", value: profile.source && `Trầm ${profile.source}` },
    { label: "Độ dầu", value: profile.oilContent },
    {
      label: "Tầng hương",
      value: profile.scentProfile?.length ? profile.scentProfile.join(", ") : null,
    },
    {
      label: "Thả nước",
      value:
        profile.sinksInWater === null ? null : profile.sinksInWater ? "Chìm" : "Nổi",
    },
    { label: "Kích thước hạt", value: profile.beadSizeMm ? `${profile.beadSizeMm} mm` : null },
    { label: "Giấy tờ", value: profile.certificate },
  ];
  return rows.filter((row): row is { label: string; value: string } => Boolean(row.value));
}
