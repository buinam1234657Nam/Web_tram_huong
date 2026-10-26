import { z } from "zod";

const VN_PHONE = /^(0|\+84)\d{9}$/;

export const backInStockSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  contact: z
    .string()
    .trim()
    .refine(
      (value) =>
        VN_PHONE.test(value.replace(/[\s.]/g, "")) ||
        z.string().email().safeParse(value).success,
      "Vui lòng nhập số điện thoại hoặc email hợp lệ.",
    ),
});

export type BackInStockFormData = z.infer<typeof backInStockSchema>;
