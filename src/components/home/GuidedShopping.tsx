"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Compass, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

interface GuidedShoppingProps {
  products: Product[];
}

export function GuidedShopping({ products }: GuidedShoppingProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");

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

  return (
    <div className="bg-ivory-dark/40 border border-border-subtle rounded-sm p-6 sm:p-10 shadow-sm relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold mb-2 shadow-xs">
          <Compass className="w-3.5 h-3.5 animate-spin duration-1000" />
          <span>Trợ Lý Chọn Trầm Thông Minh</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-2">
          Tìm Kiếm Mùi Hương Phù Hợp Với Bạn
        </h2>
        <p className="text-xs sm:text-sm text-muted">
          Chọn mục đích sử dụng và khoảng ngân sách dự kiến, chúng tôi sẽ đề xuất những vật phẩm trầm tự nhiên phù hợp nhất.
        </p>
      </div>

      {/* Selector Filters */}
      <div className="space-y-4 mb-8 max-w-4xl mx-auto">
        {/* Purpose Filter */}
        <div>
          <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider mb-2">
            1. Mục đích của Quý khách:
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
          <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider mb-2">
            2. Khoảng ngân sách:
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
                      ? "bg-agarwood text-white border-agarwood font-semibold shadow-md"
                      : "bg-white text-charcoal border-border-subtle hover:border-champagne hover:text-agarwood"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-muted">
            Tìm thấy {filteredProducts.length} gợi ý phù hợp
          </span>
          <Link
            href="/san-pham"
            className="text-xs font-semibold text-forest hover:text-agarwood flex items-center gap-1 group transition-colors"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, 3).map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded border border-border-subtle">
            <Sparkles className="w-8 h-8 text-champagne mx-auto mb-2" />
            <p className="font-serif text-base text-charcoal mb-1">
              Chưa có sản phẩm khớp với tiêu chí lựa chọn
            </p>
            <p className="text-xs text-muted mb-4">
              Vui lòng thử chọn tiêu chí khác hoặc xem toàn bộ danh mục của chúng tôi.
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
