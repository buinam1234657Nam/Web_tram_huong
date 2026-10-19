"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-border-subtle rounded-sm p-8 text-center space-y-5 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            Có Lỗi Phát Sinh
          </h1>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            Hệ thống gặp sự cố ngoài dự kiến trong quá trình xử lý yêu cầu. Quý khách vui lòng thử tải lại trang hoặc liên hệ bộ phận hỗ trợ.
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
          <Button variant="outline" size="md" className="flex-1">
            <Link href="/" className="flex items-center justify-center gap-1.5 w-full">
              <Home className="w-4 h-4" />
              <span>Trang Chủ</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
