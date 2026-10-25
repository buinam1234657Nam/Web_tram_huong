"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { formatArticleDate } from "./formatArticleDate";

const ALL = "Tất cả";

export function ArticlesView({
  initialArticles,
}: {
  initialArticles: Article[];
}) {
  const [activeCategory, setActiveCategory] = useState(ALL);

  // Tabs come from the data so a new category shows up without code changes.
  const categories = useMemo(
    () => [ALL, ...new Set(initialArticles.map((a) => a.category))],
    [initialArticles],
  );

  const articles = useMemo(
    () =>
      activeCategory === ALL
        ? initialArticles
        : initialArticles.filter((a) => a.category === activeCategory),
    [initialArticles, activeCategory],
  );

  const [featured, ...rest] = articles;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Chuyên mục"
        className="flex gap-6 overflow-x-auto no-scrollbar border-b border-border-subtle -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={`relative shrink-0 py-3 text-[15px] transition-colors duration-300 cursor-pointer ${
                isActive
                  ? "text-charcoal font-medium"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              {category}
              <span
                className={`absolute inset-x-0 -bottom-px h-px bg-espresso transition-transform duration-300 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {featured && (
        <FadeIn key={`featured-${activeCategory}`} className="mt-10">
          <Link
            href={`/bai-viet/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7 relative aspect-16/10 bg-ivory overflow-hidden">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm text-muted">
                {featured.category} · {featured.readingTimeMinutes} phút đọc
              </p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-semibold text-charcoal leading-[1.2] tracking-tight group-hover:text-gold-dark transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15px] sm:text-base text-muted leading-relaxed">
                {featured.excerpt}
              </p>
              <p className="mt-5 text-sm text-muted">
                {featured.author.name} ·{" "}
                {formatArticleDate(featured.publishedAt)}
              </p>
            </div>
          </Link>
        </FadeIn>
      )}

      {rest.length > 0 && (
        <FadeIn
          key={`grid-${activeCategory}`}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12"
        >
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/bai-viet/${article.slug}`}
              className="group block"
            >
              <div className="relative aspect-16/10 bg-ivory overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-4 text-sm text-muted">
                {article.category} · {article.readingTimeMinutes} phút đọc
              </p>
              <h3 className="mt-1 text-xl font-medium text-charcoal leading-snug group-hover:text-gold-dark transition-colors duration-300">
                {article.title}
              </h3>
              <p className="mt-2 text-[15px] text-muted leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </FadeIn>
      )}

      {articles.length === 0 && (
        <p className="py-24 text-center text-muted">
          Chưa có bài viết trong chuyên mục này.
        </p>
      )}
    </div>
  );
}
