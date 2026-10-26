import React from "react";
import { Metadata } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { toSummary } from "@/data/catalog/products";
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
    description:
      "Trầm hương tự nhiên nguyên bản, bảo hành dây và hạt trọn đời.",
    url: "/san-pham",
    // A page-level openGraph replaces the root one entirely, so restate the image.
    images: [
      {
        url: "/images/bracelet-108.jpg",
        width: 1024,
        height: 1024,
        alt: "Bộ sưu tập trầm hương VĨNH TRẦM",
      },
    ],
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    catalogRepository.getProducts(),
    catalogRepository.getCategories(),
  ]);

  const breadcrumbs = [{ label: "Sản phẩm", href: "/san-pham" }];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <CatalogView
        products={products.map(toSummary)}
        categories={categories}
      />
    </div>
  );
}
