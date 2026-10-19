"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";

export function FloatingContactWidget() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0908866989"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Tư vấn nhanh qua Zalo"
        className="group relative w-12 h-12 rounded-full bg-[#0068FF] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute -inset-1 rounded-full bg-[#0068FF]/35 animate-ping duration-1000 -z-10" />
        <MessageCircle className="w-6 h-6" />
        {/* Tooltip */}
        <span className="absolute right-14 whitespace-nowrap bg-charcoal text-ivory text-xs px-2.5 py-1 rounded-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-border-subtle text-charcoal hover:bg-forest hover:text-ivory shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-in fade-in zoom-in"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
