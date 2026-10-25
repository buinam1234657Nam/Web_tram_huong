"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { mockProducts } from "@/data/mock/products";
import { formatVND } from "@/lib/format/currency";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

const POPULAR_SEARCHES = [
  "Vòng tay 108 hạt",
  "Trầm nụ",
  "Nhang không tăm",
  "Trầm miếng Khánh Hòa",
  "Bộ quà tặng",
];

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
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  goToResults();
                }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 flex items-center gap-3 rounded-full bg-ivory px-5">
                  <Search
                    className="w-5 h-5 text-muted shrink-0"
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
                    className="flex-1 min-w-0 bg-transparent py-3 text-base text-charcoal placeholder:text-muted-light focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full text-charcoal hover:bg-ivory transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso focus-visible:ring-offset-2"
                  aria-label="Đóng tìm kiếm"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 pb-4">
                {!query ? (
                  <div>
                    <p className="text-sm text-muted">Tìm kiếm phổ biến</p>
                    <ul className="mt-3 space-y-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <li key={term}>
                          <button
                            type="button"
                            onClick={() => setQuery(term)}
                            className="text-lg font-medium text-charcoal hover:text-gold-dark transition-colors cursor-pointer"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : results.length > 0 ? (
                  <div>
                    <p className="text-sm text-muted">
                      Sản phẩm gợi ý ({results.length})
                    </p>
                    <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/san-pham/${product.slug}`}
                            onClick={handleClose}
                            className="group block"
                          >
                            <div className="relative aspect-square overflow-hidden bg-ivory">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 50vw, 180px"
                                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                              />
                            </div>
                            <p className="mt-3 text-[15px] font-medium text-charcoal line-clamp-2">
                              {product.name}
                            </p>
                            <p className="mt-1 text-sm text-charcoal">
                              {formatVND(product.price)}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
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
