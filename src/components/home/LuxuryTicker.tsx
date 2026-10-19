"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function LuxuryTicker() {
  const items = [
    "100% TRẦM TỰ NHIÊN RỪNG KHÁNH HÒA",
    "BẢO DƯỠNG ĐÁNH BÓNG MỘC TRỌN ĐỜI",
    "KHÔNG ÉP DẦU HÓA CHẤT NHÂN TẠO",
    "MIỄN PHÍ VẬN CHUYỂN TỪ 1.000.000₫",
    "QUYỀN LỢI ĐỒNG KIỂM CÙNG BƯU TÁ",
    "NGHỆ NHÂN VIỆT NAM CHẾ TÁC THỦ CÔNG",
  ];

  return (
    <div
      aria-label="Thông điệp thương hiệu"
      className="w-full bg-forest text-champagne-light py-2.5 overflow-hidden border-y border-champagne/20 select-none"
    >
      <div className="flex animate-ticker whitespace-nowrap text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
        <div className="flex items-center gap-8 shrink-0">
          {items.map((item, idx) => (
            <span key={`ticker-1-${idx}`} className="flex items-center gap-3">
              <Sparkles className="w-3 h-3 text-champagne shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-8 shrink-0 ml-8">
          {items.map((item, idx) => (
            <span key={`ticker-2-${idx}`} className="flex items-center gap-3">
              <Sparkles className="w-3 h-3 text-champagne shrink-0" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
