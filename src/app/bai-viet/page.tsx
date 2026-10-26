import React from "react";
import { Metadata } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ArticlesView } from "./ArticlesView";

export const metadata: Metadata = {
  title: "Tin Tức & Kiến Thức Trầm Hương",
  description:
    "Kiến thức phân biệt trầm hương tự nhiên, cách xông trầm, chăm sóc vòng tay và ý nghĩa chuỗi trầm 108 hạt.",
  alternates: {
    canonical: "/bai-viet",
  },
  openGraph: {
    title: "Tin Tức & Kiến Thức Trầm Hương | VĨNH TRẦM",
    description: "Kiến thức thưởng trầm và chăm sóc trầm hương tự nhiên.",
    url: "/bai-viet",
    images: [
      {
        url: "/images/artisan-story.jpg",
        width: 1376,
        height: 768,
        alt: "Nghệ nhân Vĩnh Trầm chế tác trầm hương",
      },
    ],
  },
};

export default async function ArticlesPage() {
  const articles = await catalogRepository.getArticles();

  const breadcrumbs = [{ label: "Tin tức", href: "/bai-viet" }];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-10 sm:mt-14 mb-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-semibold text-agarwood tracking-tight">
          Tin tức & kiến thức trầm
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Cách nhận biết trầm thật, cách xông, cách giữ vòng bền hương và những
          câu chuyện từ xưởng chế tác.
        </p>
      </header>

      <ArticlesView initialArticles={articles} />
    </div>
  );
}
