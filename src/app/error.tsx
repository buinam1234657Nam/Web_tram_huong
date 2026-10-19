"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, PhoneCall } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { brandConfig } from "@/lib/config/brand";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error tracking
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-ivory relative overflow-hidden">
      {/* Subtle warm glow background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full opacity-30 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(150, 107, 69, 0.25) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-white/95 backdrop-blur-md border border-border-subtle rounded-sm p-8 sm:p-10 text-center space-y-6 shadow-xl"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200 shadow-xs"
        >
          <AlertCircle className="w-8 h-8" />
        </motion.div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-1">
            Thông Báo Hệ Thống
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal">
            Có Lỗi Phát Sinh
          </h1>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            Hệ thống gặp sự cố ngoài dự kiến trong quá trình xử lý yêu cầu. Quý khách vui lòng thử tải lại trang hoặc liên hệ trực tiếp nghệ nhân hỗ trợ.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
            className="flex-1"
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Thử Lại
          </Button>
          <Button
            href="/"
            variant="outline"
            size="md"
            className="flex-1"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Trang Chủ
          </Button>
        </div>

        <div className="pt-2 border-t border-border-subtle/70 text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Hỗ trợ kỹ thuật 24/7:</span>
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="font-semibold text-forest hover:underline"
          >
            {brandConfig.contact.phoneFormatted}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
