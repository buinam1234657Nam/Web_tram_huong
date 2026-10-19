import { describe, it, expect } from "vitest";
import { formatVND, calculateDiscountPercentage } from "@/lib/format/currency";

describe("Currency & Pricing Utilities", () => {
  it("formats positive VND integers with currency symbol correctly", () => {
    const formatted = formatVND(1850000);
    // Standard Vietnamese locale formatting outputs non-breaking space and ₫
    expect(formatted).toContain("1.850.000");
    expect(formatted).toContain("₫");
  });

  it("formats 0 correctly", () => {
    const formatted = formatVND(0);
    expect(formatted).toContain("0");
    expect(formatted).toContain("₫");
  });

  it("handles NaN or null gracefully", () => {
    // @ts-expect-error testing invalid type
    expect(formatVND(null)).toBe("0 ₫");
    expect(formatVND(NaN)).toBe("0 ₫");
  });

  it("calculates discount percentage correctly", () => {
    expect(calculateDiscountPercentage(3200000, 3800000)).toBe(16);
    expect(calculateDiscountPercentage(450000, 520000)).toBe(13);
  });

  it("returns null when compareAtPrice is missing, smaller or equal to price", () => {
    expect(calculateDiscountPercentage(1000000, undefined)).toBeNull();
    expect(calculateDiscountPercentage(1000000, 1000000)).toBeNull();
    expect(calculateDiscountPercentage(1000000, 800000)).toBeNull();
  });
});
