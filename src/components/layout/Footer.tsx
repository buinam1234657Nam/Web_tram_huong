"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { mockCategories } from "@/data/mock/categories";

const POLICY_LINKS = [
  { href: "/chinh-sach/chinh-sach-bao-hanh", label: "Bảo hành & đánh bóng" },
  { href: "/chinh-sach/chinh-sach-doi-tra", label: "Đổi trả trong 7 ngày" },
  { href: "/chinh-sach/chinh-sach-giao-hang", label: "Vận chuyển & đồng kiểm" },
  { href: "/chinh-sach/chinh-sach-bao-mat", label: "Bảo mật thông tin" },
];

const ABOUT_LINKS = [
  { href: "/ve-chung-toi", label: "Câu chuyện thương hiệu" },
  { href: "/bai-viet", label: "Tin tức & kiến thức trầm" },
  { href: "/gio-hang", label: "Giỏ hàng" },
];

export function Footer() {
  const pathname = usePathname();
  const isCheckoutPage = pathname === "/thanh-toan";
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
    <footer className="bg-espresso-dark text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isCheckoutPage && (
          <div className="py-14 border-b border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <h3 className="text-2xl sm:text-3xl text-white">Nhận tin từ Vĩnh Trầm</h3>
              <p className="mt-2 text-white/60 max-w-md">
                Kiến thức thưởng trầm, bộ sưu tập mới và ưu đãi dành riêng cho thành viên.
              </p>
            </div>
            <form onSubmit={handleSubscribe}>
              <div className="flex border-b border-white/30 focus-within:border-gold transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Địa chỉ email"
                  required
                  aria-label="Địa chỉ email"
                  className="flex-1 bg-transparent py-3 text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="p-3 text-white hover:text-gold-light transition-colors disabled:opacity-50 cursor-pointer"
                  aria-label="Đăng ký nhận tin"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              {status === "success" && <p className="mt-2 text-xs text-gold-light">{message}</p>}
              {status === "error" && <p className="mt-2 text-xs text-rose-300">{message}</p>}
            </form>
          </div>
        )}

        <div className="py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-2 lg:col-span-4 space-y-4 lg:pr-10">
            <p className="text-white text-lg font-semibold tracking-[0.28em]">{brandConfig.name}</p>
            <p className="leading-relaxed text-white/60">{brandConfig.storySummary}</p>
            <div className="space-y-1.5 text-white/60">
              <p>Showroom: {brandConfig.contact.showroomAddress}</p>
              <p>Giờ mở cửa: {brandConfig.contact.workingHours}</p>
              <p>
                Hotline:{" "}
                <a href={`tel:${brandConfig.contact.hotline}`} className="text-gold-light hover:text-white">
                  {brandConfig.contact.phoneFormatted}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${brandConfig.contact.email}`} className="hover:text-white">
                  {brandConfig.contact.email}
                </a>
              </p>
            </div>
          </div>

          <FooterColumn title="Sản phẩm" className="lg:col-span-3">
            {mockCategories.map((c) => (
              <FooterLink key={c.id} href={`/danh-muc/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Chính sách" className="lg:col-span-3">
            {POLICY_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Về chúng tôi" className="lg:col-span-2">
            {ABOUT_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <li className="pt-2 flex gap-4">
              <a href={brandConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
              <a href={brandConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>© 2026 {brandConfig.name}. Bảo lưu mọi quyền.</p>
          <p>{brandConfig.origin}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h4 className="text-xs uppercase tracking-[0.18em] text-gold-light font-medium mb-5">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}
