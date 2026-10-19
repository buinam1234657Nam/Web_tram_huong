"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { mockCategories } from "@/data/mock/categories";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message || "Đăng ký thành công!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch {
      setStatus("error");
      setMessage("Không thể kết nối đến máy chủ, vui lòng thử lại sau.");
    }
  };

  return (
    <footer className="bg-forest-dark text-ivory/80 pt-16 pb-12 border-t border-forest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-forest rounded-sm p-6 sm:p-10 mb-16 border border-champagne/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold block mb-1">
                Bản Tin Thưởng Trầm
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory mb-2">
                Đăng Ký Nhận Kiến Thức & Ưu Đãi Độc Quyền
              </h3>
              <p className="text-xs sm:text-sm text-ivory/70 max-w-lg">
                Nhận cẩm nang nhận biết trầm hương thật giả, phương pháp xông phòng an định và thông tin về các mẻ trầm quý tự nhiên mới về.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email của Quý khách..."
                  required
                  className="flex-1 bg-ivory text-charcoal px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-champagne placeholder-stone-500"
                />
                <Button
                  type="submit"
                  variant="champagne"
                  size="md"
                  isLoading={status === "loading"}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Đăng Ký
                </Button>
              </div>

              {status === "success" && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{message}</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{message}</span>
                </div>
              )}
              <p className="text-[11px] text-ivory/50">
                VĨNH TRẦM cam kết bảo mật thông tin và không gửi thư rác.
              </p>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-light/60">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-ivory block">
                {brandConfig.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne block mt-0.5">
                {brandConfig.tagline}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-ivory/70 pr-4">
              {brandConfig.storySummary}
            </p>
            <div className="pt-2 text-xs space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span><strong>Xưởng chế tác:</strong> {brandConfig.contact.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span><strong>Showroom:</strong> {brandConfig.contact.showroomAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-champagne shrink-0" />
                <span>{brandConfig.contact.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-base font-semibold text-ivory mb-4 tracking-wide">
              Bộ Sưu Tập
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {mockCategories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/danh-muc/${c.slug}`}
                    className="hover:text-champagne transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/san-pham"
                  className="text-champagne hover:underline inline-flex items-center gap-1 font-medium pt-1"
                >
                  Tất cả sản phẩm →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-ivory mb-4 tracking-wide">
              Chính Sách & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/chinh-sach/chinh-sach-bao-hanh"
                  className="hover:text-champagne transition-colors"
                >
                  Chính sách bảo hành & đánh bóng
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/chinh-sach-doi-tra"
                  className="hover:text-champagne transition-colors"
                >
                  Chính sách đổi trả trong 7 ngày
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/chinh-sach-giao-hang"
                  className="hover:text-champagne transition-colors"
                >
                  Chính sách vận chuyển & đồng kiểm
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/chinh-sach-bao-mat"
                  className="hover:text-champagne transition-colors"
                >
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="/gio-hang"
                  className="hover:text-champagne transition-colors"
                >
                  Kiểm tra giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="font-serif text-base font-semibold text-ivory mb-4 tracking-wide">
              Liên Hệ Trực Tiếp
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <span className="block text-ivory/50 text-[11px]">Hotline tư vấn trầm:</span>
                <a
                  href={`tel:${brandConfig.contact.hotline}`}
                  className="text-champagne font-bold text-base hover:underline"
                >
                  {brandConfig.contact.phoneFormatted}
                </a>
              </li>
              <li>
                <span className="block text-ivory/50 text-[11px]">Email hỗ trợ khách hàng:</span>
                <a
                  href={`mailto:${brandConfig.contact.email}`}
                  className="hover:text-champagne transition-colors"
                >
                  {brandConfig.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-champagne-light bg-forest/80 px-2.5 py-1.5 rounded border border-champagne/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne" />
                  Đồng kiểm khi giao hàng
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory/50 gap-4">
          <p>
            © 2026 {brandConfig.name}. Bảo lưu mọi quyền. Tinh hoa trầm hương Việt Nam.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach/chinh-sach-bao-mat" className="hover:underline">
              Bảo mật
            </Link>
            <span>•</span>
            <Link href="/chinh-sach/chinh-sach-giao-hang" className="hover:underline">
              Vận chuyển
            </Link>
            <span>•</span>
            <Link href="/ve-chung-toi" className="hover:underline">
              Câu chuyện thương hiệu
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
