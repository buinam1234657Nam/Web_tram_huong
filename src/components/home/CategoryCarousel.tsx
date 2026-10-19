"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Category } from "@/types/category";

export function CategoryCarousel({ categories }: { categories: Category[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block mb-1">
            Danh Mục Chế Tác
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Khám Phá Theo Chủng Loại Trầm
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-border-subtle bg-white text-charcoal hover:bg-forest hover:text-ivory hover:border-forest flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-border-subtle bg-white text-charcoal hover:bg-forest hover:text-ivory hover:border-forest flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cuộn sang phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/danh-muc/${cat.slug}`}
            className="group flex-none w-[260px] sm:w-[290px] snap-start bg-white rounded-xs overflow-hidden border border-border-subtle hover:border-champagne transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 w-full bg-ivory overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="290px"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-charcoal group-hover:bg-forest group-hover:text-ivory transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-base font-semibold text-charcoal group-hover:text-forest transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <p className="text-[11px] font-semibold text-agarwood mt-3 pt-2 border-t border-border-subtle/50">
                {cat.productCount} sản phẩm sẵn có
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
