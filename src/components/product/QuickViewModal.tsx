"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Product, ProductVariant } from "@/types/product";
import { formatVND } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import { Button } from "@/components/ui/Button";

function QuickViewModalContent({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const price = selectedVariant ? selectedVariant.price : product.price;
  const compareAtPrice = selectedVariant
    ? selectedVariant.compareAtPrice
    : product.compareAtPrice;
  const isOutOfStock = selectedVariant?.inventoryStatus === "out_of_stock";

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    // addItem opens the cart drawer, which confirms the add.
    addItem(product, selectedVariant, 1);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: MOTION_EASE }}
      className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-charcoal hover:bg-ivory transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2"
        aria-label="Đóng xem nhanh"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-4 md:p-6">
          <div className="relative aspect-square w-full overflow-hidden bg-ivory">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Xem ảnh ${idx + 1}`}
                  aria-current={activeImageIndex === idx}
                  className={`relative w-16 h-16 overflow-hidden bg-ivory transition-opacity duration-300 cursor-pointer ${
                    activeImageIndex === idx
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  {activeImageIndex === idx && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-espresso" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 md:pl-2 flex flex-col">
          {product.bestseller && (
            <p className="text-[15px] font-medium text-gold-dark mb-1">
              Bán chạy
            </p>
          )}
          <h2
            id="quick-view-title"
            className="pr-10 text-2xl font-medium text-charcoal leading-tight"
          >
            {product.name}
          </h2>
          <p className="mt-1 text-[15px] text-muted">{product.categoryName}</p>

          <p className="mt-5 text-xl font-medium text-charcoal">
            {formatVND(price)}
            {compareAtPrice && compareAtPrice > price && (
              <span className="ml-3 text-base font-normal text-muted-light line-through">
                {formatVND(compareAtPrice)}
              </span>
            )}
          </p>

          <p className="mt-4 text-[15px] text-charcoal/80 leading-relaxed line-clamp-3">
            {product.shortDescription}
          </p>

          {product.variants.length > 1 && (
            <div className="mt-6">
              <p className="text-[15px] font-medium text-charcoal mb-3">
                Chọn quy cách
              </p>
              <div className="space-y-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  const soldOut = v.inventoryStatus === "out_of_stock";
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      disabled={soldOut}
                      aria-pressed={isSelected}
                      className={`w-full px-4 py-3 rounded-md border text-left text-[15px] transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:text-muted-light ${
                        isSelected
                          ? "border-charcoal ring-1 ring-charcoal"
                          : "border-border-subtle hover:border-charcoal/40"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-charcoal">{v.name}</span>
                        <span className="text-muted shrink-0">
                          {soldOut ? "Hết hàng" : formatVND(v.price)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              size="lg"
              className="w-full"
            >
              {isOutOfStock ? "Tạm hết hàng" : "Thêm vào giỏ hàng"}
            </Button>
            <Link
              href={`/san-pham/${product.slug}`}
              onClick={onClose}
              className="block text-center text-[15px] text-charcoal underline underline-offset-4 hover:text-gold-dark transition-colors"
            >
              Xem chi tiết sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
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
  // Keep the latest close handler without re-running the open/close effect each render.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-espresso-dark/40"
            onClick={onClose}
          />
          <QuickViewModalContent
            key={product.id}
            product={product}
            onClose={onClose}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
