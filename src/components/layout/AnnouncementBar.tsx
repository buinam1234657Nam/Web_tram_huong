import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, PhoneCall } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";

export function AnnouncementBar() {
  return (
    <aside aria-label="Thông báo ưu đãi" className="bg-forest-dark text-ivory text-[12px] py-2 px-4 border-b border-forest">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-champagne-light">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
            <span>Cam kết 100% trầm tự nhiên nguyên bản</span>
          </div>
          <div className="flex items-center gap-1.5 text-ivory/80">
            <Truck className="w-3.5 h-3.5 text-champagne" />
            <span>Miễn phí giao hàng từ 1.000.000₫ • Đồng kiểm khi nhận</span>
          </div>
        </div>

        <div className="w-full md:w-auto text-center md:text-right flex items-center justify-center md:justify-end gap-4">
          <span className="md:hidden text-champagne-light">
            Trầm hương tự nhiên Khánh Hòa • Miễn phí vận chuyển từ 1.000.000₫
          </span>
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-champagne hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span className="font-semibold tracking-wider">{brandConfig.contact.phoneFormatted}</span>
          </a>
          <Link
            href="/chinh-sach/chinh-sach-bao-hanh"
            className="hidden lg:inline text-ivory/70 hover:text-white text-[11px] underline underline-offset-2"
          >
            Chính sách bảo hành
          </Link>
        </div>
      </div>
    </aside>
  );
}
