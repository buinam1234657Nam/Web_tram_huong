import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CartPageView } from "./CartPageView";

export const metadata: Metadata = {
  title: "Giỏ Hàng",
  description:
    "Xem lại các sản phẩm trầm hương đã chọn, cập nhật số lượng và chuẩn bị thanh toán tại VĨNH TRẦM.",
  alternates: {
    canonical: "/gio-hang",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CartPage() {
  const breadcrumbs = [{ label: "Giỏ hàng", href: "/gio-hang" }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-6 mb-10 text-3xl sm:text-4xl font-semibold text-charcoal">
        Giỏ hàng
      </h1>

      <CartPageView />
    </div>
  );
}
