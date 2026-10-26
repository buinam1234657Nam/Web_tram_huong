"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { useProductSearch } from "@/hooks/useProductSearch";

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

  const trimmedQuery = initialQuery.trim();
  const search = useProductSearch(trimmedQuery, {
    enabled: Boolean(trimmedQuery),
  });
  const results = search.query === trimmedQuery ? search.products : [];

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
          <h2 className="text-xl font-medium text-agarwood">
            Kết quả cho “{initialQuery}”{" "}
            {!search.isLoading && (
              <span className="text-muted-light">({search.total})</span>
            )}
          </h2>

          {search.isLoading ? (
            <p className="py-16 text-center text-[15px] text-muted">
              Đang tìm…
            </p>
          ) : results.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : null}

          {!search.isLoading && search.total > results.length ? (
            <p className="mt-10 text-center text-sm text-muted">
              Đang hiển thị {results.length} / {search.total} kết quả. Thêm từ
              khóa để thu hẹp tìm kiếm.
            </p>
          ) : null}

          {search.isLoading || results.length > 0 ? null : (
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
