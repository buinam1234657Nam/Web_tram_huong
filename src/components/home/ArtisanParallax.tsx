"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function ArtisanParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth subtle vertical parallax translation
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[380px] lg:min-h-[520px] overflow-hidden group"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[116%] -top-[8%] will-change-transform"
      >
        <Image
          src="/images/artisan-story.jpg"
          alt="Nghệ nhân VĨNH TRẦM tỉ mẩn xỉa giác gỗ và tiện mộc chuỗi hạt trầm hương tự nhiên"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent lg:hidden pointer-events-none" />
    </div>
  );
}
