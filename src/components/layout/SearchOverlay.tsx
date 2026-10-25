"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { mockProducts } from "@/data/mock/products";
import { formatVND } from "@/lib/format/currency";
import type { Product } from "@/types/product";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

const POPULAR_SEARCHES = [
  "Vòng tay 108 hạt",
  "Trầm nụ",
  "Nhang không tăm",
  "Trầm miếng Khánh Hòa",
  "Bộ quà tặng",
];

const BESTSELLERS = mockProducts.filter((p) => p.bestseller).slice(0, 4);

function ProductTiles({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: () => void;
}) {
  return (
    <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            href={`/san-pham/${product.slug}`}
            onClick={onSelect}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-ivory">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, 160px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <p className="mt-2.5 text-sm font-medium text-charcoal line-clamp-2 group-hover:text-gold-dark transition-colors">
              {product.name}
            </p>
            <p className="mt-0.5 text-sm text-muted">
              {formatVND(product.price)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

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

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // The parent passes a fresh onClose each render; keep the latest close handler in a
  // ref so the open/close effect below only re-runs when isOpen changes.
  const onCloseRef = useRef(handleClose);
  useEffect(() => {
    onCloseRef.current = handleClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
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
          p.seo.keywords.some((k) => k.toLowerCase().includes(q)),
      )
      .slice(0, 4);
  }, [query]);

  const goToResults = () => {
    if (!query.trim()) return;
    handleClose();
    router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Tìm kiếm sản phẩm"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-espresso-dark/30"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: MOTION_EASE }}
            className="relative bg-white max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-5 pb-8">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  goToResults();
                }}
                className="flex items-center gap-2"
              >
                <div className="flex-1 flex items-center gap-3 h-12 rounded-full bg-ivory px-4 border border-transparent focus-within:border-border-subtle focus-within:bg-white transition-colors">
                  <Search
                    className="w-[18px] h-[18px] text-muted shrink-0"
                    aria-hidden="true"
                  />
                  <label htmlFor="search-overlay-input" className="sr-only">
                    Từ khóa tìm kiếm
                  </label>
                  <input
                    id="search-overlay-input"
                    ref={inputRef}
                    type="text"
                    enterKeyHint="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Tìm vòng tay, nhang, trầm nụ…"
                    className="flex-1 min-w-0 bg-transparent text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="text-xs text-muted hover:text-charcoal transition-colors cursor-pointer"
                    >
                      Xóa
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-charcoal hover:bg-ivory transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2"
                  aria-label="Đóng tìm kiếm"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-7">
                {!query ? (
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                        Tìm kiếm phổ biến
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {POPULAR_SEARCHES.map((term) => (
                          <li key={term}>
                            <button
                              type="button"
                              onClick={() => setQuery(term)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border-subtle text-sm text-charcoal hover:border-gold hover:text-gold-dark transition-colors cursor-pointer"
                            >
                              <Search
                                className="w-3.5 h-3.5 text-muted-light"
                                aria-hidden="true"
                              />
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {BESTSELLERS.length > 0 && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                          Bán chạy
                        </p>
                        <ProductTiles
                          products={BESTSELLERS}
                          onSelect={handleClose}
                        />
                      </div>
                    )}
                  </div>
                ) : results.length > 0 ? (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                      Sản phẩm gợi ý ({results.length})
                    </p>
                    <ProductTiles products={results} onSelect={handleClose} />
                    <button
                      type="button"
                      onClick={goToResults}
                      className="mt-8 text-[15px] font-medium text-charcoal underline underline-offset-4 hover:text-gold-dark transition-colors cursor-pointer"
                    >
                      Xem tất cả kết quả cho “{query}”
                    </button>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-[15px] text-charcoal">
                      Không tìm thấy sản phẩm cho “{query}”
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Thử từ khóa khác hoặc xem toàn bộ sản phẩm.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
