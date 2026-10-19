"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { mockProducts } from "@/data/mock/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

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
        p.seo.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularKeywords = [
    "Vòng tay 108 hạt",
    "Trầm nụ",
    "Nhang không tăm",
    "Khánh Hòa",
    "Tinh dầu trầm",
    "Bộ quà tặng",
  ];

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="max-w-2xl mx-auto flex items-center gap-2 bg-white p-2 border border-border-subtle rounded-sm shadow-xs"
      >
        <Search className="w-5 h-5 text-forest ml-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nhập tên sản phẩm, chủng loại hoặc xuất xứ trầm..."
          className="w-full text-xs sm:text-sm text-charcoal bg-transparent px-2 py-2 focus:outline-none placeholder-stone-400"
        />
        <Button type="submit" variant="primary" size="md">
          Tìm Kiếm
        </Button>
      </form>

      {/* Suggested Keywords */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-muted flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          Gợi ý:
        </span>
        {popularKeywords.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => {
              setSearchQuery(kw);
              router.push(`/tim-kiem?q=${encodeURIComponent(kw)}`);
            }}
            className="px-3 py-1 bg-white border border-border-subtle rounded-full text-stone-700 hover:border-forest hover:text-forest transition-colors cursor-pointer"
          >
            {kw}
          </button>
        ))}
      </div>

      {/* Results Header */}
      {initialQuery ? (
        <div className="border-b border-border-subtle pb-4 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-serif font-semibold text-charcoal">
            Kết quả tìm kiếm cho: <span className="text-forest">&quot;{initialQuery}&quot;</span>
          </h2>
          <span className="text-xs text-muted">
            Tìm thấy <strong>{results.length}</strong> sản phẩm
          </span>
        </div>
      ) : null}

      {/* Results Grid or Empty State */}
      {initialQuery && results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : initialQuery ? (
        <div className="text-center py-16 bg-white border border-border-subtle rounded-sm p-8 space-y-3">
          <p className="font-serif text-lg font-semibold text-charcoal">
            Không tìm thấy sản phẩm phù hợp với &quot;{initialQuery}&quot;
          </p>
          <p className="text-xs text-muted max-w-md mx-auto">
            Quý khách vui lòng thử tìm kiếm bằng các từ khóa ngắn hơn như &quot;vòng tay&quot;, &quot;nụ&quot;, hoặc &quot;nhang&quot;.
          </p>
        </div>
      ) : (
        <div className="text-center py-12 text-muted text-xs">
          Nhập từ khóa phía trên để bắt đầu tra cứu sản phẩm trầm hương.
        </div>
      )}
    </div>
  );
}
