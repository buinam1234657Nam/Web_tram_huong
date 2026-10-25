"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_RISE,
} from "@/components/motion/MotionPrimitives";
import { Product, ProductVariant } from "@/types/product";
import { Review } from "@/types/review";
import { formatVND, calculateDiscountPercentage } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { brandConfig } from "@/lib/config/brand";

const STAGGER_ITEM = {
  hidden: { opacity: 0, y: MOTION_RISE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION, ease: MOTION_EASE },
  },
};

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
    product.variants[0],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const price = selectedVariant.price;
  const compareAtPrice = selectedVariant.compareAtPrice;
  const discount = calculateDiscountPercentage(price, compareAtPrice);
  const isOutOfStock = selectedVariant.inventoryStatus === "out_of_stock";
  const images =
    product.images.length > 0 ? product.images : ["/images/hero-agarwood.jpg"];
  const isBracelet = product.categorySlug === "vong-tay-tram-huong";

  const showImage = (idx: number) =>
    setActiveImageIndex((idx + images.length) % images.length);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedVariant, 1);
    router.push("/thanh-toan");
  };

  return (
    <div className="space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-14 items-start">
        {/* Gallery: vertical thumbnails + main image */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : MOTION_RISE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION, ease: MOTION_EASE }}
          className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] flex flex-col-reverse sm:flex-row gap-3"
        >
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-2 shrink-0">
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onMouseEnter={() => showImage(idx)}
                  onClick={() => showImage(idx)}
                  className={`relative w-16 h-16 overflow-hidden bg-ivory cursor-pointer transition-opacity duration-300 ${
                    activeImageIndex === idx
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Xem ảnh ${idx + 1}`}
                  aria-current={activeImageIndex === idx}
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

          <div className="relative flex-1 aspect-square bg-ivory overflow-hidden">
            {/* Plain crossfade between gallery images */}
            <AnimatePresence initial={false}>
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: MOTION_EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImageIndex]}
                  alt={`${product.name} - ảnh ${activeImageIndex + 1}`}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {images.length > 1 && (
              <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => showImage(activeImageIndex - 1)}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-ivory cursor-pointer"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => showImage(activeImageIndex + 1)}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-ivory cursor-pointer"
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Buy box: blocks cascade in on load */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          <motion.div variants={STAGGER_ITEM}>
            {product.bestseller && (
              <p className="text-[15px] font-medium text-gold-dark mb-1">
                Bán chạy
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-medium text-charcoal leading-tight">
              {product.name}
            </h1>
            <p className="mt-1 text-[15px] text-muted">
              {product.categoryName}
            </p>
          </motion.div>

          <motion.div variants={STAGGER_ITEM}>
            <p className="mt-5 text-xl font-medium text-charcoal">
              {formatVND(price)}
              {compareAtPrice && compareAtPrice > price && (
                <span className="ml-3 text-base font-normal text-muted-light line-through">
                  {formatVND(compareAtPrice)}
                </span>
              )}
            </p>
            {discount && (
              <p className="mt-1 text-[15px] font-medium text-agarwood">
                Giảm {discount}%
              </p>
            )}
          </motion.div>

          {product.variants.length > 0 && (
            <motion.div variants={STAGGER_ITEM} className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[15px] font-medium text-charcoal">
                  Chọn quy cách
                </p>
                {isBracelet && (
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[15px] text-muted hover:text-charcoal cursor-pointer"
                  >
                    Hướng dẫn chọn size
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-2">
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
                      className={`px-4 py-3.5 rounded-md border text-left text-[15px] transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:text-muted-light disabled:bg-ivory-light ${
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
            </motion.div>
          )}

          <motion.div variants={STAGGER_ITEM} className="mt-8 space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="relative w-full h-14 overflow-hidden rounded-full bg-espresso text-white text-[15px] font-medium hover:bg-espresso-light transition-colors duration-300 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOutOfStock ? "out" : isAdded ? "added" : "add"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center gap-2"
                >
                  {isAdded && <Check className="w-4 h-4" />}
                  {isOutOfStock
                    ? "Tạm hết hàng"
                    : isAdded
                      ? "Đã thêm vào giỏ"
                      : "Thêm vào giỏ hàng"}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-4 rounded-full border border-border-subtle text-[15px] font-medium text-charcoal hover:border-charcoal transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Mua ngay
            </button>
          </motion.div>

          <motion.div variants={STAGGER_ITEM}>
            <p className="mt-6 text-[15px] text-charcoal/80 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="mt-8 border-b border-border-subtle">
              <Accordion title="Mô tả sản phẩm" defaultOpen>
                <p className="whitespace-pre-line">{product.description}</p>
              </Accordion>

              <Accordion title="Hương thơm">
                <dl className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Độ tỏa hương</dt>
                    <dd className="capitalize">
                      {product.scentProfile.intensity}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Tầng hương</dt>
                    <dd className="text-right">
                      {product.scentProfile.notes.join(", ")}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Lưu hương</dt>
                    <dd className="text-right">
                      {product.scentProfile.longevity}
                    </dd>
                  </div>
                </dl>
              </Accordion>

              <Accordion title="Thông số & xuất xứ">
                <dl className="space-y-2">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Xuất xứ</dt>
                    <dd className="text-right">{product.origin}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Thu hái</dt>
                    <dd className="text-right">{product.harvestMethod}</dd>
                  </div>
                  {product.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4"
                    >
                      <dt className="text-muted shrink-0">{spec.label}</dt>
                      <dd className="text-right">{spec.value}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Mã sản phẩm</dt>
                    <dd>{selectedVariant.sku}</dd>
                  </div>
                </dl>
              </Accordion>

              <Accordion title="Giao hàng & đổi trả">
                <ul className="space-y-2">
                  <li>
                    Miễn phí vận chuyển cho đơn từ{" "}
                    {formatVND(brandConfig.policies.freeShippingThreshold)}.
                  </li>
                  <li>Được mở hộp đồng kiểm trước khi thanh toán.</li>
                  <li>
                    Đổi trả trong {brandConfig.policies.returnDays} ngày nếu sản
                    phẩm lỗi.
                  </li>
                  <li>Bảo hành thay dây, đánh bóng hạt trọn đời.</li>
                </ul>
              </Accordion>

              <Accordion
                title={`Đánh giá (${reviews.length})`}
                aside={
                  <StarRating
                    rating={product.ratingAverage}
                    showScore={false}
                    size="sm"
                  />
                }
              >
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((rev) => (
                      <div key={rev.id}>
                        <StarRating
                          rating={rev.rating}
                          showScore={false}
                          size="sm"
                        />
                        <p className="mt-2 font-medium text-charcoal">
                          {rev.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {rev.authorName} · {rev.date}
                        </p>
                        <p className="mt-2">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">
                    Chưa có đánh giá nào cho sản phẩm này.
                  </p>
                )}
              </Accordion>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductCarousel
          title="Có thể bạn cũng thích"
          products={relatedProducts}
          contained={false}
        />
      )}

      <AnimatePresence>
        {isSizeGuideOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Hướng dẫn chọn size"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSizeGuideOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: MOTION_RISE }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: MOTION_RISE }}
              transition={{ duration: 0.5, ease: MOTION_EASE }}
              className="relative w-full max-w-lg bg-white p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium text-charcoal">
                  Hướng dẫn chọn size
                </h3>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-2 -m-2 rounded-full hover:bg-ivory cursor-pointer"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-[15px] text-charcoal/80 leading-relaxed">
                Quấn một sợi dây mềm quanh cổ tay ở vị trí muốn đeo, đánh dấu
                điểm giao nhau rồi đo trên thước (cm).
              </p>
              <table className="mt-6 w-full text-[15px] text-left">
                <thead>
                  <tr className="border-b border-border-subtle text-muted">
                    <th className="py-2 font-normal">Hạt</th>
                    <th className="py-2 font-normal">Cổ tay</th>
                    <th className="py-2 font-normal">Phù hợp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-charcoal">
                  <tr>
                    <td className="py-3">6mm</td>
                    <td className="py-3">14 – 15,5 cm</td>
                    <td className="py-3">Cổ tay nhỏ</td>
                  </tr>
                  <tr>
                    <td className="py-3">8mm</td>
                    <td className="py-3">16 – 17,5 cm</td>
                    <td className="py-3">Cổ tay vừa</td>
                  </tr>
                  <tr>
                    <td className="py-3">10 – 12mm</td>
                    <td className="py-3">17,5 – 19,5 cm</td>
                    <td className="py-3">Cổ tay lớn</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-6 text-sm text-muted">
                Vĩnh Trầm hỗ trợ thêm hoặc bớt hạt miễn phí để vòng vừa vặn
                nhất.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Accordion({
  title,
  aside,
  defaultOpen = false,
  children,
}: {
  title: string;
  aside?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-border-subtle">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-6 text-lg font-medium text-charcoal cursor-pointer"
      >
        <span>{title}</span>
        <span className="flex items-center gap-3">
          {aside}
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: MOTION_EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[15px] text-charcoal/80 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
