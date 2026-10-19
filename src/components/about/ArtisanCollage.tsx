"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function ArtisanCollage() {
  return (
    <div className="relative py-4 pl-4 pr-6 sm:pr-8">
      {/* Offset Gold Border Frame */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm border-2 border-champagne/45 -z-10 pointer-events-none" />
      <div className="absolute -inset-1.5 -rotate-1 rounded-sm border border-forest/15 -z-20 pointer-events-none" />

      {/* Main Image with Smooth Reveal Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-4/3 rounded-xs overflow-hidden bg-forest-dark border border-forest shadow-2xl group"
      >
        <Image
          src="/images/artisan-story.jpg"
          alt="Nghệ nhân VĨNH TRẦM tỉ mẩn xỉa giác gỗ trầm hương tự nhiên"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-4 text-ivory">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-champagne">
            Xưởng Chế Tác Khánh Hòa
          </span>
          <p className="font-serif text-sm font-bold">Nghệ Nhân Đặng Vũ</p>
        </div>
      </motion.div>

      {/* Inset Secondary Collage: Closeup of Raw Agarwood Grain */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-6 -right-2 sm:-right-4 w-36 sm:w-48 aspect-square rounded-xs overflow-hidden border-2 border-champagne bg-ivory shadow-2xl group/sub"
      >
        <Image
          src="/images/raw-agarwood.jpg"
          alt="Cận cảnh thớ dầu trầm hương tự nhiên Khánh Hòa tích tụ trên 15 năm"
          fill
          sizes="192px"
          className="object-cover transition-transform duration-700 ease-out group-hover/sub:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-ivory flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-champagne shrink-0" />
          <span className="text-[9px] font-semibold tracking-wide text-ivory/90 uppercase leading-tight">
            Thớ Dầu 15+ Năm
          </span>
        </div>
      </motion.div>
    </div>
  );
}
