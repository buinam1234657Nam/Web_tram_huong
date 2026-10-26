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
import { AgarwoodGrade, ProductSummary } from "@/types/product";
import { Category } from "@/types/category";
import { ProductCard } from "@/components/product/ProductCard";
import { Select } from "@/components/ui/Select";
import { RITUALS } from "@/data/content/rituals";
import { gradeLabel } from "@/lib/format/agarwood";

const GRADE_ORDER: AgarwoodGrade[] = ["chìm", "bán chìm", "nổi", "tốc"];

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

/** Cards rendered per "Xem thêm" step; the full catalog is several hundred items. */
const PAGE_SIZE = 24;

function toggle(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function CatalogView({
  products,
  categories,
  activeCategory,
  title = activeCategory ? activeCategory.name : "Tất cả sản phẩm",
  hideRitualFilter = false,
}: {
  /** Already scoped to the page (a category, a need, or everything). */
  products: ProductSummary[];
  categories: Category[];
  activeCategory?: Category;
  title?: string;
  /** On /nhu-cau pages the need is the page itself. */
  hideRitualFilter?: boolean;
}) {
  const [rituals, setRituals] = useState<string[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState("bestseller");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /** Any filter or sort change starts the list from the top again. */
  const withReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setVisibleCount(PAGE_SIZE);
    };

  // Only offer values that exist in this listing, so no single option leads to zero results.
  const gradeOptions = useMemo(
    () =>
      GRADE_ORDER.filter((g) =>
        products.some((p) => p.agarwoodProfile.grade === g),
      ).map((g) => ({ value: g, label: gradeLabel(g) })),
    [products],
  );

  const originOptions = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => {
      const origin = p.agarwoodProfile.origin;
      if (origin) counts.set(origin, (counts.get(origin) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([origin]) => ({ value: origin, label: origin }));
  }, [products]);

  const ritualOptions = useMemo(
    () =>
      RITUALS.filter((r) => products.some((p) => p.ritual.includes(r.slug))).map(
        (r) => ({ value: r.slug, label: r.label }),
      ),
    [products],
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (rituals.length > 0) {
      result = result.filter((p) => p.ritual.some((r) => rituals.includes(r)));
    }

    if (grades.length > 0) {
      result = result.filter((p) => {
        const grade = p.agarwoodProfile.grade;
        return grade !== null && grades.includes(grade);
      });
    }

    if (origins.length > 0) {
      result = result.filter((p) => {
        const origin = p.agarwoodProfile.origin;
        return origin !== null && origins.includes(origin);
      });
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
    products,
    rituals,
    grades,
    origins,
    priceRanges,
    inStockOnly,
    selectedSort,
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const activeFilterCount =
    rituals.length +
    grades.length +
    origins.length +
    priceRanges.length +
    (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setRituals([]);
    setGrades([]);
    setOrigins([]);
    setPriceRanges([]);
    setInStockOnly(false);
    setVisibleCount(PAGE_SIZE);
  };

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
                  ({c.productCount})
                </span>
              </CategoryLink>
            </li>
          ))}
        </ul>
      </nav>

      {!hideRitualFilter && ritualOptions.length > 0 && (
        <CheckboxGroup
          title="Nhu cầu"
          options={ritualOptions}
          selected={rituals}
          onChange={withReset(setRituals)}
        />
      )}

      {gradeOptions.length > 0 && (
        <CheckboxGroup
          title="Loại trầm"
          options={gradeOptions}
          selected={grades}
          onChange={withReset(setGrades)}
        />
      )}

      {originOptions.length > 0 && (
        <CheckboxGroup
          title="Vùng nguồn gốc"
          options={originOptions}
          selected={origins}
          onChange={withReset(setOrigins)}
        />
      )}

      <CheckboxGroup
        title="Khoảng giá"
        options={PRICE_OPTIONS}
        selected={priceRanges}
        onChange={withReset(setPriceRanges)}
      />

      <FilterGroup title="Tình trạng" count={inStockOnly ? 1 : 0}>
        <Checkbox
          label="Chỉ hiện sản phẩm còn hàng"
          checked={inStockOnly}
          onChange={() => withReset(setInStockOnly)(!inStockOnly)}
        />
      </FilterGroup>
    </>
  );

  return (
    <div>
      {/* Title + controls bar */}
      <div className="sticky top-(--header-h) z-20 bg-cream/95 backdrop-blur-md -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 flex items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-medium text-agarwood">
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
              onChange={withReset(setSelectedSort)}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden shrink-0 whitespace-nowrap inline-flex items-center gap-2 h-11 px-4 rounded-full border border-border-subtle text-sm text-charcoal"
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
            <>
              <div
                className={`grid grid-cols-2 gap-x-4 gap-y-10 ${
                  isFilterVisible ? "lg:grid-cols-3" : "lg:grid-cols-4"
                }`}
              >
                {visibleProducts.map((product, idx) => (
                  // Same fade/rise as the rest of the site; replays when filters change the set.
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : MOTION_RISE }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: MOTION_DURATION,
                      // Stagger restarts for each page so newly loaded cards don't wait.
                      delay: Math.min(idx % PAGE_SIZE, 8) * 0.08,
                      ease: MOTION_EASE,
                    }}
                  >
                    <ProductCard product={product} eager={idx < 3} />
                  </motion.div>
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-14 text-center">
                  <p className="text-sm text-muted">
                    Đang xem {visibleProducts.length} / {filteredProducts.length}{" "}
                    sản phẩm
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                    className="mt-4 h-12 px-8 rounded-full border border-charcoal/25 text-[15px] font-medium text-charcoal hover:border-charcoal transition-colors cursor-pointer"
                  >
                    Xem thêm sản phẩm
                  </button>
                </div>
              )}
            </>
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
                        onChange={() => withReset(setSelectedSort)(o.value)}
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
          ? "text-agarwood underline underline-offset-4"
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

function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: Array<{ value: string; label: string }>;
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <FilterGroup title={title} count={selected.length}>
      {options.map((o) => (
        <Checkbox
          key={o.value}
          label={o.label}
          checked={selected.includes(o.value)}
          onChange={() => onChange(toggle(selected, o.value))}
        />
      ))}
    </FilterGroup>
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
