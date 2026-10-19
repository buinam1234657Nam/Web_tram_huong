import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Thanh Toán Đơn Hàng An Toàn",
  description:
    "Hoàn tất thông tin giao nhận và phương thức thanh toán cho đơn hàng trầm hương tự nhiên tại VĨNH TRẦM.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  const breadcrumbs = [
    { label: "Giỏ hàng", href: "/gio-hang" },
    { label: "Thanh toán", href: "/thanh-toan" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Xác Nhận Đặt Hàng & Thanh Toán
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Vui lòng cung cấp thông tin chính xác để chuyên viên VĨNH TRẦM liên hệ đồng kiểm và chuyển phát.
        </p>
      </div>

      <CheckoutForm />
    </div>
  );
}
