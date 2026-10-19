"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  AlertCircle,
  QrCode,
  Loader2,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/features/cart/useCartStore";
import { checkoutFormSchema, CheckoutFormData } from "@/data/schemas/checkout";
import { formatVND } from "@/lib/format/currency";
import { Button } from "@/components/ui/Button";

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

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [isLoadingVerification, setIsLoadingVerification] = useState(true);
  const [verifiedData, setVerifiedData] = useState<VerifiedCartResponse | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<{
    code: string;
    total: number;
    name: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      province: "Khánh Hòa",
      district: "",
      ward: "",
      streetAddress: "",
      note: "",
      paymentMethod: "cod",
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");

  // Server-side inventory and price re-verification
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
        setServerError("Không thể kết nối đến máy chủ để xác thực giỏ hàng.");
      } finally {
        setIsLoadingVerification(false);
      }
    }

    verify();
  }, [items]);

  const onSubmit = async (formData: CheckoutFormData) => {
    if (isSubmitting || !verifiedData || verifiedData.items.length === 0) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          items: verifiedData.items,
        }),
      });

      const result = await res.json();

      if (result.success && result.order) {
        clearCart();
        setCreatedOrder({
          code: result.order.code,
          total: result.order.total,
          name: formData.fullName,
        });

        // Give time for the luxury gold checkmark SVG animation to draw smoothly
        setTimeout(() => {
          router.push(
            `/dat-hang/thanh-cong?orderCode=${encodeURIComponent(
              result.order.code
            )}&total=${result.order.total}&name=${encodeURIComponent(
              formData.fullName
            )}`
          );
        }, 1600);
      } else {
        setServerError(result.error || "Không thể tạo đơn hàng, vui lòng thử lại.");
        setIsSubmitting(false);
      }
    } catch {
      setServerError("Lỗi kết nối khi gửi đơn hàng, vui lòng kiểm tra mạng.");
      setIsSubmitting(false);
    }
  };

  if (isLoadingVerification) {
    return (
      <div className="py-24 text-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-champagne mx-auto" />
        <p className="font-serif text-base text-charcoal">
          Đang xác thực bảng giá và số lượng tồn kho từ máy chủ...
        </p>
        <p className="text-xs text-muted">Vui lòng đợi trong giây lát</p>
      </div>
    );
  }

  if (items.length === 0 || !verifiedData || verifiedData.items.length === 0) {
    return (
      <div className="bg-white p-8 rounded border border-border-subtle text-center max-w-lg mx-auto space-y-4">
        <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-charcoal">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="text-xs text-muted leading-relaxed">
          Quý khách cần có ít nhất một sản phẩm trong giỏ hàng để có thể tiến hành thanh toán.
        </p>
        <Button href="/san-pham" variant="primary" size="md">
          Quay lại mua sắm
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Luxury Loading & Success Fullscreen Overlay */}
      <AnimatePresence>
        {(isSubmitting || createdOrder) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest-dark/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-forest border border-champagne/40 rounded-xl p-8 max-w-md w-full text-center shadow-2xl space-y-6 text-ivory"
            >
              {!createdOrder ? (
                // Submitting State: Glowing Gold Spinner
                <div className="space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-champagne/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-champagne border-t-transparent animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-champagne-light/30 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-champagne">
                      Đang Bảo Mật Đơn Hàng...
                    </h3>
                    <p className="text-xs text-ivory/70 mt-1">
                      Hệ thống VĨNH TRẦM đang ghi nhận mã bưu phẩm và liên kết kho vận.
                    </p>
                  </div>
                </div>
              ) : (
                // Success State: Animated SVG Gold Checkmark
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
                    <motion.svg
                      className="w-20 h-20 text-champagne drop-shadow-md"
                      viewBox="0 0 52 52"
                    >
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="23"
                        fill="none"
                        stroke="#C5A46D"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                      />
                      <motion.path
                        fill="none"
                        stroke="#C5A46D"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 27l8 8 15-16"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-champagne font-semibold block">
                      Giao dịch hoàn tất
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                      Đặt Hàng Thành Công!
                    </h3>
                    <p className="text-xs text-ivory/80 mt-1">
                      Mã đơn: <span className="font-mono font-bold text-champagne">{createdOrder.code}</span>
                    </p>
                    <p className="text-[11px] text-ivory/60 mt-2">
                      Đang chuyển hướng tới chi tiết đơn hàng...
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Address & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Verification Warnings if any */}
          {verifiedData.errors && verifiedData.errors.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded text-xs text-amber-800 space-y-1">
              <strong>Lưu ý điều chỉnh từ kho hàng:</strong>
              <ul className="list-disc pl-4 space-y-0.5">
                {verifiedData.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {serverError && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Demo Notice Banner */}
          <div className="bg-amber-50/80 border border-amber-200 rounded p-4 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-2 font-semibold">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Chế độ Demo Storefront VĨNH TRẦM</span>
            </div>
            <p className="text-amber-800/90 leading-relaxed text-[11px]">
              Hệ thống đang hoạt động ở chế độ thử nghiệm an toàn. Quý khách có thể điền thông tin và đặt thử đơn hàng mà không bị trừ tiền thật.
            </p>
          </div>

          {/* Shipping Address Information */}
          <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4 shadow-2xs">
            <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
              1. Thông Tin Nhận Hàng
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Họ và tên người nhận <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className={`w-full text-xs p-3 rounded-sm bg-white border ${
                    errors.fullName ? "border-rose-400 ring-1 ring-rose-300" : "border-stone-300 hover:border-stone-400"
                  } text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Số điện thoại liên hệ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="Ví dụ: 0908866989"
                  className={`w-full text-xs p-3 rounded-sm bg-white border ${
                    errors.phone ? "border-rose-400 ring-1 ring-rose-300" : "border-stone-300 hover:border-stone-400"
                  } text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">
                Địa chỉ email (nhận hóa đơn & bảo hành điện tử)
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="quykhach@gmail.com (không bắt buộc)"
                className="w-full text-xs p-3 rounded-sm bg-white border border-stone-300 hover:border-stone-400 text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs"
              />
              {errors.email && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Consistent Address Trio: Province, District, Ward */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Province */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Tỉnh / Thành phố <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("province")}
                  placeholder="Khánh Hòa, Hà Nội, TP.HCM..."
                  className={`w-full text-xs p-3 rounded-sm bg-white border ${
                    errors.province ? "border-rose-400 ring-1 ring-rose-300" : "border-stone-300 hover:border-stone-400"
                  } text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs`}
                />
                {errors.province && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.province.message}</p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Quận / Huyện <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("district")}
                  placeholder="Quận 1, Nha Trang..."
                  className={`w-full text-xs p-3 rounded-sm bg-white border ${
                    errors.district ? "border-rose-400 ring-1 ring-rose-300" : "border-stone-300 hover:border-stone-400"
                  } text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs`}
                />
                {errors.district && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.district.message}</p>
                )}
              </div>

              {/* Ward */}
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5">
                  Phường / Xã <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("ward")}
                  placeholder="Phường Bến Nghé..."
                  className={`w-full text-xs p-3 rounded-sm bg-white border ${
                    errors.ward ? "border-rose-400 ring-1 ring-rose-300" : "border-stone-300 hover:border-stone-400"
                  } text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs`}
                />
                {errors.ward && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.ward.message}</p>
                )}
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">
                Số nhà, tên đường chi tiết <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("streetAddress")}
                placeholder="Số 18A Lê Thánh Tôn, Căn hộ..."
                className={`w-full text-xs p-3 rounded-sm bg-white border ${
                  errors.streetAddress ? "border-rose-400 ring-1 ring-rose-300" : "border-stone-300 hover:border-stone-400"
                } text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs`}
              />
              {errors.streetAddress && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.streetAddress.message}</p>
              )}
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1.5">
                Ghi chú đóng gói / giao hàng
              </label>
              <textarea
                rows={2}
                {...register("note")}
                placeholder="Ghi chú thêm về kích thước tay, giờ nhận hàng tiện nhất..."
                className="w-full text-xs p-3 rounded-sm bg-white border border-stone-300 hover:border-stone-400 text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Payment Method Selection with Accordion Expansion */}
          <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
              2. Phương Thức Thanh Toán
            </h2>

            <div className="space-y-3">
              {/* COD Accordion */}
              <div
                className={`border rounded-sm transition-all overflow-hidden ${
                  selectedPaymentMethod === "cod"
                    ? "border-forest bg-forest/5 shadow-xs ring-1 ring-forest/30"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <label className="flex items-center gap-3 p-4 cursor-pointer">
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    className="w-4 h-4 accent-forest"
                  />
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-5 h-5 text-forest" />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-charcoal block">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        Đồng kiểm trực tiếp cùng bưu tá khi nhận kiện trầm
                      </span>
                    </div>
                  </div>
                </label>

                <AnimatePresence>
                  {selectedPaymentMethod === "cod" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-forest/15 text-xs text-charcoal/80 space-y-2">
                        <div className="flex items-start gap-2 text-emerald-800 bg-emerald-50/70 p-3 rounded border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            Quý khách được mở hộp kiểm tra chất lượng, cảm nhận hương thơm tự nhiên và đối chiếu thẻ bảo hành trước khi thanh toán.
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 italic pl-1">
                          Miễn phí vận chuyển và bảo hiểm giá trị cao toàn quốc cho mọi tác phẩm VĨNH TRẦM.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bank Transfer (VietQR) Accordion */}
              <div
                className={`border rounded-sm transition-all overflow-hidden ${
                  selectedPaymentMethod === "bank_transfer"
                    ? "border-forest bg-forest/5 shadow-xs ring-1 ring-forest/30"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <label className="flex items-center gap-3 p-4 cursor-pointer">
                  <input
                    type="radio"
                    value="bank_transfer"
                    {...register("paymentMethod")}
                    className="w-4 h-4 accent-forest"
                  />
                  <div className="flex items-center gap-2.5">
                    <QrCode className="w-5 h-5 text-forest" />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-charcoal block">
                        Chuyển khoản ngân hàng (VietQR 24/7)
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        Quét mã QR tự động xác thực trong 30 giây
                      </span>
                    </div>
                  </div>
                </label>

                <AnimatePresence>
                  {selectedPaymentMethod === "bank_transfer" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-forest/15 text-xs text-charcoal/80 space-y-3">
                        <div className="bg-stone-50 p-3.5 rounded border border-stone-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-forest text-xs">Tài khoản chính thức VĨNH TRẦM:</span>
                            <span className="text-[10px] bg-forest text-ivory px-2 py-0.5 rounded font-mono">VietQR Chuẩn NAPAS</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                            <div>
                              <span className="text-stone-500 block text-[11px]">Ngân hàng:</span>
                              <span className="font-bold text-charcoal">Vietcombank (VCB)</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block text-[11px]">Số tài khoản:</span>
                              <span className="font-mono font-bold text-forest tracking-wider">6868 999 888</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block text-[11px]">Chủ tài khoản:</span>
                              <span className="font-semibold text-charcoal">CTCP VINH TRAM VIET NAM</span>
                            </div>
                            <div>
                              <span className="text-stone-500 block text-[11px]">Nội dung CK:</span>
                              <span className="font-mono text-forest font-bold">[Mã đơn hàng]</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-500 italic">
                          Sau khi bấm Xác Nhận Đặt Hàng, mã QR kèm đúng số tiền sẽ được hiển thị ngay tức thì.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* VNPay Accordion */}
              <div
                className={`border rounded-sm transition-all overflow-hidden ${
                  selectedPaymentMethod === "vnpay"
                    ? "border-forest bg-forest/5 shadow-xs ring-1 ring-forest/30"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <label className="flex items-center gap-3 p-4 cursor-pointer">
                  <input
                    type="radio"
                    value="vnpay"
                    {...register("paymentMethod")}
                    className="w-4 h-4 accent-forest"
                  />
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-forest" />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-charcoal block">
                        Thẻ ATM Nội Địa / Thẻ Quốc Tế / Ví VNPay
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        Cổng thanh toán mã hóa trực tuyến bảo mật tiêu chuẩn quốc tế
                      </span>
                    </div>
                  </div>
                </label>

                <AnimatePresence>
                  {selectedPaymentMethod === "vnpay" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 border-t border-forest/15 text-xs text-charcoal/80 space-y-2">
                        <p className="text-xs font-medium text-charcoal">Liên kết bảo mật với hơn 40 ngân hàng đối tác:</p>
                        <div className="flex flex-wrap gap-2 text-[11px]">
                          <span className="px-2.5 py-1 bg-white border border-stone-200 rounded font-semibold text-blue-700">Vietcombank</span>
                          <span className="px-2.5 py-1 bg-white border border-stone-200 rounded font-semibold text-rose-700">Techcombank</span>
                          <span className="px-2.5 py-1 bg-white border border-stone-200 rounded font-semibold text-emerald-700">MB Bank</span>
                          <span className="px-2.5 py-1 bg-white border border-stone-200 rounded font-semibold text-red-600">Agribank</span>
                          <span className="px-2.5 py-1 bg-white border border-stone-200 rounded font-semibold text-indigo-700">Visa / Mastercard</span>
                        </div>
                        <p className="text-[11px] text-stone-500 italic">
                          Hệ thống mô phỏng thanh toán cổng điện tử an toàn cho storefront.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Order Items & Submit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4 sticky top-28 shadow-xs">
            <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
              Đơn Hàng ({verifiedData.items.length} tác phẩm)
            </h2>

            <div className="divide-y divide-border-subtle max-h-72 overflow-y-auto pr-1">
              {verifiedData.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-ivory shrink-0 border border-border-subtle">
                    <Image
                      src={item.image}
                      alt={`Tác phẩm trầm hương ${item.name} tuyển chọn`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-0 right-0 bg-forest text-ivory text-[10px] font-bold px-1 rounded-tl">
                      x{item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold text-charcoal truncate">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-muted">{item.variantName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-forest">
                      {formatVND(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-border-subtle text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Tạm tính tiền hàng:</span>
                <span className="font-semibold text-charcoal">
                  {formatVND(verifiedData.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Phí giao hàng toàn quốc:</span>
                <span className="font-semibold text-charcoal">
                  {verifiedData.shippingFee === 0 ? (
                    <span className="text-emerald-700">Miễn phí</span>
                  ) : (
                    formatVND(verifiedData.shippingFee)
                  )}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle flex justify-between items-baseline">
              <span className="text-sm font-bold text-charcoal">Tổng thanh toán:</span>
              <span className="font-serif text-2xl font-bold text-forest">
                {formatVND(verifiedData.total)}
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-serif font-bold text-base py-3.5 tracking-wide shadow-lg shadow-forest/20 transition-all hover:scale-[1.01]"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Đang Xử Lý Đơn Hàng..." : "Xác Nhận Đặt Hàng"}
            </Button>

            <p className="text-[11px] text-center text-muted italic">
              Bằng việc nhấn đặt hàng, Quý khách đồng ý với các điều khoản bảo hành và giao nhận của VĨNH TRẦM.
            </p>

            <div className="pt-3 border-t border-border-subtle/70 space-y-2 text-[11px] text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                <span>Cam kết bồi hoàn 100% nếu phát hiện trầm giả</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-forest" />
                <span>Được đồng kiểm cùng bưu tá khi nhận kiện hàng</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
