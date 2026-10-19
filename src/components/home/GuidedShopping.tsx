"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Check,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/types/product";
import { formatVND } from "@/lib/format/currency";
import { useCartStore } from "@/features/cart/useCartStore";
import { StarRating } from "@/components/ui/StarRating";

interface GuidedShoppingProps {
  products: Product[];
}

export function GuidedShopping({ products }: GuidedShoppingProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [addedId, setAddedId] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  const purposes = [
    { id: "all", label: "Tất cả mục đích" },
    { id: "daily_wear", label: "Đeo hộ thân hàng ngày" },
    { id: "meditation", label: "Thiền định & Thưởng trà" },
    { id: "relaxation", label: "Xông phòng & Thư giãn" },
    { id: "gift", label: "Quà biếu thượng khách" },
    { id: "fengshui", label: "Sưu tầm phong thủy" },
  ];

  const budgets = [
    { id: "all", label: "Mọi mức giá" },
    { id: "under_1m", label: "Dưới 1.000.000 ₫" },
    { id: "1m_to_3m", label: "1.000.000 - 3.000.000 ₫" },
    { id: "above_3m", label: "Trên 3.000.000 ₫" },
  ];

  // Tailored recommendation reasoning based on product & purpose
  const getRecommendationNote = (product: Product, purpose: string) => {
    switch (purpose) {
      case "daily_wear":
        return "Hạt tiện mộc 100%, ma sát thân nhiệt càng đeo càng bóng dầu và ngát hương.";
      case "meditation":
        return "Hương thơm thảo mộc thanh tĩnh, hỗ trợ hơi thở sâu và an định tâm trí.";
      case "relaxation":
        return "Tỏa hương nhanh, thanh lọc khí uế, mang lại giấc ngủ sâu và thư thái.";
      case "gift":
        return "Đóng gói hộp sơn mài cao cấp, biểu trưng cho lời chúc hanh thông, trường thọ.";
      case "fengshui":
        return "Hạt trầm tích tụ linh khí đất trời, vượng khí chiêu tài, hộ thân trừ tà.";
      default:
        return product.shortDescription || "Tuyển chọn trầm tự nhiên nguyên bản từ đất mẹ Khánh Hòa.";
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Purpose check
      if (selectedPurpose !== "all" && p.purpose !== selectedPurpose) {
        return false;
      }

      // Budget check
      if (selectedBudget === "under_1m" && p.price >= 1000000) {
        return false;
      }
      if (
        selectedBudget === "1m_to_3m" &&
        (p.price < 1000000 || p.price > 3000000)
      ) {
        return false;
      }
      if (selectedBudget === "above_3m" && p.price < 3000000) {
        return false;
      }

      return true;
    });
  }, [products, selectedPurpose, selectedBudget]);

  const handleQuickAdd = (product: Product) => {
    const variant = product.variants[0];
    if (variant) {
      addItem(product, variant, 1);
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  return (
    <div className="bg-[#FAF8F4] border border-[#E8DFD1] rounded-sm p-6 sm:p-10 shadow-sm relative overflow-hidden">
      {/* Subtle Luxury Watermark Graphic */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-champagne/10 blur-2xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-2 shadow-xs">
          <Compass className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Trợ Lý Chọn Trầm Cá Nhân Hóa</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-2">
          Tìm Kiếm Mùi Hương Tri Kỷ Dành Riêng Cho Bạn
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-light">
          Chọn mục đích sử dụng và khoảng ngân sách, chuyên gia VĨNH TRẦM sẽ gợi ý những vật phẩm trầm tự nhiên phù hợp nhất với phong thái của bạn.
        </p>
      </div>

      {/* Interactive Selection Filters */}
      <div className="space-y-5 mb-10 max-w-4xl mx-auto bg-white/70 backdrop-blur-xs p-5 sm:p-6 rounded-sm border border-[#E8DFD1]">
        {/* Purpose Filter */}
        <div>
          <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider mb-2.5">
            1. Mục đích thưởng trầm của Quý khách:
          </label>
          <div className="flex flex-wrap gap-2">
            {purposes.map((p) => {
              const isSelected = selectedPurpose === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPurpose(p.id)}
                  className={`relative text-xs px-3.5 py-2 rounded-xs border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-forest text-ivory border-forest font-semibold shadow-md"
                      : "bg-white text-charcoal border-border-subtle hover:border-champagne hover:text-forest"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Filter */}
        <div>
          <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider mb-2.5">
            2. Khoảng ngân sách dự kiến:
          </label>
          <div className="flex flex-wrap gap-2">
            {budgets.map((b) => {
              const isSelected = selectedBudget === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBudget(b.id)}
                  className={`relative text-xs px-3.5 py-2 rounded-xs border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#8C6B2D] text-white border-[#8C6B2D] font-semibold shadow-md"
                      : "bg-white text-charcoal border-border-subtle hover:border-champagne hover:text-[#8C6B2D]"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Suggested Products in Dedicated Boutique Recommendation Layout */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-stone-600 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Đề xuất {filteredProducts.length} tác phẩm phù hợp</span>
          </span>
          <Link
            href="/san-pham"
            className="text-xs font-semibold text-forest hover:text-champagne-dark flex items-center gap-1 group transition-colors"
          >
            <span>Khám phá toàn bộ danh mục</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, 3).map((product) => {
                const isJustAdded = addedId === product.id;
                const recommendationNote = getRecommendationNote(product, selectedPurpose);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="group bg-white rounded-sm border border-[#E8DFD1] hover:border-champagne/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top: Image with Concierge Reason Badge */}
                    <div>
                      <div className="relative aspect-4/3 w-full bg-[#FAF8F4] overflow-hidden border-b border-[#F0EAE1]">
                        <Image
                          src={product.images[0]}
                          alt={`Trầm hương tự nhiên ${product.name} - gợi ý từ trợ lý VĨNH TRẦM`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider bg-forest/90 backdrop-blur-xs text-ivory px-2.5 py-0.5 rounded-xs shadow-sm">
                          {product.categoryName}
                        </span>
                        {product.bestseller && (
                          <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider bg-champagne text-charcoal px-2 py-0.5 rounded-xs shadow-sm">
                            Đặc sắc
                          </span>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-5 space-y-3">
                        <div>
                          <StarRating
                            rating={product.ratingAverage}
                            count={product.ratingCount}
                            size="sm"
                          />
                          <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors line-clamp-2 mt-1 min-h-[50px] leading-snug">
                            <Link href={`/san-pham/${product.slug}`}>
                              {product.name}
                            </Link>
                          </h3>
                        </div>

                        {/* Dedicated Concierge Reason Box */}
                        <div className="bg-[#FAF8F4] p-3 rounded-xs border border-[#EBE3D7] text-xs text-stone-700 leading-relaxed font-light flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{recommendationNote}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="px-5 pb-5 pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase font-medium block">
                          Giá niêm yết
                        </span>
                        <span className="font-sans text-base sm:text-lg font-bold text-forest">
                          {formatVND(product.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/san-pham/${product.slug}`}
                          className="p-2 rounded-xs border border-border-subtle bg-[#FAF8F4] text-charcoal hover:bg-forest hover:text-ivory transition-colors"
                          aria-label={`Xem chi tiết ${product.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`px-3 py-2 rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                            isJustAdded
                              ? "bg-emerald-700 text-white"
                              : "bg-forest text-ivory hover:bg-forest-dark hover:text-champagne"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Đã thêm</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Chọn mua</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded border border-[#E8DFD1]">
            <Sparkles className="w-8 h-8 text-champagne mx-auto mb-2" />
            <p className="font-serif text-base text-charcoal mb-1">
              Chưa có tác phẩm khớp với bộ tiêu chí lựa chọn
            </p>
            <p className="text-xs text-muted mb-4">
              Quý khách vui lòng thử chọn tiêu chí khác hoặc xem toàn bộ danh mục của chúng tôi.
            </p>
            <button
              onClick={() => {
                setSelectedPurpose("all");
                setSelectedBudget("all");
              }}
              className="text-xs px-4 py-2 bg-forest text-ivory rounded font-semibold cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
