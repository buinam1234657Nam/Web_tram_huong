"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Lock, PhoneCall, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { brandConfig } from "@/lib/config/brand";

export interface PolicyData {
  slug: string;
  title: string;
  shortTitle: string;
  iconType: "shield" | "rotate" | "truck" | "lock";
  content: string;
}

interface PolicyDetailViewProps {
  currentSlug: string;
  policies: PolicyData[];
}

const ICONS: Record<string, React.ReactNode> = {
  shield: <ShieldCheck className="w-5 h-5 text-forest" />,
  rotate: <RotateCcw className="w-5 h-5 text-agarwood" />,
  truck: <Truck className="w-5 h-5 text-forest" />,
  lock: <Lock className="w-5 h-5 text-champagne-dark" />,
};

const HEADER_ICONS: Record<string, React.ReactNode> = {
  shield: <ShieldCheck className="w-8 h-8 text-forest" />,
  rotate: <RotateCcw className="w-8 h-8 text-agarwood" />,
  truck: <Truck className="w-8 h-8 text-forest" />,
  lock: <Lock className="w-8 h-8 text-champagne-dark" />,
};

export function PolicyDetailView({ currentSlug, policies }: PolicyDetailViewProps) {
  const currentPolicy = policies.find((p) => p.slug === currentSlug) || policies[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* LEFT COLUMN: Vertical Navigation Tabs (Sticky top-28) */}
      <aside className="lg:col-span-4 bg-white border border-[#E8DFD1] rounded-sm p-4 sm:p-5 shadow-xs lg:sticky lg:top-28">
        <div className="pb-3 mb-3 border-b border-[#E8DFD1]">
          <span className="text-[10px] uppercase font-bold tracking-widest text-champagne-dark block">
            Trung Tâm Hỗ Trợ
          </span>
          <h2 className="font-serif text-base font-bold text-charcoal">
            Chính Sách Khách Hàng
          </h2>
        </div>

        <nav className="space-y-1.5" aria-label="Menu chính sách">
          {policies.map((p) => {
            const isActive = p.slug === currentSlug;
            return (
              <Link
                key={p.slug}
                href={`/chinh-sach/${p.slug}`}
                scroll={false}
                className={`relative flex items-center justify-between p-3 rounded-xs text-xs font-medium transition-colors group ${
                  isActive
                    ? "bg-[#FAF8F4] text-forest font-bold shadow-xs border border-[#E8DFD1] border-l-4 border-l-forest pl-3.5"
                    : "text-stone-600 hover:text-charcoal hover:bg-stone-50 pl-4 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`shrink-0 ${isActive ? "text-forest" : "text-stone-500"}`}>
                    {ICONS[p.iconType]}
                  </div>
                  <span className="leading-snug">{p.shortTitle}</span>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive
                      ? "text-forest translate-x-0.5"
                      : "text-stone-300 group-hover:translate-x-1 group-hover:text-stone-500"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Quick Hotline Helpline Widget */}
        <div className="mt-6 pt-5 border-t border-[#E8DFD1] bg-[#FAF8F4] -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 sm:p-5 rounded-b-sm space-y-2">
          <p className="text-[11px] font-semibold text-charcoal uppercase tracking-wider">
            Cần Tư Vấn Trực Tiếp?
          </p>
          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Nghệ nhân và chuyên viên VĨNH TRẦM luôn sẵn sàng hỗ trợ Quý khách 24/7.
          </p>
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-forest hover:text-champagne-dark transition-colors pt-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Hotline: {brandConfig.contact.phoneFormatted}</span>
          </a>
        </div>
      </aside>

      {/* RIGHT COLUMN: Policy Content with Motion & Rich Markdown Rendering */}
      <motion.main
        key={currentPolicy.slug}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-8 bg-white border border-[#E8DFD1] rounded-sm p-6 sm:p-10 shadow-xs space-y-6"
      >
        {/* Header Banner */}
        <div className="flex items-start gap-4 pb-5 border-b border-[#E8DFD1]">
          <div className="p-3.5 rounded-full bg-[#FAF8F4] border border-[#E8DFD1] shrink-0">
            {HEADER_ICONS[currentPolicy.iconType]}
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-agarwood tracking-wider block mb-1">
              Quy Định & Quyền Lợi Khách Hàng
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
              {currentPolicy.title}
            </h1>
          </div>
        </div>

        {/* Beautifully Rendered Markdown Content (Fixed Raw Markdown Bug) */}
        <div className="prose prose-stone max-w-none text-charcoal/90 leading-relaxed text-sm sm:text-base">
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal mt-8 mb-3 pb-2 border-b border-[#F0EAE1] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-forest shrink-0" />
                  <span>{children}</span>
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-stone-700 leading-relaxed font-light mb-4 text-sm sm:text-[15px]">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 my-4 pl-0 list-none">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="text-stone-700 leading-relaxed font-light text-sm sm:text-[15px] flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-dark shrink-0 mt-2" />
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-charcoal font-sans">
                  {children}
                </strong>
              ),
            }}
          >
            {currentPolicy.content}
          </ReactMarkdown>
        </div>

        {/* Commitment Footer Guarantee */}
        <div className="mt-8 pt-6 border-t border-[#E8DFD1] bg-[#FAF8F4] -mx-6 -mb-6 p-6 sm:-mx-10 sm:-mb-10 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-sm font-semibold text-charcoal mb-0.5">
              Cam kết dịch vụ VĨNH TRẦM
            </h3>
            <p className="text-xs text-muted font-light">
              Mọi quyền lợi của khách hàng đều được ghi nhận bằng văn bản và kích hoạt thẻ bảo hành điện tử.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest text-ivory rounded-xs text-xs font-semibold hover:bg-forest-dark hover:text-champagne transition-colors shadow-xs shrink-0"
          >
            <span>Tiếp tục thưởng trầm</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.main>
    </div>
  );
}
