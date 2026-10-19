"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";

export function FloatingContactWidget() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, progress)));
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 138.23; // 2 * pi * 22
  const strokeDashoffset = circumference - (circumference * scrollProgress) / 100;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Zalo Button - Luxury Gold Tone */}
      <a
        href="https://zalo.me/0908866989"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tư vấn nhanh qua Zalo"
        className="group relative w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A46D] via-[#B89355] to-[#8C6B2D] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-[#E2D0B3]/40"
      >
        <span className="absolute -inset-1 rounded-full bg-[#C5A46D]/40 animate-ping duration-1000 -z-10" />
        <MessageCircle className="w-6 h-6 text-ivory drop-shadow-xs" />
        {/* Tooltip */}
        <span className="absolute right-14 whitespace-nowrap bg-charcoal text-ivory text-xs px-2.5 py-1 rounded-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium border border-border-subtle/50">
          Tư vấn Zalo 24/7
        </span>
      </a>

      {/* Hotline Call Button */}
      <a
        href={`tel:${brandConfig.contact.hotline}`}
        aria-label="Gọi hotline tư vấn"
        className="group relative w-12 h-12 rounded-full bg-forest text-champagne shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-champagne/40"
      >
        <Phone className="w-5 h-5 animate-bounce duration-1000" />
        {/* Tooltip */}
        <span className="absolute right-14 whitespace-nowrap bg-charcoal text-ivory text-xs px-2.5 py-1 rounded-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
          Hotline: {brandConfig.contact.phoneFormatted}
        </span>
      </a>

      {/* Scroll to Top Button with Circular Progress Ring */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="group relative w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-border-subtle text-charcoal hover:text-forest shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in zoom-in"
        >
          {/* Circular Progress Ring */}
          <svg
            className="absolute -inset-1 w-[52px] h-[52px] -rotate-90 pointer-events-none"
            viewBox="0 0 52 52"
          >
            <circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="#E3DCCF"
              strokeWidth="2.5"
            />
            <circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="#C5A46D"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}
    </div>
  );
}
