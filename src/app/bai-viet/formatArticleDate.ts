/** "2026-10-08" → "8 tháng 10, 2026" */
export function formatArticleDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return `${day} tháng ${month}, ${year}`;
}
