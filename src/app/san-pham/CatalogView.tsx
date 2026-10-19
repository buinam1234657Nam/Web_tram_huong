"use client";

import React, { useState, useMemo } from "react";
import { Filter, X, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { ProductCard } from "@/components/product/ProductCard";

export function CatalogView({
  initialProducts,
  categories,
  initialCategorySlug,
}: {
  initialProducts: Product[];
  categories: Category[];
  initialCategorySlug?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategorySlug || "all"
  );
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("bestseller");
  const [priceMax, setPriceMax] = useState<number>(12000000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (selectedPurpose !== "all") {
      result = result.filter((p) => p.purpose === selectedPurpose);
    }

    result = result.filter((p) => p.price <= priceMax);

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
    selectedCategory,
    selectedPurpose,
    selectedSort,
    priceMax,
    inStockOnly,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPurpose("all");
    setSelectedSort("bestseller");
    setPriceMax(12000000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedPurpose !== "all" ||
    priceMax < 12000000 ||
    inStockOnly;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between pb-4 border-b border-border-subtle">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded text-xs font-semibold text-charcoal shadow-xs"
        >
          <Filter className="w-3.5 h-3.5 text-forest" />
          <span>Bộ lọc & Sắp xếp ({hasActiveFilters ? "Đang lọc" : "Mặc định"})</span>
        </button>

        <span className="text-xs text-muted">
          Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm
        </span>
      </div>

      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-sm border border-border-subtle h-fit sticky top-28">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-forest" />
            <h3 className="font-serif text-base font-semibold text-charcoal">Bộ Lọc Tìm Kiếm</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-agarwood-dark hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Đặt lại
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider mb-2.5">
            Danh Mục Chế Tác
          </label>
          <div className="space-y-1.5">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex justify-between items-center transition-colors cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-forest text-ivory font-semibold"
                  : "text-charcoal hover:bg-ivory"
              }`}
            >
              <span>Tất cả danh mục</span>
              <span className="text-[11px] opacity-80">{initialProducts.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex justify-between items-center transition-colors cursor-pointer ${
                  selectedCategory === c.slug
                    ? "bg-forest text-ivory font-semibold"
                    : "text-charcoal hover:bg-ivory"
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[11px] opacity-80">{categoryCounts[c.slug] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-xs uppercase font-semibold text-charcoal tracking-wider mb-2.5">
            Mục Đích Sử Dụng
          </label>
          <select
            value={selectedPurpose}
            onChange={(e) => setSelectedPurpose(e.target.value)}
            className="w-full text-xs p-2.5 rounded-sm bg-white border border-stone-300 hover:border-stone-400 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest cursor-pointer shadow-2xs"
          >
            <option value="all">Tất cả mục đích</option>
            <option value="daily_wear">Đeo hộ thân hàng ngày</option>
            <option value="meditation">Thiền định & Thưởng trà</option>
            <option value="relaxation">Xông phòng & Thư giãn</option>
            <option value="gift">Quà biếu thượng khách</option>
            <option value="fengshui">Sưu tầm phong thủy</option>
          </select>
        </div>

        {/* Max Price Range Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs">
            <label className="uppercase font-semibold text-charcoal tracking-wider">
              Mức Giá Tối Đa
            </label>
            <span className="font-semibold text-forest">
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                priceMax
              )}
            </span>
          </div>
          <input
            type="range"
            min={400000}
            max={12000000}
            step={200000}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-forest cursor-pointer"
          />
        </div>

        {/* In Stock Only Toggle */}
        <div className="pt-2 border-t border-border-subtle">
          <label className="flex items-center gap-2.5 text-xs text-charcoal cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-forest rounded"
            />
            <span>Chỉ hiển thị sản phẩm còn hàng</span>
          </label>
        </div>
      </aside>

      {/* Product Content Column */}
      <div className="lg:col-span-3 space-y-6">
        {/* Top Filter & Sort Bar */}
        <div className="bg-white p-4 rounded-sm border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-muted">
            Tìm thấy <strong className="text-charcoal font-semibold">{filteredProducts.length}</strong> sản phẩm phù hợp
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label htmlFor="sort-select" className="text-xs text-muted whitespace-nowrap">
              Sắp xếp theo:
            </label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="text-xs p-2 rounded-sm bg-white border border-stone-300 hover:border-stone-400 text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest cursor-pointer shadow-2xs"
            >
              <option value="bestseller">Bán chạy nhất</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted">Đang áp dụng:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest/10 text-forest font-medium">
                {categories.find((c) => c.slug === selectedCategory)?.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedCategory("all")}
                />
              </span>
            )}
            {selectedPurpose !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest/10 text-forest font-medium">
                Mục đích đã chọn
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSelectedPurpose("all")}
                />
              </span>
            )}
            {priceMax < 12000000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest/10 text-forest font-medium">
                Dưới {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(priceMax)}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setPriceMax(12000000)}
                />
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest/10 text-forest font-medium">
                Chỉ còn hàng
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setInStockOnly(false)}
                />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-agarwood hover:underline ml-2"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-sm border border-border-subtle p-8 space-y-3">
            <p className="font-serif text-lg font-semibold text-charcoal">
              Không tìm thấy sản phẩm phù hợp
            </p>
            <p className="text-xs text-muted max-w-md mx-auto">
              Không có sản phẩm nào khớp với bộ lọc hiện tại của Quý khách. Vui lòng mở rộng khoảng giá hoặc chọn danh mục khác.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-4 py-2 bg-forest text-ivory text-xs font-semibold rounded cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Đặt lại toàn bộ bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden" role="dialog">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative min-h-screen flex items-end">
            <div className="w-full bg-white rounded-t-xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <h3 className="font-serif text-lg font-bold text-charcoal">Bộ Lọc Sản Phẩm</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs uppercase font-bold text-charcoal mb-2">Danh mục</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`text-xs px-3 py-1.5 rounded border ${
                      selectedCategory === "all"
                        ? "bg-forest text-ivory border-forest"
                        : "bg-ivory border-border-subtle"
                    }`}
                  >
                    Tất cả
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      className={`text-xs px-3 py-1.5 rounded border ${
                        selectedCategory === c.slug
                          ? "bg-forest text-ivory border-forest"
                          : "bg-ivory border-border-subtle"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[10px] opacity-75">({categoryCounts[c.slug] || 0})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold">Mức giá tối đa</span>
                  <span className="text-forest font-semibold">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(priceMax)}
                  </span>
                </div>
                <input
                  type="range"
                  min={400000}
                  max={12000000}
                  step={200000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-forest"
                />
              </div>

              <div className="pt-4 border-t border-border-subtle flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 text-xs font-semibold border border-border-subtle rounded text-charcoal"
                >
                  Đặt lại
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 text-xs font-semibold bg-forest text-ivory rounded"
                >
                  Áp dụng ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
