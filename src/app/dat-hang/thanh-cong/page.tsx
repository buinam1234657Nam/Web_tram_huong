import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OrderSuccessView } from "./OrderSuccessView";

export const metadata: Metadata = {
  title: "Đặt Hàng Thành Công",
  description: "Xác nhận đơn hàng và mã tra cứu bưu phẩm tại VĨNH TRẦM.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderSuccessPage() {
  const breadcrumbs = [
    { label: "Giỏ hàng", href: "/gio-hang" },
    { label: "Đặt hàng thành công", href: "/dat-hang/thanh-cong" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <Breadcrumbs items={breadcrumbs} />

      <Suspense fallback={<div className="text-center py-24 text-xs text-muted">Đang tải chi tiết đơn hàng...</div>}>
        <OrderSuccessView />
      </Suspense>
    </div>
  );
}
