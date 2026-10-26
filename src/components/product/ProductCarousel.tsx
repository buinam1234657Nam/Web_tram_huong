"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "@/components/i18n/Link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { ProductSummary } from "@/types/product";
import { useMessages } from "@/i18n/client";
import { productMessages } from "@/i18n/messages/product";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({
  title,
  products,
  href,
  linkLabel,
  contained = true,
}: {
  title: string;
  products: ProductSummary[];
  href?: string;
  /** Defaults to "Xem tất cả" / "View all". */
  linkLabel?: string;
  /** Wrap in the page-width container; false when the parent already provides it. */
  contained?: boolean;
}) {
  const t = useMessages(productMessages);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, products.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section
      className={contained ? "max-w-site mx-auto px-4 sm:px-6 lg:px-8" : ""}
    >
      <FadeIn className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl text-agarwood">{title}</h2>
        <div className="flex items-center gap-3">
          {href && (
            <Link
              href={href}
              className="text-[15px] font-medium text-charcoal hover:text-gold-dark mr-2"
            >
              {linkLabel ?? t.viewAll}
            </Link>
          )}
          <ArrowButton
            direction="prev"
            disabled={!canPrev}
            onClick={() => scrollByPage(-1)}
          />
          <ArrowButton
            direction="next"
            disabled={!canNext}
            onClick={() => scrollByPage(1)}
          />
        </div>
      </FadeIn>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {products.map((product, idx) => (
          <FadeIn
            key={product.id}
            delay={Math.min(idx, 3) * 0.12}
            className="snap-start shrink-0 basis-[72%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
          >
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const t = useMessages(productMessages);
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? t.prevProducts : t.nextProducts}
      className="hidden sm:flex w-11 h-11 rounded-full bg-ivory items-center justify-center text-charcoal hover:bg-ivory-dark disabled:opacity-40 disabled:hover:bg-ivory cursor-pointer disabled:cursor-default transition-colors"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
