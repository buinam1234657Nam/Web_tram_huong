"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { mockProducts } from "@/data/mock/products";
import { formatVND } from "@/lib/format/currency";

export function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return mockProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.seo.keywords.some((k) => k.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const popularSearches = [
    "Vòng tay 108 hạt",
    "Trầm nụ",
    "Nhang không tăm",
    "Trầm miếng Khánh Hòa",
    "Bộ quà tặng",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
        <div className="relative w-full max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden border border-border-subtle">
          {/* Search Input Bar */}
          <form onSubmit={handleSubmit} className="p-4 border-b border-border-subtle flex items-center gap-3 bg-ivory">
            <Search className="w-5 h-5 text-forest shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm vòng tay, nhang nụ, tinh dầu trầm tự nhiên..."
              className="w-full bg-transparent text-charcoal placeholder-stone-400 text-sm md:text-base focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="text-xs uppercase font-semibold text-stone-500 hover:text-charcoal px-2 py-1 rounded cursor-pointer"
            >
              Hủy
            </button>
          </form>

          {/* Quick Suggestions or Results */}
          <div className="p-5 max-h-[60vh] overflow-y-auto">
            {!query ? (
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-champagne" />
                  Tìm kiếm phổ biến
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs px-3 py-1.5 rounded-full bg-ivory text-charcoal hover:bg-forest hover:text-ivory transition-colors border border-border-subtle cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Gợi ý sản phẩm ({results.length})
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.slug}`}
                    onClick={handleClose}
                    className="flex items-center gap-4 p-2.5 rounded hover:bg-ivory transition-colors group"
                  >
                    <div className="relative w-14 h-14 rounded overflow-hidden bg-ivory-dark shrink-0 border border-border-subtle">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted">{product.categoryName}</p>
                      <h4 className="text-sm font-medium text-charcoal group-hover:text-forest transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold text-forest mt-0.5">
                        {formatVND(product.price)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}

                <button
                  onClick={handleSubmit}
                  className="w-full mt-4 py-2 text-center text-xs font-semibold text-forest hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  Xem tất cả kết quả cho &quot;{query}&quot;
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="py-8 text-center text-muted">
                <p className="text-sm">Không tìm thấy sản phẩm phù hợp với &quot;{query}&quot;</p>
                <p className="text-xs mt-1">Quý khách vui lòng thử từ khóa khác hoặc xem toàn bộ danh mục.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
