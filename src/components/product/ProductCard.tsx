"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatVND } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { QuickViewModal } from "./QuickViewModal";

export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  /** Load immediately (cards in the first visible row). */
  eager?: boolean;
}) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const defaultVariant = product.variants[0];
  const price = defaultVariant ? defaultVariant.price : product.price;
  const compareAtPrice = defaultVariant
    ? defaultVariant.compareAtPrice
    : product.compareAtPrice;
  const isOutOfStock = product.inventoryStatus === "out_of_stock";

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
      <article className="group relative flex flex-col h-full">
        <div className="relative aspect-square w-full bg-ivory overflow-hidden">
          {/* Gentle zoom on hover; both stacked images scale together so the crossfade stays aligned */}
          <Link
            href={`/san-pham/${product.slug}`}
            className="block w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          >
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={eager ? "eager" : "lazy"}
              className={`object-cover transition-opacity duration-700 ease-out ${
                hoverImage !== primaryImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {hoverImage !== primaryImage && (
              <Image
                src={hoverImage}
                alt={`${product.name} - góc chụp khác`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100"
              />
            )}
          </Link>

          <div className="absolute inset-x-3 bottom-3 hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-500 ease-out">
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 h-10 rounded-full bg-white/95 text-xs font-medium text-charcoal hover:bg-white cursor-pointer"
              aria-label={`Xem nhanh ${product.name}`}
            >
              Xem nhanh
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="w-10 h-10 rounded-full bg-espresso text-white flex items-center justify-center hover:bg-espresso-light disabled:opacity-50 cursor-pointer"
              aria-label={`Thêm ${product.name} vào giỏ hàng`}
            >
              {justAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-4 flex-1 flex flex-col">
          {product.bestseller && (
            <p className="text-xs font-medium text-gold-dark mb-1">Bán chạy</p>
          )}
          {isOutOfStock && (
            <p className="text-xs font-medium text-muted mb-1">Tạm hết hàng</p>
          )}
          <h3 className="text-[15px] font-medium text-charcoal leading-snug line-clamp-2">
            <Link
              href={`/san-pham/${product.slug}`}
              className="hover:text-gold-dark transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">
            {product.categoryName}
            {product.variants.length > 1 &&
              ` · ${product.variants.length} quy cách`}
          </p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[15px] font-medium text-charcoal">
            <span>{formatVND(price)}</span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="text-sm font-normal text-muted-light line-through">
                {formatVND(compareAtPrice)}
              </span>
            )}
          </p>
        </div>
      </article>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
