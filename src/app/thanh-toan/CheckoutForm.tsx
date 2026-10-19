"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  AlertCircle,
  QrCode,
  Loader2,
  Lock,
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
        // Redirect to order success with verified order code
        router.push(
          `/dat-hang/thanh-cong?orderCode=${encodeURIComponent(
            result.order.code
          )}&total=${result.order.total}&name=${encodeURIComponent(
            formData.fullName
          )}`
        );
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
        <Loader2 className="w-8 h-8 animate-spin text-forest mx-auto" />
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
        <Button variant="primary" size="md">
          <Link href="/san-pham">Quay lại mua sắm</Link>
        </Button>
      </div>
    );
  }

  return (
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
        <div className="bg-forest/5 border border-forest/20 rounded p-4 text-xs text-forest space-y-1">
          <div className="flex items-center gap-2 font-semibold">
            <Lock className="w-4 h-4 text-forest" />
            <span>Chế độ Demo Storefront VĨNH TRẦM</span>
          </div>
          <p className="text-charcoal/80">
            Hệ thống đang hoạt động ở chế độ thử nghiệm an toàn. Quý khách có thể điền thông tin và đặt thử đơn hàng mà không bị trừ tiền thật.
          </p>
        </div>

        {/* Shipping Address Information */}
        <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
            1. Thông Tin Nhận Hàng
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Họ và tên người nhận <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Ví dụ: Nguyễn Văn An"
                className={`w-full text-xs p-2.5 rounded bg-ivory border ${
                  errors.fullName ? "border-rose-400" : "border-border-subtle"
                } text-charcoal focus:outline-none focus:ring-1 focus:ring-forest`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Số điện thoại liên hệ <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Ví dụ: 0908866989"
                className={`w-full text-xs p-2.5 rounded bg-ivory border ${
                  errors.phone ? "border-rose-400" : "border-border-subtle"
                } text-charcoal focus:outline-none focus:ring-1 focus:ring-forest`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Địa chỉ email (nhận xác nhận điện tử)
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="quykhach@gmail.com (không bắt buộc)"
              className="w-full text-xs p-2.5 rounded bg-ivory border border-border-subtle text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
            />
            {errors.email && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Province */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Tỉnh / Thành phố <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("province")}
                placeholder="Khánh Hòa, Hà Nội, TP.HCM..."
                className={`w-full text-xs p-2.5 rounded bg-ivory border ${
                  errors.province ? "border-rose-400" : "border-border-subtle"
                } text-charcoal focus:outline-none focus:ring-1 focus:ring-forest`}
              />
              {errors.province && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.province.message}</p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Quận / Huyện <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("district")}
                placeholder="Quận 1, Nha Trang..."
                className={`w-full text-xs p-2.5 rounded bg-ivory border ${
                  errors.district ? "border-rose-400" : "border-border-subtle"
                } text-charcoal focus:outline-none focus:ring-1 focus:ring-forest`}
              />
              {errors.district && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.district.message}</p>
              )}
            </div>

            {/* Ward */}
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Phường / Xã <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register("ward")}
                placeholder="Phường Bến Nghé..."
                className={`w-full text-xs p-2.5 rounded bg-ivory border ${
                  errors.ward ? "border-rose-400" : "border-border-subtle"
                } text-charcoal focus:outline-none focus:ring-1 focus:ring-forest`}
              />
              {errors.ward && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.ward.message}</p>
              )}
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Số nhà, tên đường chi tiết <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              {...register("streetAddress")}
              placeholder="Số 18A Lê Thánh Tôn, Căn hộ..."
              className={`w-full text-xs p-2.5 rounded bg-ivory border ${
                errors.streetAddress ? "border-rose-400" : "border-border-subtle"
              } text-charcoal focus:outline-none focus:ring-1 focus:ring-forest`}
            />
            {errors.streetAddress && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.streetAddress.message}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Ghi chú đóng gói / giao hàng
            </label>
            <textarea
              rows={2}
              {...register("note")}
              placeholder="Ghi chú thêm về kích thước tay, giờ nhận hàng tiện nhất..."
              className="w-full text-xs p-2.5 rounded bg-ivory border border-border-subtle text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
            2. Phương Thức Thanh Toán
          </h2>

          <div className="space-y-3">
            {/* COD */}
            <label
              className={`block p-4 border rounded cursor-pointer transition-all ${
                selectedPaymentMethod === "cod"
                  ? "border-forest bg-forest/5 shadow-xs"
                  : "border-border-subtle hover:border-stone-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value="cod"
                  {...register("paymentMethod")}
                  className="w-4 h-4 accent-forest"
                />
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-forest" />
                  <span className="text-xs sm:text-sm font-semibold text-charcoal">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted pl-7 mt-1">
                Quý khách được mở hộp kiểm tra chất lượng và hương trầm với nhân viên giao hàng trước khi thanh toán tiền mặt.
              </p>
            </label>

            {/* Bank Transfer */}
            <label
              className={`block p-4 border rounded cursor-pointer transition-all ${
                selectedPaymentMethod === "bank_transfer"
                  ? "border-forest bg-forest/5 shadow-xs"
                  : "border-border-subtle hover:border-stone-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value="bank_transfer"
                  {...register("paymentMethod")}
                  className="w-4 h-4 accent-forest"
                />
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-agarwood" />
                  <span className="text-xs sm:text-sm font-semibold text-charcoal">
                    Chuyển khoản ngân hàng (VietQR)
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted pl-7 mt-1">
                Quét mã VietQR chuyển khoản nhanh 24/7. Mã đơn hàng sẽ được tạo để quý khách đối chiếu.
              </p>
            </label>

            {/* VNPay */}
            <label
              className={`block p-4 border rounded cursor-pointer transition-all ${
                selectedPaymentMethod === "vnpay"
                  ? "border-forest bg-forest/5 shadow-xs"
                  : "border-border-subtle hover:border-stone-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value="vnpay"
                  {...register("paymentMethod")}
                  className="w-4 h-4 accent-forest"
                />
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-champagne-dark" />
                  <span className="text-xs sm:text-sm font-semibold text-charcoal">
                    Thẻ ATM nội địa / Ví VNPay (Demo Sandbox)
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted pl-7 mt-1">
                Cổng thanh toán điện tử mô phỏng cho storefront.
              </p>
            </label>
          </div>
        </div>
      </div>

      {/* Right 5 cols: Order Items & Submit */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 border border-border-subtle rounded-sm space-y-4 sticky top-24">
          <h2 className="font-serif text-lg font-bold text-charcoal pb-3 border-b border-border-subtle">
            Đơn Hàng ({verifiedData.items.length} tác phẩm)
          </h2>

          <div className="divide-y divide-border-subtle max-h-72 overflow-y-auto pr-1">
            {verifiedData.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                <div className="relative w-14 h-14 rounded overflow-hidden bg-ivory shrink-0 border border-border-subtle">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 bg-forest text-ivory text-[10px] font-bold px-1 rounded-tl">
                    x{item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-charcoal truncate">
                    {item.name}
                  </h4>
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
            className="w-full"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Đang Xử Lý Đơn Hàng..." : "Xác Nhận Đặt Hàng"}
          </Button>

          <p className="text-[11px] text-center text-muted italic">
            Bằng việc nhấn đặt hàng, Quý khách đồng ý với các điều khoản bảo hành và giao nhận của VĨNH TRẦM.
          </p>

          <div className="pt-3 border-t border-border-subtle/70 space-y-2 text-[11px] text-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              <span>Chính sách bồi hoàn nếu phát hiện trầm giả</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-forest" />
              <span>Được đồng kiểm cùng bưu tá khi nhận kiện hàng</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
