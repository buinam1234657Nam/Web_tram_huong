import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { MarkdownContent } from "../MarkdownContent";
import { formatArticleDate } from "../formatArticleDate";

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
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/bai-viet/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/bai-viet/${article.slug}`,
      images: [{ url: article.coverImage, alt: article.title }],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

// Non-async page: the URL-dependent part streams inside Suspense so the
// route's shared shell stays instant (Next 16 partial prefetching).
export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleDetail params={params} />
    </Suspense>
  );
}

async function ArticleDetail({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await catalogRepository.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await catalogRepository.getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const breadcrumbs = [
    { label: "Tin tức", href: "/bai-viet" },
    { label: article.title, href: `/bai-viet/${article.slug}` },
  ];

  return (
    <div className="pb-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <ArticleJsonLd article={article} />
        <BreadcrumbJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-10 sm:mt-14">
          <p className="text-sm font-medium text-gold-dark">
            {article.category}
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-charcoal leading-[1.15] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-5 text-lg text-muted leading-relaxed">
            {article.excerpt}
          </p>
          <p className="mt-6 text-sm text-muted">
            <span className="font-medium text-charcoal">
              {article.author.name}
            </span>
            {" · "}
            {formatArticleDate(article.publishedAt)}
            {" · "}
            {article.readingTimeMinutes} phút đọc
          </p>
        </header>
      </article>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
        <div className="relative aspect-video w-full bg-ivory overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12">
        <MarkdownContent>{article.content}</MarkdownContent>

        {article.tags.length > 0 && (
          <p className="mt-12 pt-6 border-t border-border-subtle text-sm text-muted">
            Chủ đề: {article.tags.join(" · ")}
          </p>
        )}

        <Link
          href="/bai-viet"
          className="mt-6 inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Tất cả bài viết
        </Link>
      </div>

      {/* Product nudge, styled like the homepage showroom band */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-ivory px-6 py-12 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal">
            Trải nghiệm trầm hương tự nhiên
          </h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Bảo hành dây và đánh bóng trọn đời. Được mở hộp kiểm tra trước khi
            thanh toán.
          </p>
          <div className="mt-7">
            <Button href="/san-pham">Xem sản phẩm</Button>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-charcoal">
              Đọc tiếp
            </h2>
            <Link
              href="/bai-viet"
              className="inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
            >
              Tất cả bài viết
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-10">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/bai-viet/${rel.slug}`}
                className="group block"
              >
                <div className="relative aspect-16/10 bg-ivory overflow-hidden">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-4 text-sm text-muted">
                  {rel.category} · {rel.readingTimeMinutes} phút đọc
                </p>
                <h3 className="mt-1 text-lg font-medium text-charcoal leading-snug group-hover:text-gold-dark transition-colors duration-300">
                  {rel.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-24 animate-pulse">
      <div className="h-4 w-48 bg-ivory" />
      <div className="mt-14 h-4 w-28 bg-ivory" />
      <div className="mt-4 h-10 w-full bg-ivory" />
      <div className="mt-3 h-10 w-2/3 bg-ivory" />
      <div className="mt-10 aspect-video w-full bg-ivory" />
    </div>
  );
}
