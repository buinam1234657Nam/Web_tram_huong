import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CartPageView } from "./CartPageView";

export const metadata: Metadata = {
  title: "Giỏ Hàng Của Bạn",
  description:
    "Xem lại các sản phẩm trầm hương đã chọn trong giỏ hàng, cập nhật số lượng và chuẩn bị thanh toán an toàn tại VĨNH TRẦM.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  const breadcrumbs = [
    { label: "Giỏ hàng", href: "/gio-hang" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Giỏ Hàng Của Quý Khách
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1">
          Kiểm tra các tác phẩm trầm hương đã chọn trước khi tiến hành xác nhận đặt hàng.
        </p>
      </div>

      <CartPageView />
    </div>
  );
}
