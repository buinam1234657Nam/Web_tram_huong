"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ShoppingBag, ArrowRight } from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { formatVND, calculateDiscountPercentage } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { StockBadge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";

function QuickViewModalContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const currentVariant = selectedVariant || product.variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const compareAtPrice = currentVariant
    ? currentVariant.compareAtPrice
    : product.compareAtPrice;
  const discountPercent = calculateDiscountPercentage(price, compareAtPrice);

  const handleAddToCart = () => {
    if (currentVariant) {
      addItem(product, currentVariant, quantity);
      onClose();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden border border-border-subtle my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-charcoal bg-white/80 rounded-full transition-colors cursor-pointer"
          aria-label="Đóng cửa sổ xem nhanh"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Image */}
          <div className="bg-ivory p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border-subtle">
            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white border border-border-subtle mb-4">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-all duration-300"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-forest"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details & Variant Chooser */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-muted font-medium">
                  {product.categoryName}
                </span>
                <StockBadge status={currentVariant.inventoryStatus} />
              </div>

              <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal mb-2">
                {product.name}
              </h3>

              <div className="mb-4">
                <StarRating
                  rating={product.ratingAverage}
                  count={product.ratingCount}
                />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl font-bold text-forest">
                  {formatVND(price)}
                </span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatVND(compareAtPrice)}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-semibold text-agarwood-dark bg-agarwood/10 px-2 py-0.5 rounded">
                    Tiết kiệm {discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-xs text-charcoal/80 leading-relaxed mb-6 line-clamp-3">
                {product.shortDescription}
              </p>

              {/* Variants */}
              {product.variants.length > 1 && (
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
                    Chọn quy cách / kích cỡ:
                  </label>
                  <div className="space-y-2">
                    {product.variants.map((v) => {
                      const isSelected = currentVariant.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`w-full text-left p-3 rounded text-xs flex items-center justify-between border transition-all cursor-pointer ${
                            isSelected
                              ? "border-forest bg-forest/5 font-semibold text-forest"
                              : "border-border-subtle hover:border-stone-400 text-charcoal"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-forest" />
                            )}
                            {v.name}
                          </span>
                          <span className="font-medium text-stone-600">
                            {formatVND(v.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-border-subtle space-y-3">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="md"
                className="w-full"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Thêm Vào Giỏ Hàng
              </Button>

              <div className="text-center">
                <Link
                  href={`/san-pham/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
                >
                  Xem chi tiết đầy đủ sản phẩm
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuickViewModal({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <QuickViewModalContent key={product.id} product={product} onClose={onClose} />
    </div>
  );
}
