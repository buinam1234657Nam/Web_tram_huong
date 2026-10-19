import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-border-subtle rounded-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-16/10 w-full bg-ivory overflow-hidden">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-2.5 left-2.5 text-[11px] font-semibold bg-forest text-ivory px-2.5 py-0.5 rounded-xs">
                {article.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-muted mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTimeMinutes} phút đọc
                  </span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h2 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-2 mb-2">
                  <Link href={`/bai-viet/${article.slug}`}>{article.title}</Link>
                </h2>

                <p className="text-xs text-muted leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle/60 flex items-center justify-between text-xs">
                <span className="font-medium text-charcoal">{article.author.name}</span>
                <Link
                  href={`/bai-viet/${article.slug}`}
                  className="font-semibold text-agarwood-dark group-hover:text-forest transition-colors flex items-center gap-1"
                >
                  Đọc bài viết
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
