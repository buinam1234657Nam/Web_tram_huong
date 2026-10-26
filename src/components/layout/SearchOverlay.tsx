"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { formatVND } from "@/lib/format/currency";
import type { ProductSummary } from "@/types/product";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useProductSearch } from "@/hooks/useProductSearch";

const POPULAR_SEARCHES = [
  "Vòng tay 108 hạt",
  "Trầm nụ",
  "Nhang không tăm",
  "Trầm miếng Khánh Hòa",
  "Bộ quà tặng",
];

const SHORTCUTS = [
  { href: "/danh-muc/vong-tay-tram-huong", label: "Vòng tay trầm" },
  { href: "/danh-muc/tram-nu-xong-nha", label: "Trầm nụ xông nhà" },
  { href: "/danh-muc/nhang-tram-huong", label: "Nhang trầm" },
  { href: "/danh-muc/bo-qua-tang", label: "Quà biếu" },
];

const MAX_PREVIEW = 4;

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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useScrollLock(isOpen);

  const trimmed = query.trim();
  // An empty query returns bestsellers for the idle state.
  const search = useProductSearch(trimmed, {
    limit: MAX_PREVIEW,
    enabled: isOpen,
  });

  const goToResults = () => {
    if (!trimmed) return;
    handleClose();
    router.push(`/tim-kiem?q=${encodeURIComponent(trimmed)}`);
  };

  const pickTerm = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
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
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-espresso-dark/40"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: MOTION_EASE }}
            // Full screen on phones; a dropdown sheet from sm up.
            className="relative h-dvh sm:h-auto sm:max-h-[88vh] overflow-y-auto bg-white"
          >
            {/* Search row: same height as the header it covers */}
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                goToResults();
              }}
              className="border-b border-border-subtle"
            >
              <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center gap-3 sm:gap-4">
                <Search
                  className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <label htmlFor="search-overlay-input" className="sr-only">
                  Từ khóa tìm kiếm
                </label>
                <input
                  id="search-overlay-input"
                  ref={inputRef}
                  type="search"
                  enterKeyHint="search"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm trên Vĩnh Trầm"
                  className="flex-1 min-w-0 bg-transparent text-lg sm:text-2xl text-charcoal placeholder:text-muted-light focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => pickTerm("")}
                    className="shrink-0 text-sm text-muted hover:text-charcoal transition-colors cursor-pointer"
                  >
                    Xóa
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  className="-mr-2 w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-charcoal hover:bg-ivory transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso"
                  aria-label="Đóng tìm kiếm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-12">
              {/* Quick links: chips that scroll sideways on mobile, a list on desktop */}
              <nav aria-label="Gợi ý tìm kiếm" className="min-w-0">
                <p className="text-xs font-medium text-muted">Tìm nhiều</p>
                <ul className="mt-3 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:block md:space-y-1">
                  {POPULAR_SEARCHES.map((term) => (
                    <li key={term} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => pickTerm(term)}
                        className="group inline-flex md:flex w-full items-center justify-between gap-2 rounded-full md:rounded-md border border-border-subtle md:border-0 px-3.5 py-1.5 md:px-2 md:-mx-2 md:py-2 text-sm md:text-[15px] text-charcoal hover:bg-ivory transition-colors cursor-pointer"
                      >
                        {term}
                        <ArrowRight
                          className="hidden md:block w-4 h-4 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-xs font-medium text-muted hidden md:block">
                  Lối tắt
                </p>
                <ul className="mt-3 space-y-1 hidden md:block">
                  {SHORTCUTS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleClose}
                        className="group flex items-center justify-between gap-2 rounded-md px-2 -mx-2 py-2 text-[15px] text-charcoal hover:bg-ivory transition-colors"
                      >
                        {link.label}
                        <ArrowRight
                          className="w-4 h-4 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <section aria-live="polite" className="min-w-0">
                {!trimmed ? (
                  <>
                    <p className="text-xs font-medium text-muted">Bán chạy</p>
                    <ProductTiles
                      products={search.query === "" ? search.products : []}
                      onSelect={handleClose}
                    />
                  </>
                ) : search.isLoading || search.total > 0 ? (
                  <>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-xs font-medium text-muted">
                        {search.isLoading
                          ? "Đang tìm…"
                          : `${search.total} sản phẩm cho “${trimmed}”`}
                      </p>
                      <button
                        type="button"
                        onClick={goToResults}
                        className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-charcoal hover:text-gold-dark transition-colors cursor-pointer"
                      >
                        Xem tất cả
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    {/* While a new query loads, keep the previous query's tiles (not the bestsellers) */}
                    <ProductTiles
                      products={search.query ? search.products : []}
                      onSelect={handleClose}
                    />
                  </>
                ) : (
                  <div className="py-10 md:py-16">
                    <p className="text-lg text-charcoal">
                      Chưa có sản phẩm nào khớp “{trimmed}”.
                    </p>
                    <p className="mt-2 text-[15px] text-muted">
                      Thử một từ ngắn hơn, ví dụ “vòng”, “nụ” hay “nhang”.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ProductTiles({
  products,
  onSelect,
}: {
  products: ProductSummary[];
  onSelect: () => void;
}) {
  return (
    <ul className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
      {products.map((product) => (
        <li key={product.id}>
          <Link
            href={`/san-pham/${product.slug}`}
            onClick={onSelect}
            className="group block"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-ivory">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, 180px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-2.5 text-sm font-medium text-charcoal leading-snug line-clamp-2 group-hover:text-gold-dark transition-colors">
              {product.name}
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatVND(product.price)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
