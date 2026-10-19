import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Địa chỉ email không đúng định dạng. Ví dụ: quykhach@gmail.com"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
