import { describe, it, expect } from "vitest";
import { checkoutFormSchema } from "@/data/schemas/checkout";
import { newsletterSchema } from "@/data/schemas/newsletter";

describe("Validation Schemas", () => {
  describe("checkoutFormSchema", () => {
    it("validates correct checkout data with Vietnamese phone number", () => {
      const validData = {
        fullName: "Nguyễn Văn An",
        phone: "0908866989",
        email: "vanan@gmail.com",
        province: "Tỉnh Khánh Hòa",
        ward: "Xã Vạn Ninh",
        streetAddress: "Số 68 Đường Trầm Hương",
        note: "Đóng gói kỹ giúp tôi",
        paymentMethod: "cod" as const,
      };

      const result = checkoutFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects invalid Vietnamese phone numbers", () => {
      const invalidData = {
        fullName: "Nguyễn Văn An",
        phone: "123456", // Invalid phone
        email: "vanan@gmail.com",
        province: "Tỉnh Khánh Hòa",
        ward: "Xã Vạn Ninh",
        streetAddress: "Số 68 Đường Trầm Hương",
        paymentMethod: "cod" as const,
      };

      const result = checkoutFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain("phone");
      }
    });

    it("rejects short or empty names", () => {
      const invalidData = {
        fullName: "A", // too short
        phone: "0908866989",
        province: "Tỉnh Khánh Hòa",
        ward: "Xã Vạn Ninh",
        streetAddress: "Số 68 Đường Trầm Hương",
        paymentMethod: "cod" as const,
      };

      const result = checkoutFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("rejects invalid payment method", () => {
      const invalidData = {
        fullName: "Nguyễn Văn An",
        phone: "0908866989",
        province: "Tỉnh Khánh Hòa",
        ward: "Xã Vạn Ninh",
        streetAddress: "Số 68 Đường Trầm Hương",
        paymentMethod: "bitcoin", // invalid enum
      };

      const result = checkoutFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("accepts bank transfer and rejects the removed card gateway", () => {
      const base = {
        fullName: "Nguyễn Văn An",
        phone: "0908866989",
        province: "Tỉnh Khánh Hòa",
        ward: "Xã Vạn Ninh",
        streetAddress: "Số 68 Đường Trầm Hương",
      };

      expect(
        checkoutFormSchema.safeParse({
          ...base,
          paymentMethod: "bank_transfer",
        }).success,
      ).toBe(true);
      expect(
        checkoutFormSchema.safeParse({ ...base, paymentMethod: "vnpay" })
          .success,
      ).toBe(false);
    });

    it("accepts a phone typed with spaces and keeps digits only", () => {
      const result = checkoutFormSchema.safeParse({
        fullName: "Nguyễn Văn An",
        phone: "0908 866 989",
        province: "Thành phố Hồ Chí Minh",
        ward: "Phường Sài Gòn",
        streetAddress: "18A Lê Thánh Tôn",
        paymentMethod: "cod",
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.phone).toBe("0908866989");
    });

    it("rejects a ward that is not in the chosen province", () => {
      const result = checkoutFormSchema.safeParse({
        fullName: "Nguyễn Văn An",
        phone: "0908866989",
        province: "Tỉnh Khánh Hòa",
        ward: "Phường Sài Gòn",
        streetAddress: "Số 68 Đường Trầm Hương",
        paymentMethod: "cod",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toEqual(["ward"]);
      }
    });

    it("rejects pre-2025 province names", () => {
      const result = checkoutFormSchema.safeParse({
        fullName: "Nguyễn Văn An",
        phone: "0908866989",
        province: "Tỉnh Quảng Nam",
        ward: "Xã Tiên Phước",
        streetAddress: "Thôn 1",
        paymentMethod: "cod",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("newsletterSchema", () => {
    it("accepts valid email addresses", () => {
      expect(
        newsletterSchema.safeParse({ email: "khachhang@vinhtram.vn" }).success,
      ).toBe(true);
    });

    it("rejects malformed emails", () => {
      expect(
        newsletterSchema.safeParse({ email: "not-an-email" }).success,
      ).toBe(false);
    });
  });
});
