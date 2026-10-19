"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { Category } from "@/types/category";

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block">
              Danh Mục Chế Tác
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Khám Phá Theo Chủng Loại Trầm
          </h2>
        </div>

        <Link
          href="/san-pham"
          className="text-xs font-semibold text-forest hover:text-champagne-dark transition-colors inline-flex items-center gap-1.5 group"
        >
          <span>Xem tất cả danh mục & sản phẩm</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Luxury 6-Card Category Showcase Grid (Zero Scroll-Trapping, Fully Fluid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/danh-muc/${cat.slug}`}
            className="group relative rounded-xl overflow-hidden bg-forest-dark border border-[#E3DCCF] hover:border-champagne transition-all duration-500 hover:shadow-2xl flex flex-col justify-between aspect-[16/11] sm:aspect-[4/3] lg:aspect-[16/11]"
          >
            {/* Background Image with Zoom on Hover */}
            <Image
              src={cat.image}
              alt={`Danh mục ${cat.name} tự nhiên VĨNH TRẦM`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={idx < 3}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Editorial Multi-Stop Gradient Mask for High Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/45 to-transparent transition-opacity group-hover:opacity-90" />

            {/* Top Bar on Card: Product Count Pill & Action Button */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-ivory/95 bg-forest-dark/85 backdrop-blur-md px-3 py-1 rounded-full border border-forest-light/60 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                {cat.productCount} tác phẩm
              </span>

              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-ivory flex items-center justify-center group-hover:bg-champagne group-hover:text-charcoal group-hover:scale-110 transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            {/* Bottom Content: Title, Poetic Excerpt & Explore CTA */}
            <div className="relative z-10 p-5 sm:p-6 space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-champagne transition-colors leading-snug">
                {cat.name}
              </h3>
              <p className="text-xs text-ivory/80 line-clamp-2 leading-relaxed font-light">
                {cat.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-champagne">
                <span>Khám phá bộ sưu tập</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
