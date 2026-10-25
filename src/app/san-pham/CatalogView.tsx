"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  MOTION_DURATION,
  MOTION_EASE,
  MOTION_RISE,
} from "@/components/motion/MotionPrimitives";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { ProductCard } from "@/components/product/ProductCard";
import { Select } from "@/components/ui/Select";

const PURPOSE_OPTIONS = [
  { value: "daily_wear", label: "Đeo hộ thân hàng ngày" },
  { value: "meditation", label: "Thiền định & thưởng trà" },
  { value: "relaxation", label: "Xông phòng & thư giãn" },
  { value: "gift", label: "Quà biếu" },
  { value: "fengshui", label: "Sưu tầm phong thủy" },
];

const PRICE_OPTIONS = [
  { value: "under-1m", label: "Dưới 1.000.000₫", min: 0, max: 1000000 },
  {
    value: "1m-3m",
    label: "1.000.000₫ – 3.000.000₫",
    min: 1000000,
    max: 3000000,
  },
  {
    value: "3m-5m",
    label: "3.000.000₫ – 5.000.000₫",
    min: 3000000,
    max: 5000000,
  },
  { value: "over-5m", label: "Trên 5.000.000₫", min: 5000000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "bestseller", label: "Nổi bật" },
  { value: "price_desc", label: "Giá: Cao - Thấp" },
  { value: "price_asc", label: "Giá: Thấp - Cao" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function CatalogView({
  initialProducts,
  categories,
  activeCategory,
}: {
  initialProducts: Product[];
  categories: Category[];
  activeCategory?: Category;
}) {
  const [purposes, setPurposes] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState("bestseller");
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const filteredProducts = useMemo(() => {
    let result = activeCategory
      ? initialProducts.filter((p) => p.categorySlug === activeCategory.slug)
      : [...initialProducts];

    if (purposes.length > 0) {
      result = result.filter((p) => purposes.includes(p.purpose));
    }

    if (priceRanges.length > 0) {
      const ranges = PRICE_OPTIONS.filter((o) => priceRanges.includes(o.value));
      result = result.filter((p) =>
        ranges.some((r) => p.price >= r.min && p.price < r.max),
      );
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inventoryStatus !== "out_of_stock");
    }

    switch (selectedSort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.ratingAverage - a.ratingAverage);
        break;
      case "bestseller":
      default:
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }

    return result;
  }, [
    initialProducts,
    activeCategory,
    purposes,
    priceRanges,
    inStockOnly,
    selectedSort,
  ]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  const activeFilterCount =
    purposes.length + priceRanges.length + (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setPurposes([]);
    setPriceRanges([]);
    setInStockOnly(false);
  };

  const title = activeCategory ? activeCategory.name : "Tất cả sản phẩm";

  const filterPanel = (
    <>
      <nav aria-label="Danh mục sản phẩm" className="pb-6">
        <ul className="space-y-2.5">
          <li>
            <CategoryLink href="/san-pham" active={!activeCategory}>
              Tất cả sản phẩm
            </CategoryLink>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <CategoryLink
                href={`/danh-muc/${c.slug}`}
                active={activeCategory?.slug === c.slug}
              >
                {c.name}
                <span className="ml-1 text-muted-light font-normal">
                  ({categoryCounts[c.slug] || 0})
                </span>
              </CategoryLink>
            </li>
          ))}
        </ul>
      </nav>

      <FilterGroup title="Mục đích sử dụng" count={purposes.length}>
        {PURPOSE_OPTIONS.map((o) => (
          <Checkbox
            key={o.value}
            label={o.label}
            checked={purposes.includes(o.value)}
            onChange={() => setPurposes((prev) => toggle(prev, o.value))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Mua theo giá" count={priceRanges.length}>
        {PRICE_OPTIONS.map((o) => (
          <Checkbox
            key={o.value}
            label={o.label}
            checked={priceRanges.includes(o.value)}
            onChange={() => setPriceRanges((prev) => toggle(prev, o.value))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Tình trạng" count={inStockOnly ? 1 : 0}>
        <Checkbox
          label="Chỉ hiện sản phẩm còn hàng"
          checked={inStockOnly}
          onChange={() => setInStockOnly((v) => !v)}
        />
      </FilterGroup>
    </>
  );

  return (
    <div>
      {/* Title + controls bar */}
      <div className="sticky top-(--header-h) z-20 bg-white/95 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 flex items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-medium text-charcoal">
          {title}{" "}
          <span className="text-muted-light">({filteredProducts.length})</span>
        </h1>

        <div className="flex items-center gap-6 text-[15px]">
          <button
            type="button"
            onClick={() => setIsFilterVisible((v) => !v)}
            className="hidden lg:inline-flex items-center gap-2 text-charcoal hover:text-gold-dark cursor-pointer"
          >
            {isFilterVisible ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <div className="hidden sm:block">
            <Select
              label="Sắp xếp theo"
              value={selectedSort}
              options={SORT_OPTIONS}
              onChange={setSelectedSort}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle text-sm text-charcoal"
          >
            Bộ lọc{activeFilterCount > 0 && ` (${activeFilterCount})`}
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-10 pt-4">
        <AnimatePresence initial={false}>
          {isFilterVisible && (
            <motion.aside
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.5, ease: MOTION_EASE }}
              className="hidden lg:block shrink-0 sticky top-[calc(var(--header-h)+5rem)] self-start max-h-[calc(100vh-10rem)] overflow-y-auto overflow-x-hidden no-scrollbar pb-10"
            >
              <div className="w-60">{filterPanel}</div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div
              className={`grid grid-cols-2 gap-x-4 gap-y-10 ${
                isFilterVisible ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
              {filteredProducts.map((product, idx) => (
                // Same fade/rise as the rest of the site; replays when filters change the set.
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : MOTION_RISE }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: MOTION_DURATION,
                    delay: Math.min(idx, 8) * 0.08,
                    ease: MOTION_EASE,
                  }}
                >
                  <ProductCard product={product} eager={idx < 3} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-lg font-medium text-charcoal">
                Không tìm thấy sản phẩm phù hợp
              </p>
              <p className="mt-2 text-muted">
                Thử bỏ bớt bộ lọc hoặc chọn danh mục khác.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 px-6 py-3 rounded-full bg-espresso text-white text-sm font-medium cursor-pointer"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: MOTION_EASE }}
            className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Bộ lọc"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-border-subtle">
              <p className="text-lg font-medium text-charcoal">Bộ lọc</p>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 -mr-2 rounded-full bg-ivory"
                aria-label="Đóng bộ lọc"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="pb-6 border-b border-border-subtle">
                <p className="text-lg font-medium text-charcoal mb-4">
                  Sắp xếp theo
                </p>
                <div className="space-y-3">
                  {SORT_OPTIONS.map((o) => (
                    <label
                      key={o.value}
                      className="flex items-center gap-3 text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sort-mobile"
                        checked={selectedSort === o.value}
                        onChange={() => setSelectedSort(o.value)}
                        className="w-5 h-5 accent-espresso"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-6">{filterPanel}</div>
            </div>

            <div className="px-4 py-4 border-t border-border-subtle flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-3.5 rounded-full border border-border-subtle text-charcoal font-medium"
              >
                Xóa bộ lọc
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3.5 rounded-full bg-espresso text-white font-medium"
              >
                Xem {filteredProducts.length} sản phẩm
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`text-[15px] font-medium transition-colors ${
        active
          ? "text-charcoal underline underline-offset-4"
          : "text-charcoal/80 hover:text-gold-dark"
      }`}
    >
      {children}
    </Link>
  );
}

function FilterGroup({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-t border-border-subtle py-5">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-[15px] font-medium text-charcoal cursor-pointer"
      >
        <span>
          {title}
          {count > 0 && ` (${count})`}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
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
            <div className="pt-4 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 text-[15px] text-charcoal cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-espresso rounded"
      />
      {label}
    </label>
  );
}
