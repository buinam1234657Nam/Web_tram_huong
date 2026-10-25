"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/features/cart/useCartStore";
import { saveOrder } from "@/features/cart/orderStorage";
import { checkoutFormSchema, CheckoutFormData } from "@/data/schemas/checkout";
import { formatVND } from "@/lib/format/currency";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import { Button } from "@/components/ui/Button";
import type { Order, PaymentMethod } from "@/types/order";

interface VerifiedCartResponse {
  valid: boolean;
  errors: string[];
  items: Array<{
    id: string;
    productId: string;
    variantId: string;
    name: string;
    variantName: string;
    price: number;
    quantity: number;
    image: string;
    subtotal: number;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
}

/** Demo-only account shown for bank transfer; clearly a placeholder. */
const DEMO_BANK_ACCOUNT = {
  bank: "Vietcombank",
  number: "0123 456 789",
  holder: "VĨNH TRẦM",
};

const PAYMENT_OPTIONS: Array<{
  value: PaymentMethod;
  title: string;
  description: string;
}> = [
  {
    value: "cod",
    title: "Thanh toán khi nhận hàng (COD)",
    description: "Mở hộp kiểm tra cùng bưu tá rồi mới thanh toán.",
  },
  {
    value: "bank_transfer",
    title: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản trước, đơn được đóng gói ngay khi nhận tiền.",
  },
];

const inputClass = (hasError: boolean) =>
  `w-full h-12 px-4 rounded-lg bg-white border text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none focus:border-charcoal transition-colors ${
    hasError
      ? "border-rose-500"
      : "border-border-subtle hover:border-charcoal/40"
  }`;

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [isLoadingVerification, setIsLoadingVerification] = useState(true);
  const [verifiedData, setVerifiedData] = useState<VerifiedCartResponse | null>(
    null,
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderCode, setPlacedOrderCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      province: "",
      district: "",
      ward: "",
      streetAddress: "",
      note: "",
      paymentMethod: "cod",
    },
  });

  const selectedPaymentMethod = useWatch({ control, name: "paymentMethod" });

  // Re-verify prices and stock against the catalog
  useEffect(() => {
    async function verify() {
      if (items.length === 0) {
        setIsLoadingVerification(false);
        return;
      }

      try {
        const res = await fetch("/api/validate-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              variantId: i.variantId,
              quantity: i.quantity,
            })),
          }),
        });
        const data = await res.json();
        setVerifiedData(data);
      } catch {
        setServerError("Không thể kết nối máy chủ để kiểm tra giỏ hàng.");
      } finally {
        setIsLoadingVerification(false);
      }
    }

    verify();
  }, [items]);

  const onSubmit = async (formData: CheckoutFormData) => {
    if (isSubmitting || !verifiedData || verifiedData.items.length === 0)
      return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, items: verifiedData.items }),
      });
      const result: { success: boolean; order?: Order; error?: string } =
        await res.json();

      if (result.success && result.order) {
        saveOrder(result.order);
        setPlacedOrderCode(result.order.code);
        // Only the order code goes in the URL; details come from sessionStorage.
        router.push(
          `/dat-hang/thanh-cong?orderCode=${encodeURIComponent(result.order.code)}`,
        );
        clearCart();
      } else {
        setServerError(
          result.error || "Không thể tạo đơn hàng, vui lòng thử lại.",
        );
        setIsSubmitting(false);
      }
    } catch {
      setServerError("Lỗi kết nối khi gửi đơn hàng, vui lòng kiểm tra mạng.");
      setIsSubmitting(false);
    }
  };

  if (placedOrderCode) {
    return (
      <div className="py-24 flex flex-col items-center gap-3 text-muted">
        <Loader2 className="w-6 h-6 animate-spin text-espresso" />
        <p className="text-[15px]">Đang mở đơn hàng {placedOrderCode}…</p>
      </div>
    );
  }

  if (isLoadingVerification) {
    return (
      <div className="py-24 flex flex-col items-center gap-3 text-muted">
        <Loader2 className="w-6 h-6 animate-spin text-espresso" />
        <p className="text-[15px]">Đang kiểm tra giá và tồn kho…</p>
      </div>
    );
  }

  if (items.length === 0 || !verifiedData || verifiedData.items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-charcoal">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="mt-3 text-[15px] text-muted leading-relaxed">
          Thêm ít nhất một sản phẩm vào giỏ để tiếp tục thanh toán.
        </p>
        <div className="mt-8">
          <Button href="/san-pham">Xem sản phẩm</Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
    >
      <div className="lg:col-span-7 space-y-12">
        {verifiedData.errors && verifiedData.errors.length > 0 && (
          <div className="rounded-lg bg-ivory px-5 py-4 text-sm text-charcoal">
            <p className="font-medium">
              Giỏ hàng đã được điều chỉnh theo tồn kho:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-muted">
              {verifiedData.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {serverError && (
          <p
            role="alert"
            className="rounded-lg bg-rose-50 px-5 py-4 text-sm text-rose-700"
          >
            {serverError}
          </p>
        )}

        <section aria-labelledby="checkout-shipping">
          <h2
            id="checkout-shipping"
            className="text-xl font-semibold text-charcoal"
          >
            Thông tin nhận hàng
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            <Field
              label="Họ và tên"
              required
              error={errors.fullName?.message}
              registration={register("fullName")}
              placeholder="Nguyễn Văn An"
              autoComplete="name"
            />
            <Field
              label="Số điện thoại"
              required
              type="tel"
              error={errors.phone?.message}
              registration={register("phone")}
              placeholder="0908 866 989"
              autoComplete="tel"
            />
            <Field
              label="Email (không bắt buộc)"
              type="email"
              className="sm:col-span-2"
              error={errors.email?.message}
              registration={register("email")}
              placeholder="ban@email.com"
              autoComplete="email"
            />
            <Field
              label="Tỉnh / Thành phố"
              required
              error={errors.province?.message}
              registration={register("province")}
              placeholder="Khánh Hòa"
              autoComplete="address-level1"
            />
            <Field
              label="Quận / Huyện"
              required
              error={errors.district?.message}
              registration={register("district")}
              placeholder="Nha Trang"
              autoComplete="address-level2"
            />
            <Field
              label="Phường / Xã"
              required
              error={errors.ward?.message}
              registration={register("ward")}
              placeholder="Vĩnh Hòa"
              autoComplete="address-level3"
            />
            <Field
              label="Số nhà, tên đường"
              required
              error={errors.streetAddress?.message}
              registration={register("streetAddress")}
              placeholder="68 Đường Trầm Hương"
              autoComplete="street-address"
            />
            <div className="sm:col-span-2">
              <label
                htmlFor="checkout-note"
                className="block text-sm font-medium text-charcoal mb-2"
              >
                Ghi chú (không bắt buộc)
              </label>
              <textarea
                id="checkout-note"
                rows={3}
                {...register("note")}
                placeholder="Chu vi cổ tay, giờ nhận hàng tiện cho bạn…"
                className="w-full px-4 py-3 rounded-lg bg-white border border-border-subtle hover:border-charcoal/40 text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none focus:border-charcoal transition-colors"
              />
              {errors.note && (
                <p className="mt-1.5 text-sm text-rose-600">
                  {errors.note.message}
                </p>
              )}
            </div>
          </div>
        </section>

        <section aria-labelledby="checkout-payment">
          <h2
            id="checkout-payment"
            className="text-xl font-semibold text-charcoal"
          >
            Thanh toán
          </h2>

          <div className="mt-6 space-y-3">
            {PAYMENT_OPTIONS.map((option) => {
              const isSelected = selectedPaymentMethod === option.value;
              return (
                <div
                  key={option.value}
                  className={`rounded-lg border transition-colors ${
                    isSelected
                      ? "border-charcoal ring-1 ring-charcoal"
                      : "border-border-subtle hover:border-charcoal/40"
                  }`}
                >
                  <label className="flex items-start gap-4 p-5 cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      {...register("paymentMethod")}
                      className="mt-1 w-4 h-4 accent-espresso"
                    />
                    <span>
                      <span className="block text-[15px] font-medium text-charcoal">
                        {option.title}
                      </span>
                      <span className="block mt-0.5 text-sm text-muted">
                        {option.description}
                      </span>
                    </span>
                  </label>

                  <AnimatePresence initial={false}>
                    {isSelected && option.value === "bank_transfer" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: MOTION_EASE }}
                        className="overflow-hidden"
                      >
                        <dl className="mx-5 mb-5 rounded-lg bg-ivory px-5 py-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                          <dt className="text-muted">Ngân hàng</dt>
                          <dd className="text-charcoal">
                            {DEMO_BANK_ACCOUNT.bank}
                          </dd>
                          <dt className="text-muted">Số tài khoản</dt>
                          <dd className="text-charcoal font-medium tracking-wide">
                            {DEMO_BANK_ACCOUNT.number}
                          </dd>
                          <dt className="text-muted">Chủ tài khoản</dt>
                          <dd className="text-charcoal">
                            {DEMO_BANK_ACCOUNT.holder}
                          </dd>
                          <dt className="text-muted">Nội dung</dt>
                          <dd className="text-charcoal">
                            Mã đơn hàng (hiện sau khi đặt)
                          </dd>
                        </dl>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Order summary */}
      <aside className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)] rounded-2xl bg-ivory p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-charcoal">
          Đơn hàng ({verifiedData.items.length})
        </h2>

        <ul className="mt-6 space-y-4 max-h-80 overflow-y-auto">
          {verifiedData.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-charcoal truncate">
                  {item.name}
                </p>
                <p className="text-sm text-muted truncate">
                  {item.variantName} · SL {item.quantity}
                </p>
              </div>
              <p className="text-[15px] text-charcoal shrink-0">
                {formatVND(item.subtotal)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-6 pt-6 border-t border-border-dark/10 space-y-2 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">Tạm tính</dt>
            <dd className="text-charcoal">
              {formatVND(verifiedData.subtotal)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Vận chuyển</dt>
            <dd className="text-charcoal">
              {verifiedData.shippingFee === 0
                ? "Miễn phí"
                : formatVND(verifiedData.shippingFee)}
            </dd>
          </div>
          <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-border-dark/10">
            <dt className="font-medium text-charcoal">Tổng cộng</dt>
            <dd className="text-2xl font-semibold text-charcoal">
              {formatVND(verifiedData.total)}
            </dd>
          </div>
        </dl>

        <Button
          type="submit"
          size="lg"
          className="mt-8 w-full"
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Đang đặt hàng…" : "Đặt hàng"}
        </Button>

        <p className="mt-4 text-sm text-muted text-center leading-relaxed">
          Bạn được mở hộp kiểm tra trước khi nhận. Đổi trả trong 7 ngày nếu sản
          phẩm lỗi.
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  required = false,
  type = "text",
  className = "",
  error,
  registration,
  placeholder,
  autoComplete,
}: {
  label: string;
  required?: boolean;
  type?: string;
  className?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `checkout-${registration.name}`;
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal mb-2"
      >
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        {...registration}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(Boolean(error))}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
