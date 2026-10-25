"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Phone, X } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

/** Routes where a floating button would sit on top of the primary action. */
const HIDDEN_ON = ["/gio-hang", "/thanh-toan"];

/**
 * One small contact button that expands into Zalo / call options, so it
 * doesn't permanently cover page content on small screens.
 */
export function FloatingContactWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="contact-options"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: MOTION_EASE }}
            className="flex flex-col items-end gap-2"
          >
            <a
              href={brandConfig.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-full bg-white border border-border-subtle text-sm font-medium text-charcoal hover:bg-ivory transition-colors"
            >
              Nhắn Zalo
              <MessageCircle className="w-4 h-4 text-gold-dark" />
            </a>
            <a
              href={`tel:${brandConfig.contact.hotline}`}
              className="inline-flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-full bg-white border border-border-subtle text-sm font-medium text-charcoal hover:bg-ivory transition-colors"
            >
              Gọi {brandConfig.contact.phoneFormatted}
              <Phone className="w-4 h-4 text-gold-dark" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls="contact-options"
        aria-label={isOpen ? "Đóng liên hệ" : "Liên hệ tư vấn"}
        className="w-12 h-12 rounded-full bg-espresso text-white flex items-center justify-center hover:bg-espresso-light transition-colors cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
