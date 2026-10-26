"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { formatVND } from "@/lib/format/currency";
import { useMessages } from "@/i18n/client";
import { homeMessages } from "@/i18n/messages/home";

export interface ShowcaseProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  /** Owner's story line, or the product summary until one is written. */
  line: string;
  price: number;
  /** Variants differ in price, so the price reads "Từ …". */
  fromPrice: boolean;
  bestseller: boolean;
}

export interface ShowcaseCollection {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 40;

/**
 * "Tuyển tác phẩm": one large card cycling through the featured products,
 * beside two collection cards. Cream editorial look with serif titles.
 */
export function FeaturedShowcase({
  products,
  collections,
}: {
  products: ShowcaseProduct[];
  collections: ShowcaseCollection[];
}) {
  const t = useMessages(homeMessages);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const dragStartX = useRef<number | null>(null);
  const count = products.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (count < 2 || isPaused || reduceMotion) return;
    const timer = setTimeout(() => {
      if (document.visibilityState === "visible") go(index + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, isPaused, reduceMotion, count, go]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-[minmax(0,2.6fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 lg:gap-5">
      {/* Large product carousel */}
      <div
        className="col-span-2 lg:col-span-1 flex flex-col"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          aria-roledescription="carousel"
          aria-label={t.showcaseLabel}
          className="relative flex-1"
          onPointerDown={(e) => {
            dragStartX.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (dragStartX.current === null) return;
            const dx = e.clientX - dragStartX.current;
            dragStartX.current = null;
            if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="relative h-full min-h-[440px] sm:min-h-[420px] overflow-hidden rounded-2xl bg-espresso-dark">
            {products.map((product, idx) => {
              const isActive = idx === index;
              return (
                <div
                  key={product.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} / ${count}`}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className={`object-cover transition-transform duration-[6000ms] ease-out ${
                      isActive && !reduceMotion ? "scale-105" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-espresso-dark/90 via-espresso-dark/45 to-transparent sm:bg-linear-to-r sm:from-espresso-dark/85 sm:via-espresso-dark/45 sm:to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 sm:inset-y-0 sm:right-auto flex flex-col justify-end sm:justify-center p-6 sm:p-10 sm:max-w-[60%]">
                    {product.bestseller && (
                      <span className="self-start rounded-full border border-gold-light/60 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">
                        {t.bestseller}
                      </span>
                    )}
                    <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-medium text-white leading-snug text-balance">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm sm:text-[15px] text-white/75 leading-relaxed line-clamp-2">
                      {product.line}
                    </p>
                    <p className="mt-4 text-lg font-semibold text-white">
                      {product.fromPrice && (
                        <span className="text-sm font-normal text-white/60">{t.from} </span>
                      )}
                      {formatVND(product.price)}
                    </p>
                    <Link
                      href={`/san-pham/${product.slug}`}
                      tabIndex={isActive ? 0 : -1}
                      className="mt-6 self-start inline-flex items-center gap-2 h-12 px-7 rounded-full bg-linear-to-r from-gold-light to-gold text-[15px] font-medium text-espresso-dark shadow-lg shadow-black/20 hover:from-gold hover:to-gold-dark hover:text-white transition-colors"
                    >
                      {t.viewDetails}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {count > 1 && (
            <>
              <CarouselArrow
                direction="prev"
                onClick={() => go(index - 1)}
                className="left-3 lg:-left-5"
              />
              <CarouselArrow
                direction="next"
                onClick={() => go(index + 1)}
                className="right-3 lg:-right-5"
              />
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-3 flex justify-center gap-1">
            {products.map((product, idx) => (
              <button
                key={product.id}
                type="button"
                onClick={() => go(idx)}
                aria-label={t.showcaseGoTo(idx + 1)}
                aria-current={idx === index}
                className="group h-8 px-1.5 flex items-center cursor-pointer"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    idx === index ? "w-6 bg-gold" : "w-1.5 bg-gold/35 group-hover:bg-gold/60"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Collection cards */}
      {collections.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ivory shadow-sm shadow-espresso/5 hover:shadow-md transition-shadow lg:mb-11"
        >
          <div className="relative aspect-4/3 lg:aspect-auto lg:flex-1 lg:min-h-[260px] overflow-hidden bg-cream-dark">
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(max-width: 1024px) 50vw, 20vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          </div>
          <div className="p-4 sm:p-5">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-espresso leading-snug">
              {c.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{c.subtitle}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-agarwood group-hover:text-gold-dark transition-colors">
              {t.explore}
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className: string;
}) {
  const t = useMessages(homeMessages);
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? t.showcasePrev : t.showcaseNext}
      className={`absolute z-20 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-espresso shadow-md shadow-black/15 flex items-center justify-center hover:bg-cream transition-colors cursor-pointer ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
