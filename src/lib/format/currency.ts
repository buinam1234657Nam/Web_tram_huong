/**
 * Formats a number into Vietnamese Dong currency string
 * Example: 1850000 -> "1.850.000 ₫"
 */
export function formatVND(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return "0 ₫";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates discount percentage cleanly
 */
export function calculateDiscountPercentage(price: number, compareAtPrice?: number): number | null {
  if (!compareAtPrice || compareAtPrice <= price) return null;
  const discount = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  return discount > 0 ? discount : null;
}
