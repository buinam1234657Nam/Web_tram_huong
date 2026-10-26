import { z } from "zod";
import { findProvince, isWardOf } from "@/data/address";

const vietnameseMobileRegex = /^0(3|5|7|8|9)[0-9]{8}$/;

/** Shoppers may type "0908 866 989" or "0908.866.989"; the order keeps digits only. */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s.-]/g, "");
}

export const checkoutFormSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Họ và tên tối thiểu 3 ký tự")
      .max(100, "Họ và tên tối đa 100 ký tự"),
    phone: z
      .string()
      .transform(normalizePhone)
      .pipe(
        z
          .string()
          .regex(
            vietnameseMobileRegex,
            "Số điện thoại di động Việt Nam không hợp lệ (10 chữ số)",
          ),
      ),
    email: z
      .string()
      .email("Địa chỉ email không hợp lệ")
      .optional()
      .or(z.literal("")),
    // Two levels since the 2025 merger: province, then ward/commune.
    province: z
      .string()
      .refine((name) => Boolean(findProvince(name)), "Vui lòng chọn Tỉnh/Thành phố"),
    ward: z.string().min(1, "Vui lòng chọn Phường/Xã"),
    streetAddress: z
      .string()
      .trim()
      .min(3, "Vui lòng nhập số nhà, tên đường"),
    note: z.string().max(500, "Ghi chú không quá 500 ký tự").optional(),
    paymentMethod: z.enum(["cod", "bank_transfer"]),
  })
  .refine((data) => isWardOf(data.province, data.ward), {
    path: ["ward"],
    message: "Vui lòng chọn Phường/Xã",
  });

/** What the form holds while the shopper types. */
export type CheckoutFormInput = z.input<typeof checkoutFormSchema>;
/** What reaches the server: trimmed, phone reduced to digits. */
export type CheckoutFormData = z.output<typeof checkoutFormSchema>;
