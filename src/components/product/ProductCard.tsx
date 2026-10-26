"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { BellRing, Check, ShoppingBag } from "lucide-react";
import { ProductSummary } from "@/types/product";
import { formatVND } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { useMessages } from "@/i18n/client";
import { productMessages } from "@/i18n/messages/product";
import { AgarwoodChips, SinksBadge } from "./AgarwoodChips";

export function ProductCard({
  product,
  eager = false,
}: {
  product: ProductSummary;
  /** Load immediately (cards in the first visible row). */
  eager?: boolean;
}) {
  const [justAdded, setJustAdded] = useState(false);
  const t = useMessages(productMessages);

  const addItem = useCartStore((state) => state.addItem);

  const defaultVariant = product.variants[0];
  const price = defaultVariant ? defaultVariant.price : product.price;
  const compareAtPrice = defaultVariant
    ? defaultVariant.compareAtPrice
    : product.compareAtPrice;
  const isOutOfStock = product.inventoryStatus === "out_of_stock";
  const href = `/san-pham/${product.slug}`;

  const handleQuickAdd = () => {
    addItem(product, defaultVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const primaryImage = product.images[0] || "/images/hero-agarwood.jpg";
  const hoverImage = product.images[1] || primaryImage;

  return (
    <article className="group relative flex flex-col h-full">
      <div className="relative aspect-square w-full bg-ivory overflow-hidden rounded-xl">
        {/* Gentle zoom on hover; both stacked images scale together so the crossfade stays aligned */}
        <Link
          href={href}
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
              alt={t.altAngle(product.name)}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100"
            />
          )}
        </Link>
        {product.agarwoodProfile.sinksInWater && (
          <SinksBadge className="absolute left-2.5 top-2.5" />
        )}
      </div>

      <div className="pt-3.5 flex-1 flex flex-col">
        {(product.bestseller || isOutOfStock) && (
          <p
            className={`text-xs font-medium mb-1 ${isOutOfStock ? "text-muted" : "text-gold-dark"}`}
          >
            {isOutOfStock ? t.outOfStock : t.bestseller}
          </p>
        )}
        <h3 className="text-[15px] font-medium text-charcoal leading-snug line-clamp-2">
          <Link href={href} className="hover:text-agarwood transition-colors">
            {product.name}
          </Link>
        </h3>
        <AgarwoodChips profile={product.agarwoodProfile} className="mt-2" />
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-[15px] font-semibold text-agarwood">
          <span>{formatVND(price)}</span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm font-normal text-muted-light line-through">
              {formatVND(compareAtPrice)}
            </span>
          )}
        </p>

        {/* mt-auto pins the actions to the bottom so buttons line up across a row */}
        <div className="mt-auto pt-3 flex gap-2">
          <Link
            href={href}
            className="flex-1 min-w-0 h-11 inline-flex items-center justify-center rounded-full bg-espresso px-3 text-[13px] sm:text-sm font-medium text-white hover:bg-espresso-light transition-colors"
          >
            {t.viewDetails}
          </Link>
          {isOutOfStock ? (
            <Link
              href={`${href}#bao-khi-co-hang`}
              className="w-11 h-11 shrink-0 rounded-full border border-gold/50 text-agarwood flex items-center justify-center hover:bg-ivory transition-colors"
              aria-label={t.notifyMeLabel(product.name)}
              title={t.notifyMe}
            >
              <BellRing className="w-4.5 h-4.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="w-11 h-11 shrink-0 rounded-full border border-gold/50 text-agarwood flex items-center justify-center hover:bg-ivory transition-colors cursor-pointer"
              aria-label={t.addToCartLabel(product.name)}
              title={t.addToCart}
            >
              {justAdded ? (
                <Check className="w-4.5 h-4.5" />
              ) : (
                <ShoppingBag className="w-4.5 h-4.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
