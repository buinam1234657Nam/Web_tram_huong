import React from "react";
import Link from "next/link";
import { brandConfig } from "@/lib/config/brand";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Thông báo ưu đãi"
      className="bg-espresso-dark text-white/85 text-xs py-2.5 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-between gap-4">
        <span className="hidden lg:block text-white/60">
          Hotline{" "}
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="text-white hover:text-gold-light transition-colors"
          >
            {brandConfig.contact.phoneFormatted}
          </a>
        </span>

        <p className="text-center">
          Miễn phí vận chuyển cho đơn từ 1.000.000đ.{" "}
          <Link
            href="/chinh-sach/chinh-sach-giao-hang"
            className="text-gold-light underline underline-offset-2 hover:text-white transition-colors"
          >
            Tìm hiểu thêm
          </Link>
        </p>

        <Link
          href="/chinh-sach/chinh-sach-bao-hanh"
          className="hidden lg:block text-white/60 hover:text-white transition-colors"
        >
          Bảo hành dây trọn đời
        </Link>
      </div>
    </aside>
  );
}
