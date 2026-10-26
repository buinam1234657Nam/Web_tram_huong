import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SearchView } from "./SearchView";

export const metadata: Metadata = {
  title: "Tìm Kiếm",
  description:
    "Tìm nhanh vòng tay, nhang trầm, trầm nụ và tinh dầu trầm hương tự nhiên của VĨNH TRẦM.",
  alternates: {
    canonical: "/tim-kiem",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  const breadcrumbs = [{ label: "Tìm kiếm", href: "/tim-kiem" }];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-10 text-center text-3xl sm:text-4xl font-semibold text-agarwood">
        Tìm kiếm
      </h1>

      {/* The query comes from searchParams, so it must render inside Suspense. */}
      <Suspense fallback={<div className="py-24" aria-busy="true" />}>
        <SearchView />
      </Suspense>
    </div>
  );
}
