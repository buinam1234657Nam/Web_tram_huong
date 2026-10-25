import { z } from "zod";

const vietnamesePhoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;

export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Họ và tên tối thiểu 3 ký tự")
    .max(100, "Họ và tên tối đa 100 ký tự"),
  phone: z
    .string()
    .regex(
      vietnamesePhoneRegex,
      "Số điện thoại di động Việt Nam không hợp lệ (10 chữ số)",
    ),
  email: z
    .string()
    .email("Địa chỉ email không hợp lệ")
    .optional()
    .or(z.literal("")),
  province: z.string().min(2, "Vui lòng chọn Tỉnh/Thành phố"),
  district: z.string().min(2, "Vui lòng nhập hoặc chọn Quận/Huyện"),
  ward: z.string().min(2, "Vui lòng nhập Phường/Xã"),
  streetAddress: z.string().min(5, "Vui lòng nhập số nhà, tên đường chi tiết"),
  note: z.string().max(500, "Ghi chú không quá 500 ký tự").optional(),
  paymentMethod: z.enum(["cod", "bank_transfer"]),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
