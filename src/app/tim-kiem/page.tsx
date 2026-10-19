import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SearchView } from "./SearchView";

export const metadata: Metadata = {
  title: "Tìm Kiếm Sản Phẩm Trầm Hương Tự Nhiên",
  description:
    "Tra cứu nhanh chóng các sản phẩm trầm hương tự nhiên VĨNH TRẦM: vòng tay, nhang mộc, trầm nụ xông phòng, tinh dầu oud thượng phẩm.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  const breadcrumbs = [
    { label: "Tìm kiếm", href: "/tim-kiem" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
        <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block">
          Tra Cứu Trực Tuyến
        </span>
        <h1 className="font-serif text-3xl font-bold text-charcoal">
          Tìm Kiếm Tác Phẩm Trầm Hương
        </h1>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-muted text-xs">Đang tải bộ tìm kiếm...</div>}>
        <SearchView />
      </Suspense>
    </div>
  );
}
