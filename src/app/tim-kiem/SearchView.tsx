"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { mockProducts } from "@/data/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

const POPULAR_KEYWORDS = [
  "Vòng tay 108 hạt",
  "Trầm nụ",
  "Nhang không tăm",
  "Khánh Hòa",
  "Tinh dầu trầm",
  "Bộ quà tặng",
];

export function SearchView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!initialQuery.trim()) return [];
    const q = initialQuery.toLowerCase().trim();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.seo.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [initialQuery]);

  const runSearch = (query: string) => {
    const q = query.trim();
    if (q) router.push(`/tim-kiem?q=${encodeURIComponent(q)}`);
  };

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(searchQuery);
        }}
        className="mt-8 max-w-2xl mx-auto flex items-center gap-2 rounded-full bg-ivory pl-5 pr-1.5 py-1.5"
      >
        <Search className="w-5 h-5 text-muted shrink-0" aria-hidden="true" />
        <label htmlFor="search-page-input" className="sr-only">
          Từ khóa tìm kiếm
        </label>
        <input
          id="search-page-input"
          type="text"
          enterKeyHint="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tên sản phẩm, loại trầm hoặc xuất xứ…"
          className="flex-1 min-w-0 bg-transparent py-2.5 text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none"
        />
        <Button type="submit" className="shrink-0 whitespace-nowrap">
          Tìm
        </Button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {POPULAR_KEYWORDS.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => {
              setSearchQuery(kw);
              runSearch(kw);
            }}
            className="px-4 py-2 rounded-full border border-border-subtle text-sm text-charcoal hover:border-charcoal transition-colors cursor-pointer"
          >
            {kw}
          </button>
        ))}
      </div>

      {initialQuery ? (
        <section className="mt-16" aria-live="polite">
          <h2 className="text-xl font-medium text-charcoal">
            Kết quả cho “{initialQuery}”{" "}
            <span className="text-muted-light">({results.length})</span>
          </h2>

          {results.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-medium text-charcoal">
                Không tìm thấy sản phẩm phù hợp
              </p>
              <p className="mt-2 text-[15px] text-muted">
                Thử từ khóa ngắn hơn như “vòng tay”, “nụ” hoặc “nhang”.
              </p>
            </div>
          )}
        </section>
      ) : (
        <p className="mt-16 text-center text-[15px] text-muted">
          Nhập từ khóa hoặc chọn một gợi ý để bắt đầu.
        </p>
      )}
    </div>
  );
}
