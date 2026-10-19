"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  Check,
  RotateCcw,
  Plus,
  Minus,
  Award,
} from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { Review } from "@/types/review";
import { formatVND, calculateDiscountPercentage } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { StarRating } from "@/components/ui/StarRating";
import { StockBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";

export function ProductDetailView({
  product,
  relatedProducts,
  reviews,
}: {
  product: Product;
  relatedProducts: Product[];
  reviews: Review[];
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const price = selectedVariant.price;
  const compareAtPrice = selectedVariant.compareAtPrice;
  const discount = calculateDiscountPercentage(price, compareAtPrice);
  const maxQty = selectedVariant.inventoryQuantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-16">
      {/* Top Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white border border-border-subtle shadow-xs">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-500 ease-out"
            />
            {discount && (
              <span className="absolute top-4 left-4 text-xs font-bold bg-agarwood text-white px-2.5 py-1 rounded-xs shadow-md">
                Tiết kiệm {discount}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-forest shadow-xs"
                      : "border-border-subtle opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Ảnh ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buy Box & Options */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-agarwood-dark">
                {product.categoryName}
              </span>
              <StockBadge status={selectedVariant.inventoryStatus} />
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
              {product.name}
            </h1>

            <div className="flex items-center gap-3">
              <StarRating
                rating={product.ratingAverage}
                count={product.ratingCount}
                size="md"
              />
              <span className="text-xs text-muted">|</span>
              <span className="text-xs text-muted">
                Mã SP: <strong className="text-charcoal">{selectedVariant.sku}</strong>
              </span>
            </div>

            {/* Price Row */}
            <div className="p-4 bg-white border border-border-subtle rounded-sm flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-forest">
                {formatVND(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-sm text-stone-400 line-through">
                  {formatVND(compareAtPrice)}
                </span>
              )}
              {discount && (
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Giảm {discount}%
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
              {product.shortDescription}
            </p>

            {/* Scent Profile Highlights */}
            <div className="bg-ivory-dark/40 p-4 rounded-sm border border-border-subtle text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-champagne-dark shrink-0" />
                <span>
                  <strong>Độ tỏa hương:</strong> {product.scentProfile.intensity}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-forest">
                  •
                </span>
                <span>
                  <strong>Tầng hương chính:</strong> {product.scentProfile.notes.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-forest">
                  •
                </span>
                <span>
                  <strong>Độ lưu hương:</strong> {product.scentProfile.longevity}
                </span>
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider">
                  Quy cách / Kích cỡ tuyển chọn:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setSelectedVariant(v);
                          setQuantity(1);
                        }}
                        className={`p-3 rounded-xs border text-xs text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-forest bg-forest/5 font-semibold text-forest shadow-xs"
                            : "border-border-subtle bg-white text-charcoal hover:border-stone-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            {isSelected && <Check className="w-3 h-3 text-forest" />}
                            {v.name}
                          </span>
                        </div>
                        <span className="block mt-1 text-stone-600 font-medium">
                          {formatVND(v.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                  Số lượng:
                </span>
                <div className="flex items-center border border-border-subtle rounded-sm bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                    aria-label="Giảm số lượng"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                    disabled={quantity >= maxQty}
                    className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
                    aria-label="Tăng số lượng"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs text-muted">
                  (Còn {maxQty} sản phẩm sẵn có)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  disabled={selectedVariant.inventoryStatus === "out_of_stock"}
                  leftIcon={
                    isAdded ? (
                      <Check className="w-5 h-5 text-emerald-300" />
                    ) : (
                      <ShoppingBag className="w-5 h-5" />
                    )
                  }
                >
                  {isAdded ? "Đã Thêm Vào Giỏ!" : "Thêm Vào Giỏ Hàng"}
                </Button>
              </div>
            </div>
          </div>

          {/* Genuine Guarantees */}
          <div className="pt-4 border-t border-border-subtle grid grid-cols-2 gap-3 text-xs text-charcoal">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-forest shrink-0" />
              <span>Miễn phí giao hàng từ 1 triệu</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
              <span>Đồng kiểm trước khi trả tiền</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-forest shrink-0" />
              <span>Bảo hành đánh bóng trọn đời</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-forest shrink-0" />
              <span>Đổi trả 7 ngày nếu lỗi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Reviews */}
      <div className="bg-white border border-border-subtle rounded-sm overflow-hidden">
        <div className="flex border-b border-border-subtle bg-ivory">
          <button
            type="button"
            onClick={() => setActiveTab("desc")}
            className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === "desc"
                ? "border-forest text-forest bg-white"
                : "border-transparent text-stone-500 hover:text-charcoal"
            }`}
          >
            Mô Tả Chi Tiết
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === "specs"
                ? "border-forest text-forest bg-white"
                : "border-transparent text-stone-500 hover:text-charcoal"
            }`}
          >
            Thông Số & Xuất Xứ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
              activeTab === "reviews"
                ? "border-forest text-forest bg-white"
                : "border-transparent text-stone-500 hover:text-charcoal"
            }`}
          >
            Đánh Giá Thực Tế ({reviews.length})
          </button>
        </div>

        <div className="p-6 sm:p-10">
          {activeTab === "desc" && (
            <div className="max-w-3xl space-y-4 text-sm text-charcoal/90 leading-relaxed font-light whitespace-pre-line">
              {product.description}
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-border-subtle text-xs sm:text-sm">
                <div className="py-3 flex justify-between">
                  <dt className="text-muted font-medium">Xuất xứ phôi trầm</dt>
                  <dd className="font-semibold text-charcoal text-right">{product.origin}</dd>
                </div>
                <div className="py-3 flex justify-between">
                  <dt className="text-muted font-medium">Phương thức thu hái</dt>
                  <dd className="font-semibold text-charcoal text-right">{product.harvestMethod}</dd>
                </div>
                {product.specifications.map((spec, i) => (
                  <div key={i} className="py-3 flex justify-between">
                    <dt className="text-muted font-medium">{spec.label}</dt>
                    <dd className="font-semibold text-charcoal text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-charcoal">
                    Đánh giá từ khách hàng đã trải nghiệm
                  </h3>
                  <p className="text-xs text-muted">
                    Minh bạch 100%, chỉ hiển thị phản hồi từ đơn hàng đã giao dịch thực tế.
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl font-bold text-forest">{product.ratingAverage}</p>
                  <StarRating rating={product.ratingAverage} showScore={false} size="sm" />
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4 divide-y divide-border-subtle">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="pt-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-charcoal">{rev.authorName}</span>
                          <span className="text-muted">• {rev.authorLocation}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              Đã mua
                            </span>
                          )}
                        </div>
                        <span className="text-stone-400">{rev.date}</span>
                      </div>

                      <StarRating rating={rev.rating} showScore={false} size="sm" />

                      <p className="font-semibold text-charcoal">{rev.title}</p>
                      <p className="text-muted leading-relaxed">{rev.content}</p>
                      {rev.variantPurchased && (
                        <p className="text-[11px] text-stone-500 italic">
                          Quy cách đã chọn: {rev.variantPurchased}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted py-4">Chưa có đánh giá nào cho sản phẩm này.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-charcoal">
              Tác Phẩm Cùng Bộ Sưu Tập
            </h2>
          </div>
          <ProductGrid products={relatedProducts} columns={3} />
        </div>
      )}
    </div>
  );
}
