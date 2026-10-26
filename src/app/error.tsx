"use client";

import React, { useEffect } from "react";
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
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
      <p className="text-sm font-medium text-gold-dark">Đã có lỗi</p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-agarwood tracking-tight">
        Trang chưa tải được
      </h1>
      <p className="mt-4 text-[15px] sm:text-base text-muted leading-relaxed">
        Có sự cố ngoài dự kiến. Bạn thử tải lại trang, hoặc gọi{" "}
        <a
          href={`tel:${brandConfig.contact.hotline}`}
          className="text-charcoal underline underline-offset-4"
        >
          {brandConfig.contact.phoneFormatted}
        </a>{" "}
        nếu cần hỗ trợ.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Thử lại</Button>
        <Button href="/" variant="outline">
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
