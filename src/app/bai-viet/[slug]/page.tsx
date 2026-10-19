import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await catalogRepository.getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await catalogRepository.getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: `${article.title} | VĨNH TRẦM`,
    description: article.excerpt,
    alternates: {
      canonical: `/bai-viet/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://vinhtram.vn/bai-viet/${article.slug}`,
      images: [{ url: article.coverImage, alt: article.title }],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await catalogRepository.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await catalogRepository.getArticles();
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  const breadcrumbs = [
    { label: "Kiến thức trầm", href: "/bai-viet" },
    { label: article.title, href: `/bai-viet/${article.slug}` },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Article Header */}
      <div className="space-y-4">
        <span className="text-xs uppercase font-semibold text-agarwood tracking-widest block">
          {article.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-2 pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-forest" />
            <span className="font-semibold text-charcoal">{article.author.name}</span>
            <span className="text-stone-400">({article.author.role})</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-forest" />
            <span>{article.publishedAt}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-forest" />
            <span>{article.readingTimeMinutes} phút đọc</span>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="relative aspect-16/9 w-full rounded-sm overflow-hidden bg-ivory border border-border-subtle shadow-xs">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-stone max-w-none text-charcoal/90 leading-relaxed font-light space-y-5 text-sm sm:text-base whitespace-pre-line">
        {article.content}
      </div>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="pt-6 border-t border-border-subtle flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-muted" />
          <span className="text-xs text-muted">Chủ đề:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white border border-border-subtle text-charcoal"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Brand CTA Box */}
      <div className="bg-forest-dark text-ivory p-6 sm:p-8 rounded-sm border border-forest flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-ivory mb-1">
            Trải Nghiệm Trầm Hương Tự Nhiên Thật
          </h3>
          <p className="text-xs text-ivory/80 max-w-md">
            Mỗi tác phẩm VĨNH TRẦM đều được bảo hành dây và hạt trọn đời. Đặt hàng để nhận kiện hàng đồng kiểm tận nơi.
          </p>
        </div>
        <Button variant="champagne" size="md">
          <Link href="/san-pham">Xem Bộ Sưu Tập</Link>
        </Button>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 border-t border-border-subtle space-y-4">
          <h3 className="font-serif text-xl font-bold text-charcoal">
            Bài Viết Cùng Chuyên Mục
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/bai-viet/${rel.slug}`}
                className="p-4 bg-white border border-border-subtle rounded hover:border-champagne transition-colors flex gap-4 items-center group"
              >
                <div className="relative w-16 h-16 rounded overflow-hidden bg-ivory shrink-0">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-charcoal group-hover:text-forest transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-muted mt-1">{rel.publishedAt}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-forest group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4">
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh mục kiến thức</span>
        </Link>
      </div>
    </article>
  );
}
