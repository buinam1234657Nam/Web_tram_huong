import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  robots: {
    index: false,
    follow: true,
  },
};

const SUGGESTIONS = [
  { label: "Vòng tay trầm hương", href: "/danh-muc/vong-tay-tram-huong" },
  { label: "Trầm nụ & xông hương", href: "/danh-muc/tram-nu-xong-nha" },
  { label: "Nhang trầm tự nhiên", href: "/danh-muc/nhang-tram-huong" },
  { label: "Bộ quà tặng", href: "/danh-muc/bo-qua-tang" },
];

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
      <p className="text-sm font-medium text-gold-dark">Lỗi 404</p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-charcoal tracking-tight">
        Không tìm thấy trang này
      </h1>
      <p className="mt-4 text-[15px] sm:text-base text-muted leading-relaxed">
        Đường dẫn có thể đã thay đổi hoặc sản phẩm không còn bán. Hãy thử tìm
        kiếm hoặc xem các danh mục bên dưới.
      </p>

      {/* Plain GET form: works without JavaScript and lands on the search page. */}
      <form
        action="/tim-kiem"
        method="get"
        role="search"
        className="mt-10 mx-auto max-w-md flex items-center gap-2 rounded-full bg-ivory pl-5 pr-1.5 py-1.5"
      >
        <Search className="w-5 h-5 text-muted shrink-0" aria-hidden="true" />
        <label htmlFor="not-found-search" className="sr-only">
          Tìm sản phẩm
        </label>
        <input
          id="not-found-search"
          type="text"
          enterKeyHint="search"
          name="q"
          placeholder="Vòng tay, trầm nụ, nhang…"
          className="flex-1 min-w-0 bg-transparent py-2.5 text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none"
        />
        <Button type="submit" className="shrink-0 whitespace-nowrap">
          Tìm
        </Button>
      </form>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex px-4 py-2 rounded-full border border-border-subtle text-sm text-charcoal hover:border-charcoal transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button href="/">Về trang chủ</Button>
        <Button href="/san-pham" variant="outline">
          Xem tất cả sản phẩm
        </Button>
      </div>
    </div>
  );
}
