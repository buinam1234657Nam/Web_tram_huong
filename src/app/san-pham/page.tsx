import React from "react";
import { Metadata } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CatalogView } from "./CatalogView";

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Trầm Hương Tự Nhiên Thượng Hạng",
  description:
    "Tuyển chọn các tác phẩm trầm hương tự nhiên Khánh Hòa & Quảng Nam: Vòng tay trầm 108 hạt, nhang trầm không tăm, trầm nụ, tinh dầu nguyên chất.",
  alternates: {
    canonical: "/san-pham",
  },
  openGraph: {
    title: "Bộ Sưu Tập Trầm Hương Tự Nhiên | VĨNH TRẦM",
    description: "Trầm hương tự nhiên nguyên bản, bảo hành dây và hạt trọn đời.",
    url: "https://vinhtram.vn/san-pham",
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    catalogRepository.getProducts(),
    catalogRepository.getCategories(),
  ]);

  const breadcrumbs = [
    { label: "Sản phẩm", href: "/san-pham" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Heading */}
      <div className="mb-8 pb-6 border-b border-border-subtle">
        <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block mb-1">
          Tuyển Tập VĨNH TRẦM
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Bộ Sưu Tập Trầm Hương Thượng Hạng
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-2 max-w-2xl leading-relaxed">
          Tất cả sản phẩm đều được thu hái và tiện mộc từ trầm tự nhiên Khánh Hòa và Tiên Phước, Quảng Nam. Cam kết không tẩm ép hương liệu, an toàn tuyệt đối cho sức khỏe.
        </p>
      </div>

      <CatalogView
        initialProducts={products}
        categories={categories}
      />
    </div>
  );
}
