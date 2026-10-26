"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";
import type { HeroSlide } from "@/data/content/home";
import { HeroVideo } from "./HeroVideo";
import { useMessages } from "@/i18n/client";
import { homeMessages } from "@/i18n/messages/home";

const AUTOPLAY_MS = 6000;
/** Horizontal drag (px) that counts as a swipe rather than a tap. */
const SWIPE_PX = 40;

/**
 * Full-bleed banner carousel. Crossfades, autoplays (paused on hover, focus,
 * a hidden tab, or reduced motion) and swipes on touch. Every slide is
 * rendered so search engines and no-JS visitors still get all the links.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const t = useMessages(homeMessages);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const dragStartX = useRef<number | null>(null);
  const count = slides.length;

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
    <section
      aria-roledescription="carousel"
      aria-label={t.heroLabel}
      className="relative w-full aspect-4/5 sm:aspect-video lg:aspect-8/3 bg-espresso-dark overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
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
      {slides.map((slide, idx) => {
        const isActive = idx === index;
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} / ${count}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              // Only the first slide is the LCP candidate.
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "auto"}
              className={`object-cover ${slide.mobileImage ? "hidden sm:block" : ""}`}
            />
            {slide.mobileImage && (
              <Image
                src={slide.mobileImage}
                alt={slide.alt}
                fill
                sizes="100vw"
                loading={idx === 0 ? "eager" : "lazy"}
                className="object-cover sm:hidden"
              />
            )}
            {slide.video && <HeroVideo sources={slide.video} />}

            {slide.caption ? (
              <>
                <div className="absolute inset-0 bg-linear-to-t from-espresso-dark/85 via-espresso-dark/25 to-transparent sm:bg-linear-to-r sm:from-espresso-dark/80 sm:via-espresso-dark/30" />
                <div className="absolute inset-x-0 bottom-0 max-w-site mx-auto px-6 sm:px-24 lg:px-28 pb-16 sm:pb-0 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto">
                  <motion.div
                        initial={false}
                        animate={
                          isActive
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: reduceMotion ? 0 : 16 }
                        }
                        transition={{
                          duration: 0.9,
                          delay: isActive ? 0.25 : 0,
                          ease: MOTION_EASE,
                        }}
                        className="max-w-xl"
                      >
                        <p className="text-sm sm:text-[15px] font-medium tracking-wide text-gold-light">
                          {slide.caption.eyebrow}
                        </p>
                        {/* Looser leading so Vietnamese diacritics don't collide */}
                        {idx === 0 ? (
                          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-white leading-[1.18] sm:leading-[1.12] tracking-tight">
                            {slide.caption.title}
                          </h1>
                        ) : (
                          <p className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-white leading-[1.18] sm:leading-[1.12] tracking-tight">
                            {slide.caption.title}
                          </p>
                        )}
                        <Link
                          href={slide.cta.href}
                          tabIndex={isActive ? 0 : -1}
                          className="mt-7 inline-flex items-center h-12 px-7 rounded-full bg-gold text-white text-[15px] font-medium hover:bg-gold-dark transition-colors"
                        >
                          {slide.cta.label}
                        </Link>
                  </motion.div>
                </div>
              </>
            ) : (
              // Banner art carries its own copy: the whole slide is the link.
              <Link
                href={slide.cta.href}
                tabIndex={isActive ? 0 : -1}
                aria-label={slide.cta.label}
                className="absolute inset-0"
              />
            )}
          </div>
        );
      })}

      {count > 1 && (
        <>
          <div className="absolute z-20 bottom-5 inset-x-0 flex justify-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => go(idx)}
                aria-label={t.heroGoTo(idx + 1)}
                aria-current={idx === index}
                // 44px tall hit area around a thin bar
                className="group h-11 px-1 flex items-center cursor-pointer"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    idx === index
                      ? "w-8 bg-gold-light"
                      : "w-4 bg-white/50 group-hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
          {/* Split to both edges, vertically centred; phones swipe instead */}
          <SlideArrow
            direction="prev"
            onClick={() => go(index - 1)}
            className="left-3 sm:left-6"
          />
          <SlideArrow
            direction="next"
            onClick={() => go(index + 1)}
            className="right-3 sm:right-6"
          />
        </>
      )}
    </section>
  );
}

function SlideArrow({
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
      aria-label={direction === "prev" ? t.heroPrev : t.heroNext}
      className={`hidden sm:flex absolute z-20 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 bg-espresso-dark/25 backdrop-blur-sm text-white items-center justify-center hover:bg-white/20 transition-colors cursor-pointer ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
