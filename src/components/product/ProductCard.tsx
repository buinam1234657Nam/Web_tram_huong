"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatVND, calculateDiscountPercentage } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { StarRating } from "@/components/ui/StarRating";
import { StockBadge } from "@/components/ui/Badge";
import { QuickViewModal } from "./QuickViewModal";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const defaultVariant = product.variants[0];
  const price = defaultVariant ? defaultVariant.price : product.price;
  const compareAtPrice = defaultVariant
    ? defaultVariant.compareAtPrice
    : product.compareAtPrice;
  const discount = calculateDiscountPercentage(price, compareAtPrice);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const primaryImage = product.images[0] || "/images/hero-agarwood.jpg";
  const hoverImage = product.images[1] || primaryImage;

  return (
    <>
      <article
        className="group relative bg-white border border-[#E3DCCF] rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-400 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-[#C5A46D]/60"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.bestseller && (
            <span className="text-[10px] uppercase font-bold tracking-wider bg-[#28392F] text-[#F5F5F7] px-2.5 py-0.5 rounded-xs shadow-md border border-[#374E40]">
              Bán chạy
            </span>
          )}
          {discount && (
            <span className="text-[10px] font-bold bg-[#966B45] text-white px-2 py-0.5 rounded-xs shadow-md animate-shimmer">
              -{discount}%
            </span>
          )}
        </div>

        {/* Image Container with 1:1 Aspect Ratio, Warm Ivory Background */}
        <div className="relative aspect-square w-full bg-[#FAF8F4] overflow-hidden cursor-pointer">
          <Link href={`/san-pham/${product.slug}`} className="block w-full h-full">
            <Image
              src={isHovered && hoverImage !== primaryImage ? hoverImage : primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </Link>

          {/* Quick Action Overlay Buttons */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 py-2 px-3 text-xs font-semibold bg-[#FAF8F4]/95 text-[#1C2520] hover:bg-[#28392F] hover:text-[#F5F5F7] backdrop-blur-xs rounded-xs shadow-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              aria-label={`Xem nhanh ${product.name}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem nhanh</span>
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={product.inventoryStatus === "out_of_stock"}
              className={`p-2.5 rounded-xs shadow-lg backdrop-blur-xs transition-all duration-200 flex items-center justify-center cursor-pointer ${
                justAdded
                  ? "bg-emerald-700 text-white scale-105"
                  : "bg-[#28392F] text-[#F5F5F7] hover:bg-[#1A2520] hover:text-[#C5A46D] hover:scale-105"
              }`}
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              {justAdded ? (
                <Check className="w-4 h-4 animate-in zoom-in" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between text-[11px] text-muted mb-1.5">
              <span className="font-medium tracking-wide uppercase text-[10px] text-agarwood-dark">{product.categoryName}</span>
              <StockBadge status={product.inventoryStatus} />
            </div>

            <h3 className="font-serif text-[17px] sm:text-lg font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-2 min-h-[46px] leading-snug tracking-tight">
              <Link href={`/san-pham/${product.slug}`}>{product.name}</Link>
            </h3>

            <div className="mt-1.5 mb-2.5">
              <StarRating
                rating={product.ratingAverage}
                count={product.ratingCount}
                size="sm"
              />
            </div>
          </div>

          <div className="pt-2.5 border-t border-border-subtle/50 flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-sans text-base sm:text-lg font-bold text-forest tracking-tight">
                {formatVND(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xs text-stone-400 line-through">
                  {formatVND(compareAtPrice)}
                </span>
              )}
            </div>

            {product.variants.length > 1 && (
              <span className="text-[10px] text-muted font-medium bg-ivory px-2 py-0.5 rounded-xs border border-border-subtle shrink-0">
                {product.variants.length} quy cách
              </span>
            )}
          </div>
        </div>
      </article>

      {/* Accessible Quick View Dialog */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
