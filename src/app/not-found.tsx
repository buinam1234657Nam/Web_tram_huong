import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white border border-border-subtle rounded-sm p-8 text-center space-y-5 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-ivory text-forest flex items-center justify-center mx-auto border border-border-subtle">
          <Compass className="w-8 h-8 opacity-70" />
        </div>

        <div>
          <span className="font-serif text-4xl sm:text-5xl font-bold text-forest block mb-1">
            404
          </span>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            Không Tìm Thấy Trang
          </h1>
          <p className="text-xs text-muted mt-2 leading-relaxed">
            Đường dẫn Quý khách đang truy cập có thể đã được thay đổi hoặc sản phẩm hiện không còn khả dụng trên hệ thống VĨNH TRẦM.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="md" className="flex-1">
            <Link href="/" className="flex items-center justify-center gap-1.5 w-full">
              <Home className="w-4 h-4" />
              <span>Về Trang Chủ</span>
            </Link>
          </Button>
          <Button variant="outline" size="md" className="flex-1">
            <Link href="/san-pham" className="flex items-center justify-center gap-1.5 w-full">
              <span>Xem Sản Phẩm</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
