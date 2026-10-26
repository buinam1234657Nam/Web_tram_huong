import { describe, it, expect } from "vitest";
import { normalizeUnitName, provinces, wardsOf } from "@/data/address";
import { buildVietQrPayload, crc16, toTransferText } from "@/lib/payment/vietqr";

describe("administrative units (2025)", () => {
  it("has the 34 post-merger provinces and no district level", () => {
    expect(provinces).toHaveLength(34);
    expect(wardsOf("Tỉnh Khánh Hòa").length).toBeGreaterThan(0);
  });

  it("matches names without diacritics or unit type", () => {
    expect(normalizeUnitName("Phường Sài Gòn")).toBe("sai gon");
    expect(normalizeUnitName("  thành phố  Đà Nẵng ")).toBe("da nang");
  });
});

describe("VietQR", () => {
  it("uses CRC-16/CCITT-FALSE", () => {
    // Standard check value for this CRC variant
    expect(crc16("123456789")).toBe("29B1");
  });

  it("builds a dynamic payload with amount, reference and a valid checksum", () => {
    const payload = buildVietQrPayload({
      bin: "970436",
      accountNumber: "0123456789",
      amount: 7290000,
      reference: "VT12345678",
    });
    expect(payload.startsWith("000201010212")).toBe(true);
    expect(payload).toContain("0010A000000727");
    expect(payload).toContain("0006970436");
    expect(payload).toContain("01100123456789");
    expect(payload).toContain("54077290000");
    expect(payload).toContain("62140810VT12345678");
    expect(payload.slice(-4)).toBe(crc16(payload.slice(0, -4)));
  });

  it("keeps transfer references to plain ASCII", () => {
    expect(toTransferText("Đơn VT-123")).toBe("Don VT123");
  });
});
