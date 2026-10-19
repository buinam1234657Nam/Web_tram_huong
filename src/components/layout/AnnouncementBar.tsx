import React from "react";
import Link from "next/link";
import { Sparkles, PhoneCall } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Thông báo ưu đãi"
      className="bg-[#1A2520] text-[#F5F5F7] text-[13px] py-2.5 px-4 border-b border-[#28392F]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: subtle brand hint */}
        <div className="hidden lg:flex items-center gap-2 text-[#C5A46D] text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span>VĨNH TRẦM • Thủ Công Đất Việt</span>
        </div>

        {/* Center: Exact static announcement requested */}
        <div className="w-full lg:w-auto text-center font-medium tracking-wide text-xs sm:text-[13px]">
          <span>Miễn phí vận chuyển toàn quốc cho đơn hàng từ 1.000.000đ</span>
          <span className="mx-2 text-[#C5A46D]">•</span>
          <span className="text-[#C5A46D] font-semibold">Cam kết 100% trầm tự nhiên</span>
        </div>

        {/* Right: Hotline */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="inline-flex items-center gap-1.5 text-[#F5F5F7]/90 hover:text-[#C5A46D] transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-[#C5A46D]" />
            <span>Hotline: <strong className="text-[#C5A46D]">{brandConfig.contact.phoneFormatted}</strong></span>
          </a>
          <Link
            href="/chinh-sach/chinh-sach-bao-hanh"
            className="text-[#F5F5F7]/70 hover:text-[#C5A46D] transition-colors underline underline-offset-2 text-[11px]"
          >
            Bảo hành trọn đời
          </Link>
        </div>
      </div>
    </aside>
  );
}
