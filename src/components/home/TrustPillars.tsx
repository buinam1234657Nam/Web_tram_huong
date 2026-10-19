"use client";

import React from "react";
import { ShieldCheck, Sparkles, Award, Truck, Check } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";

const PILLAR_CONFIG = [
  {
    id: "origin",
    step: "01",
    icon: <ShieldCheck className="w-6 h-6 text-forest group-hover:text-champagne-dark transition-colors" />,
    badge: "Đền 200% nếu trầm nấu dầu",
  },
  {
    id: "craft",
    step: "02",
    icon: <Sparkles className="w-6 h-6 text-agarwood-dark group-hover:text-champagne-dark transition-colors" />,
    badge: "Tiện mộc thủ công từng hạt",
  },
  {
    id: "warranty",
    step: "03",
    icon: <Award className="w-6 h-6 text-champagne-dark group-hover:text-forest transition-colors" />,
    badge: "Bảo dưỡng hương trọn đời",
  },
  {
    id: "shipping",
    step: "04",
    icon: <Truck className="w-6 h-6 text-forest group-hover:text-champagne-dark transition-colors" />,
    badge: "Đồng kiểm cùng bưu tá",
  },
];

export function TrustPillars() {
  return (
    <div className="relative bg-white/95 backdrop-blur-xs border border-[#E3DCCF] rounded-2xl p-6 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
      {/* Top subtle golden shimmer line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A46D]/70 to-transparent" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DFD1]/60">
        {brandConfig.trustPillars.map((pillar, idx) => {
          const config = PILLAR_CONFIG[idx];

          return (
            <div
              key={pillar.id}
              className={`group flex flex-col justify-between space-y-4 transition-transform duration-300 hover:-translate-y-1 ${
                idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
              }`}
            >
              <div className="space-y-3">
                {/* Header row with Icon and Watermark Step */}
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#FAF8F4] to-[#F2ECE1] border border-[#C5A46D]/35 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-[#C5A46D] group-hover:shadow-md transition-all duration-300">
                    {config.icon}
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#C5A46D]/20 select-none tracking-tight group-hover:text-[#C5A46D]/35 transition-colors">
                    {config.step}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-forest transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-champagne-dark uppercase tracking-wider mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Guarantee Pill */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-forest bg-[#FAF8F4] px-2.5 py-1 rounded-full border border-[#E3DCCF] group-hover:border-[#C5A46D]/50 transition-colors">
                  <Check className="w-3 h-3 text-champagne-dark shrink-0" />
                  <span>{config.badge}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
