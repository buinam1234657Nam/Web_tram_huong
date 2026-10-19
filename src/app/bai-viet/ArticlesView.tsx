"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Article } from "@/types/article";

interface ArticlesViewProps {
  initialArticles: Article[];
}

function formatVietnameseDate(dateStr: string) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day} Tháng ${month}, ${year}`;
  }
  return dateStr;
}

const CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "phan-biet", label: "Phân biệt trầm", match: ["Kiến thức Trầm", "phân biệt"] },
  { id: "thuong-tram", label: "Thưởng trầm", match: ["Nghệ thuật Thưởng trầm", "thưởng trầm"] },
  { id: "phong-thuy", label: "Phong thủy", match: ["Phong thủy & Tinh thần", "phong thủy"] },
];

export function ArticlesView({ initialArticles }: ArticlesViewProps) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredArticles = useMemo(() => {
    if (activeTab === "all") return initialArticles;
    const cat = CATEGORIES.find((c) => c.id === activeTab);
    if (!cat || !cat.match) return initialArticles;

    return initialArticles.filter((art) =>
      cat.match.some((m) =>
        art.category.toLowerCase().includes(m.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(m.toLowerCase()))
      )
    );
  }, [initialArticles, activeTab]);

  const featuredArticle = filteredArticles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="space-y-10">
      {/* Category Filter Pills with Sliding Animated Indicator */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-border-subtle/70">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-4 py-2 rounded-xs text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                isActive
                  ? "text-ivory"
                  : "text-stone-600 hover:text-charcoal hover:bg-stone-100"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeBlogTab"
                  className="absolute inset-0 bg-forest rounded-xs shadow-xs"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-sm border border-border-subtle">
          <BookOpen className="w-8 h-8 text-champagne mx-auto mb-2" />
          <p className="font-serif text-base text-charcoal">
            Chưa có bài viết cho chuyên mục này
          </p>
          <button
            onClick={() => setActiveTab("all")}
            className="mt-3 text-xs px-4 py-2 bg-forest text-ivory rounded font-semibold cursor-pointer"
          >
            Xem tất cả bài viết
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* FEATURED HERO POST (7 Cols Image + 5 Cols Content) */}
            {featuredArticle && (
              <article className="group bg-white rounded-sm border border-[#E8DFD1] hover:border-champagne hover:shadow-2xl transition-all duration-400 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Left 7 Columns: Hero Image */}
                  <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] bg-forest-dark overflow-hidden">
                    <Image
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest bg-forest/90 backdrop-blur-xs text-ivory px-3 py-1 rounded-xs border border-forest-light shadow-md">
                        {featuredArticle.category}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-widest bg-champagne text-charcoal px-2.5 py-1 rounded-xs shadow-md">
                        Tiêu điểm
                      </span>
                    </div>
                  </div>

                  {/* Right 5 Columns: Editorial Content */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white space-y-6">
                    <div className="space-y-4">
                      {/* Meta stats */}
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1 font-medium text-stone-600">
                          <Clock className="w-3.5 h-3.5 text-champagne-dark" />
                          {featuredArticle.readingTimeMinutes} phút đọc
                        </span>
                        <span>•</span>
                        <span className="text-stone-500">
                          {formatVietnameseDate(featuredArticle.publishedAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal group-hover:text-forest transition-colors leading-snug">
                        <Link href={`/bai-viet/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-stone-600 leading-relaxed font-light line-clamp-4">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    {/* Author & Read Action */}
                    <div className="pt-6 border-t border-border-subtle/70 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-charcoal">
                          {featuredArticle.author.name}
                        </p>
                        <p className="text-[11px] text-muted font-light">
                          {featuredArticle.author.role}
                        </p>
                      </div>

                      <Link
                        href={`/bai-viet/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-ivory rounded-xs text-xs font-semibold hover:bg-forest-dark hover:text-champagne transition-colors group/btn shadow-xs"
                      >
                        <span>Đọc chuyên sâu</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* REGULAR ARTICLES GRID */}
            {regularArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group bg-white border border-[#E8DFD1] hover:border-champagne/80 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative aspect-16/10 w-full bg-[#FAF8F4] overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider bg-forest/90 text-ivory px-2.5 py-0.5 rounded-xs shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2.5 text-[11px] text-muted mb-2">
                          <span className="flex items-center gap-1 text-stone-600 font-medium">
                            <Clock className="w-3 h-3 text-champagne-dark" />
                            {article.readingTimeMinutes} phút đọc
                          </span>
                          <span>•</span>
                          <span>{formatVietnameseDate(article.publishedAt)}</span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-2 mb-2 leading-snug">
                          <Link href={`/bai-viet/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-stone-600 leading-relaxed font-light line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border-subtle/60 flex items-center justify-between text-xs">
                        <span className="font-medium text-charcoal">
                          {article.author.name}
                        </span>
                        <Link
                          href={`/bai-viet/${article.slug}`}
                          className="font-semibold text-agarwood-dark group-hover:text-forest transition-colors inline-flex items-center gap-1 group/arrow"
                        >
                          <span>Khám phá</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/arrow:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
