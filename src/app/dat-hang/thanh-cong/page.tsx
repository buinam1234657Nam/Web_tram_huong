import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OrderLoading, OrderSuccessView } from "./OrderSuccessView";

export const metadata: Metadata = {
  title: "Đặt Hàng Thành Công",
  description: "Xác nhận đơn hàng tại VĨNH TRẦM.",
  alternates: {
    canonical: "/dat-hang/thanh-cong",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function OrderSuccessPage() {
  const breadcrumbs = [
    { label: "Giỏ hàng", href: "/gio-hang" },
    { label: "Đặt hàng thành công", href: "/dat-hang/thanh-cong" },
  ];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-10">
        {/* The order code comes from searchParams, so it must render inside Suspense. */}
        <Suspense fallback={<OrderLoading />}>
          <OrderSuccessView />
        </Suspense>
      </div>
    </div>
  );
}
