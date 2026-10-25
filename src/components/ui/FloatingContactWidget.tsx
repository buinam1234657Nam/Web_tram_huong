"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

/** Routes where a floating button would sit on top of the primary action. */
const HIDDEN_ON = ["/gio-hang", "/thanh-toan"];

const RING_RADIUS = 22;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Zalo and hotline buttons, plus a scroll-to-top button once the page is scrolled. */
export function FloatingContactWidget() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        setScrollProgress(Math.min(1, Math.max(0, progress)));
        setShowScrollTop(window.scrollY > 300);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (HIDDEN_ON.includes(pathname)) return null;

  const circleButton =
    "group relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors";
  const tooltip =
    "absolute right-14 whitespace-nowrap bg-espresso text-white text-xs font-medium px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
      <a
        href={brandConfig.social.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tư vấn qua Zalo"
        className={`${circleButton} bg-gold text-white hover:bg-gold-dark`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className={tooltip}>Tư vấn Zalo</span>
      </a>

      <a
        href={`tel:${brandConfig.contact.hotline}`}
        aria-label="Gọi hotline tư vấn"
        className={`${circleButton} bg-espresso text-white hover:bg-espresso-light`}
      >
        <Phone className="w-5 h-5" />
        <span className={tooltip}>
          Hotline: {brandConfig.contact.phoneFormatted}
        </span>
      </a>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Cuộn lên đầu trang"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: MOTION_EASE }}
            className="relative w-11 h-11 rounded-full bg-white border border-border-subtle text-charcoal hover:text-gold-dark shadow-lg flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              className="absolute -inset-1 w-[52px] h-[52px] -rotate-90 pointer-events-none"
              viewBox="0 0 52 52"
              aria-hidden="true"
            >
              <circle
                cx="26"
                cy="26"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--color-border-subtle)"
                strokeWidth="2"
              />
              <circle
                cx="26"
                cy="26"
                r={RING_RADIUS}
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="2"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={RING_CIRCUMFERENCE * (1 - scrollProgress)}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
