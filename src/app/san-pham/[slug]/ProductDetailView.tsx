"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  Ruler,
  X,
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Zoom on Hover Coordinates
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);

  const price = selectedVariant.price;
  const compareAtPrice = selectedVariant.compareAtPrice;
  const discount = calculateDiscountPercentage(price, compareAtPrice);
  const maxQty = selectedVariant.inventoryQuantity;

  // Track scroll position to show Sticky Bottom Add-to-Cart Bar
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowStickyBar((prev) => {
            const next = window.scrollY > 450;
            return prev !== next ? next : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, quantity);
    router.push("/thanh-toan");
  };

  return (
    <div className="space-y-16">
      {/* Top Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Gallery with Smooth Crossfade & Coordinate Zoom */}
        <div className="space-y-4 lg:sticky lg:top-28">
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#FAF8F4] border border-[#E8DFD1] shadow-xs cursor-crosshair group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`Tác phẩm trầm hương tự nhiên ${product.name} - góc chụp ${activeImageIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isHovered ? "scale(1.75)" : "scale(1)",
                  }}
                  className="object-cover transition-transform duration-200 ease-out will-change-transform"
                />
              </motion.div>
            </AnimatePresence>

            {discount && (
              <span className="absolute top-4 left-4 text-xs font-bold bg-agarwood text-white px-2.5 py-1 rounded-xs shadow-md z-10">
                Tiết kiệm {discount}%
              </span>
            )}

            <div className="absolute bottom-3 right-3 text-[11px] bg-black/60 text-ivory px-2 py-0.5 rounded-xs backdrop-blur-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Rê chuột để phóng to thớ trầm
            </div>
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
                      ? "border-forest shadow-md ring-2 ring-forest/20"
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
            <div className="p-4 bg-white border border-[#E8DFD1] rounded-sm flex items-baseline gap-3 shadow-xs">
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

            {/* Scent Profile Highlights - Luxury Interactive Visual Card */}
            <div className="bg-[#FAF8F4] p-4 rounded-sm border border-[#E8DFD1] text-xs space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-champagne-dark shrink-0" />
                  <span className="font-semibold text-charcoal">Hồ Sơ Khứu Giác Tự Nhiên</span>
                </div>
                <span className="text-[10px] font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-xs tracking-wider uppercase">
                  100% Thuần Mộc
                </span>
              </div>

              {/* Scent Intensity Meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted">Độ tỏa hương:</span>
                  <span className="font-semibold text-forest">{product.scentProfile.intensity}</span>
                </div>
                <div className="flex gap-1.5 pt-0.5">
                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const isFilled =
                      lvl <=
                      (product.scentProfile.intensity.toLowerCase().includes("thoang thoảng")
                        ? 2
                        : product.scentProfile.intensity.toLowerCase().includes("đậm") ||
                          product.scentProfile.intensity.toLowerCase().includes("mạnh")
                        ? 4
                        : 3);
                    return (
                      <div
                        key={lvl}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          isFilled
                            ? "bg-gradient-to-r from-champagne to-agarwood"
                            : "bg-stone-200"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Aromatic Notes Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-muted text-[11px] block">Tầng hương chính:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.scentProfile.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-white border border-[#E3DCCF] text-charcoal shadow-2xs hover:border-champagne hover:bg-champagne/10 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-champagne-dark" />
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Longevity Indicator */}
              <div className="flex items-center justify-between pt-1 border-t border-[#EFE7DC] text-[11px]">
                <span className="text-muted">Độ lưu hương:</span>
                <span className="font-medium text-forest-dark flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-champagne-dark" />
                  {product.scentProfile.longevity}
                </span>
              </div>
            </div>

            {/* Variant Selector & Wrist Size Guide Modal Trigger */}
            {product.variants.length > 1 && (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider">
                    Quy cách / Kích cỡ tuyển chọn:
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-champagne-dark hover:text-forest transition-colors cursor-pointer underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Hướng dẫn đo chu vi cổ tay</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                            ? "border-forest bg-forest/5 font-semibold text-forest shadow-xs ring-1 ring-forest/30"
                            : "border-border-subtle bg-white text-charcoal hover:border-champagne"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold">
                            {isSelected && <Check className="w-3.5 h-3.5 text-forest" />}
                            {v.name}
                          </span>
                        </div>
                        <span className="block mt-1 text-stone-600 font-semibold">
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

                <span className="text-xs text-muted font-light">
                  (Còn {maxQty} tác phẩm sẵn có)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={selectedVariant.inventoryStatus === "out_of_stock"}
                  leftIcon={
                    isAdded ? (
                      <Check className="w-5 h-5 text-emerald-600 animate-in zoom-in" />
                    ) : (
                      <ShoppingBag className="w-5 h-5" />
                    )
                  }
                >
                  {isAdded ? "Đã Thêm Vào Giỏ!" : "Thêm Vào Giỏ Hàng"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="primary"
                  size="lg"
                  className="flex-1 shadow-lg shadow-forest/20 font-serif font-semibold"
                  disabled={selectedVariant.inventoryStatus === "out_of_stock"}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Mua Ngay (Thanh Toán)
                </Button>
              </div>
            </div>
          </div>

          {/* Genuine Guarantees */}
          <div className="pt-4 border-t border-[#E8DFD1] grid grid-cols-2 gap-3 text-xs text-charcoal">
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

      {/* Tabs with Sliding Underline: Description, Specs, Reviews */}
      <div className="bg-white border border-[#E8DFD1] rounded-sm overflow-hidden shadow-xs">
        <div className="flex border-b border-[#E8DFD1] bg-[#FAF8F4]">
          {[
            { id: "desc", label: "Mô Tả Chi Tiết" },
            { id: "specs", label: "Thông Số & Xuất Xứ" },
            { id: "reviews", label: `Đánh Giá Thực Tế (${reviews.length})` },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? "text-forest bg-white font-bold"
                    : "text-stone-500 hover:text-charcoal"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="productDetailTab"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-forest"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-10">
          {activeTab === "desc" && (
            <div className="max-w-3xl space-y-4 text-sm text-stone-700 leading-relaxed font-light whitespace-pre-line">
              {product.description}
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-[#E8DFD1]/70 text-xs sm:text-sm">
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
                      <p className="text-stone-600 leading-relaxed font-light">{rev.content}</p>
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

      {/* STICKY BOTTOM ADD-TO-CART BAR (Appears on scroll past 450px) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFD1] shadow-2xl py-3 px-4 sm:px-6"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded overflow-hidden bg-[#FAF8F4] border border-[#E8DFD1] shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-bold text-forest">
                      {formatVND(selectedVariant.price)}
                    </span>
                    <span className="text-[11px] text-muted hidden sm:inline">
                      • {selectedVariant.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="sm"
                  disabled={selectedVariant.inventoryStatus === "out_of_stock"}
                  leftIcon={
                    isAdded ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )
                  }
                >
                  {isAdded ? "Đã Thêm!" : "Thêm Giỏ"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="primary"
                  size="sm"
                  disabled={selectedVariant.inventoryStatus === "out_of_stock"}
                  className="shadow-md font-serif font-semibold"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Mua Ngay
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: Hướng Dẫn Đo Chu Vi Cổ Tay */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-white rounded-sm border border-[#E8DFD1] p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-forest" />
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    Hướng Dẫn Đo Chu Vi Cổ Tay & Chọn Size Hạt
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-1 rounded text-stone-400 hover:text-charcoal cursor-pointer"
                  aria-label="Đóng bảng hướng dẫn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step 1: Measuring instruction */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                  1. Cách đo chu vi cổ tay bằng thước dây / mảnh giấy
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Dùng một sợi dây mềm hoặc mảnh giấy quấn sát quanh vị trí cổ tay mà bạn muốn đeo vòng (không quấn quá chặt hoặc quá lỏng). Đánh dấu điểm giao nhau và trải phẳng trên thước kẻ để lấy số đo chính xác (đơn vị: cm).
                </p>
              </div>

              {/* Step 2: Size table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                  2. Bảng quy chuẩn kích cỡ hạt VĨNH TRẦM
                </h4>
                <div className="border border-border-subtle rounded divide-y divide-border-subtle text-xs">
                  <div className="p-3 bg-[#FAF8F4] flex justify-between font-semibold text-charcoal">
                    <span>Kích thước hạt</span>
                    <span>Chu vi cổ tay phù hợp</span>
                    <span>Đối tượng khuyên dùng</span>
                  </div>
                  <div className="p-3 flex justify-between text-stone-600 font-light">
                    <strong className="text-charcoal font-semibold">Hạt 6mm (108 hạt)</strong>
                    <span>14.0 - 15.5 cm</span>
                    <span>Cổ tay nữ / thanh mảnh</span>
                  </div>
                  <div className="p-3 flex justify-between text-stone-600 font-light">
                    <strong className="text-charcoal font-semibold">Hạt 8mm (108 hạt / đơn)</strong>
                    <span>16.0 - 17.5 cm</span>
                    <span>Cổ tay nam / nữ đầy đặn</span>
                  </div>
                  <div className="p-3 flex justify-between text-stone-600 font-light">
                    <strong className="text-charcoal font-semibold">Hạt 10mm - 12mm</strong>
                    <span>17.5 - 19.5 cm</span>
                    <span>Cổ tay nam lớn / bề thế</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF8F4] p-3.5 rounded border border-[#E8DFD1] text-xs text-stone-600 font-light flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Lưu ý:</strong> VĨNH TRẦM hỗ trợ thu bớt hoặc thêm hạt miễn phí kèm chỉ dù dự phòng trong mỗi hộp sản phẩm để Quý khách tùy chỉnh vừa vặn nhất.
                </span>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="px-5 py-2 bg-forest text-ivory text-xs font-semibold rounded-xs hover:bg-forest-dark transition-colors cursor-pointer"
                >
                  Đã hiểu, quay lại đặt hàng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
