import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Thanh Toán",
  description:
    "Hoàn tất thông tin giao nhận và phương thức thanh toán cho đơn hàng trầm hương tại VĨNH TRẦM.",
  alternates: {
    canonical: "/thanh-toan",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CheckoutPage() {
  const breadcrumbs = [
    { label: "Giỏ hàng", href: "/gio-hang" },
    { label: "Thanh toán", href: "/thanh-toan" },
  ];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-6 mb-10 text-3xl sm:text-4xl font-semibold text-agarwood">
        Thanh toán
      </h1>

      <CheckoutForm />
    </div>
  );
}
