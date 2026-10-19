"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, ArrowRight, Home, Search, Sparkles, Flame, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

const POPULAR_COLLECTIONS = [
  {
    name: "Vòng Tay Trầm 108 Hạt",
    desc: "Tích tụ linh khí, an định tâm trí",
    href: "/danh-muc/vong-tay-tram-huong",
    icon: <Sparkles className="w-4 h-4 text-champagne" />,
  },
  {
    name: "Trầm Nụ Xông Nhà",
    desc: "Khử uế khí, thanh lọc không gian",
    href: "/danh-muc/tram-nu-xong-nha",
    icon: <Flame className="w-4 h-4 text-agarwood" />,
  },
  {
    name: "Nhang Trầm Không Tăm",
    desc: "Thuần mộc tự nhiên, hương thơm tĩnh lặng",
    href: "/danh-muc/nhang-tram-huong",
    icon: <ShieldCheck className="w-4 h-4 text-forest" />,
  },
  {
    name: "Bộ Quà Tặng Tinh Hoa",
    desc: "Hộp sơn mài trang trọng biếu thượng khách",
    href: "/danh-muc/set-qua-tang-tram",
    icon: <HeartHandshake className="w-4 h-4 text-champagne-dark" />,
  },
];

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 overflow-hidden bg-ivory">
      {/* Ambient warm radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-40 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(197, 164, 109, 0.25) 0%, rgba(150, 107, 69, 0.08) 50%, transparent 75%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full bg-white/95 backdrop-blur-md border border-border-subtle rounded-sm p-8 sm:p-12 text-center shadow-xl relative"
      >
        {/* Animated Floating Zen Compass */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-2 rounded-full border border-champagne/50"
          />
          <motion.div
            animate={{
              rotate: [0, 8, -8, 0],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-20 h-20 rounded-full bg-forest text-champagne flex items-center justify-center shadow-lg border border-champagne/40"
          >
            <Compass className="w-10 h-10" />
          </motion.div>
        </div>

        {/* Heading */}
        <span className="font-serif text-5xl sm:text-6xl font-bold text-forest tracking-tight block mb-2">
          404
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
          Lạc Bước Giữa Rừng Trầm
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2.5 max-w-md mx-auto leading-relaxed font-light">
          Đường dẫn Quý khách đang tìm kiếm có thể đã thay đổi hoặc thuộc về một đợt chế tác mộc độc bản đã được lưu trữ vào bộ sưu tập trước.
        </p>

        {/* Quick Search Form */}
        <form onSubmit={handleSearch} className="mt-6 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm chuỗi 108 hạt, nụ trầm, nhang mộc..."
              className="w-full pl-10 pr-24 py-2.5 bg-ivory/60 border border-border-subtle rounded-sm text-xs text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-colors shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-forest text-ivory text-xs font-medium rounded-xs hover:bg-forest-dark transition-colors cursor-pointer"
            >
              Tìm
            </button>
          </div>
        </form>

        {/* Suggested Flagship Collections */}
        <div className="mt-8 pt-6 border-t border-border-subtle/70 text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-agarwood-dark block mb-3 text-center sm:text-left">
            Gợi Ý Khám Phá Thượng Phẩm
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {POPULAR_COLLECTIONS.map((col) => (
              <Link
                key={col.href}
                href={col.href}
                className="group p-2.5 rounded-sm border border-border-subtle bg-ivory/40 hover:bg-ivory hover:border-champagne/70 transition-all flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded-xs bg-white border border-border-subtle shrink-0 group-hover:scale-110 transition-transform">
                  {col.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-charcoal group-hover:text-forest transition-colors truncate">
                    {col.name}
                  </p>
                  <p className="text-[10px] text-muted line-clamp-1">{col.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            href="/"
            variant="primary"
            size="md"
            className="flex-1"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Về Trang Chủ
          </Button>
          <Button
            href="/san-pham"
            variant="champagne"
            size="md"
            className="flex-1 font-semibold"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Xem Tất Cả Sản Phẩm
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
