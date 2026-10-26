"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { mockCategories } from "@/data/mock/categories";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { DoBauBranch } from "@/components/ui/AgarwoodOrnaments";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  ZaloIcon,
} from "@/components/ui/SocialIcons";

const POLICY_LINKS = [
  { href: "/chinh-sach/chinh-sach-bao-hanh", label: "Bảo hành & đánh bóng" },
  { href: "/chinh-sach/chinh-sach-doi-tra", label: "Đổi trả trong 7 ngày" },
  { href: "/chinh-sach/chinh-sach-giao-hang", label: "Vận chuyển & đồng kiểm" },
  { href: "/chinh-sach/chinh-sach-bao-mat", label: "Bảo mật thông tin" },
];

const ABOUT_LINKS = [
  { href: "/ve-chung-toi", label: "Câu chuyện thương hiệu" },
  { href: "/hieu-ve-tram", label: "Hiểu về trầm" },
  { href: "/bai-viet", label: "Tin tức & kiến thức trầm" },
  { href: "/gio-hang", label: "Giỏ hàng" },
];

const SOCIAL_LINKS = [
  { href: brandConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: brandConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: brandConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: brandConfig.social.zalo, label: "Zalo", Icon: ZaloIcon },
];

export function Footer() {
  const pathname = usePathname();
  // Checkout stays distraction-free; the home page has its own signup next to the showroom.
  const showNewsletter = pathname !== "/thanh-toan" && pathname !== "/";
  const { contact } = brandConfig;

  return (
    <footer className="relative overflow-hidden bg-espresso-dark text-white/70 text-sm">
      {/* Faint dó bầu sprigs growing in from two corners */}
      <DoBauBranch className="-left-20 -bottom-24 size-130 opacity-20 hidden md:block" />
      <DoBauBranch className="-right-24 -top-28 size-100 opacity-12 rotate-180 hidden md:block" />

      <div className="relative max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {showNewsletter && (
          <div className="py-10 border-b border-white/10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,560px)] gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl text-white">Nhận tin từ Vĩnh Trầm</h3>
              <p className="mt-1 text-white/55">
                Kiến thức thưởng trầm, bộ sưu tập mới và ưu đãi dành riêng cho thành viên.
              </p>
            </div>
            <NewsletterForm variant="pill" />
          </div>
        )}

        <div className="py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-2 lg:col-span-4 lg:pr-10">
            <Link href="/" className="inline-block leading-none">
              <span className="block text-xl font-semibold tracking-[0.28em] text-gold-light">
                {brandConfig.name}
              </span>
              <span className="block mt-1.5 text-[10px] uppercase tracking-[0.34em] text-white/50">
                Trầm Hương Việt
              </span>
            </Link>
            <p className="mt-5 leading-relaxed text-white/60">{brandConfig.storySummary}</p>

            <ul className="mt-6 space-y-3">
              <ContactRow icon={MapPin}>{contact.showroomAddress}</ContactRow>
              <ContactRow icon={Phone}>
                <a href={`tel:${contact.hotline}`} className="text-gold-light hover:text-white transition-colors">
                  {contact.phoneFormatted}
                </a>
              </ContactRow>
              <ContactRow icon={Mail}>
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow icon={Clock}>{contact.workingHours}</ContactRow>
            </ul>

            <ul className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="block w-10 h-10 rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
                  >
                    <s.Icon className="w-10 h-10" />
                  </a>
                </li>
              ))}
            </ul>
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

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 text-white/65">
      <Icon className="mt-0.5 w-4 h-4 shrink-0 text-gold" />
      <span>{children}</span>
    </li>
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
      <h4 className="text-[13px] uppercase tracking-[0.16em] text-gold-light font-semibold mb-5">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-gold-light transition-colors">
        {children}
      </Link>
    </li>
  );
}
