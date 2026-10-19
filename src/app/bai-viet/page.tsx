import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

import { ArticlesView } from "./ArticlesView";

export const metadata: Metadata = {
  title: "Cẩm Nang Tri Thức & Nghệ Thuật Thưởng Trầm Hương",
  description:
    "Tổng hợp kiến thức phân biệt trầm hương tự nhiên, phong thủy chuỗi vòng trầm 108 hạt và nghệ thuật thưởng trầm bên bàn trà.",
  alternates: {
    canonical: "/bai-viet",
  },
  openGraph: {
    title: "Cẩm Nang Trầm Hương Việt Nam | VĨNH TRẦM",
    description: "Khám phá chiều sâu văn hóa và kiến thức thưởng trầm đất Việt.",
    url: "https://vinhtram.vn/bai-viet",
  },
};

export default async function ArticlesPage() {
  const articles = await catalogRepository.getArticles();

  const breadcrumbs = [
    { label: "Kiến thức trầm", href: "/bai-viet" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="border-b border-border-subtle pb-6">
        <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block mb-1">
          Góc Văn Hóa & Nghệ Thuật
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Cẩm Nang Thưởng Trầm Đất Việt
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-2 max-w-2xl leading-relaxed">
          Nơi chia sẻ những nghiên cứu tâm huyết, kiến thức phân biệt trầm tự nhiên và những câu chuyện mộc mạc bên chiếc bàn đục của người nghệ nhân.
        </p>
      </div>

      <ArticlesView initialArticles={articles} />
    </div>
  );
}
