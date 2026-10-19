"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Quote } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/motion/MotionPrimitives";

interface CelebrityItem {
  id: string;
  name: string;
  title: string;
  image: string;
  quote: string;
  favoriteProduct: string;
  productSlug: string;
}

const CELEBRITIES: CelebrityItem[] = [
  {
    id: "1",
    name: "ĐOÀN BÍCH NGỌC",
    title: "Người Mẫu",
    image: "/images/celeb-1.jpg",
    quote: "Hương trầm tự nhiên mang lại cho Ngọc cảm giác an yên diệu kỳ, tĩnh tại tuyệt đối sau những giờ làm việc căng thẳng.",
    favoriteProduct: "Vòng Tay Trầm Hương Khánh Hòa 108 Hạt",
    productSlug: "vong-tay-tram-huong-khanh-hoa-108-hat",
  },
  {
    id: "2",
    name: "MAI CHÍ CÔNG",
    title: "Ca Sĩ",
    image: "/images/celeb-2.jpg",
    quote: "Chiếc vòng trầm mộc mạc nhưng ẩn chứa thớ dầu sâu lắng, luôn đồng hành cùng Công trên mọi sân khấu và chuyến lưu diễn.",
    favoriteProduct: "Vòng Trầm Hương Mộc Tiên Phước 108 Hạt",
    productSlug: "chuoi-vong-tram-huong-108-hat-tien-phuoc",
  },
  {
    id: "3",
    name: "CHARLIE WIN",
    title: "Diễn Viên",
    image: "/images/celeb-3.jpg",
    quote: "Một tinh hoa văn hóa tuyệt vời của đất rừng Việt Nam. Trầm mộc nguyên bản không tẩm ướp có hương thơm thảo mộc rất thanh tao.",
    favoriteProduct: "Bộ Quà Tặng Trầm Hương Hoàng Kim",
    productSlug: "bo-qua-tang-tram-huong-hoang-kim",
  },
  {
    id: "4",
    name: "ĐẮC THẮNG",
    title: "Diễn Viên",
    image: "/images/celeb-4.jpg",
    quote: "Sự tỉ mỉ và chân thực trong từng hạt chuỗi VĨNH TRẦM khiến Thắng hoàn toàn yên tâm về chất lượng trầm mộc tự nhiên.",
    favoriteProduct: "Vòng Tay Trầm Hương Tự Nhiên Đơn Hạt",
    productSlug: "vong-tay-tram-huong-tu-nhien-don-hat",
  },
];

export function CelebrityCommunity() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 320;
      const offset = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPos = scrollRef.current.scrollLeft;
      const cardWidth = 320;
      const index = Math.round(scrollPos / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), CELEBRITIES.length - 1));
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span>Đồng Hành Cùng Nghệ Sĩ & Doanh Nhân</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Cộng Đồng Tinh Hoa VĨNH TRẦM
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl font-normal leading-relaxed">
              Hơn 50.000+ quý khách hàng tinh hoa, văn nghệ sĩ và tri thức lựa chọn trầm hương tự nhiên VĨNH TRẦM làm vật phẩm hộ thân, thiền định và an định tâm hồn.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-border-subtle bg-white text-charcoal hover:bg-forest hover:text-ivory hover:border-forest flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
              aria-label="Xem hình trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-border-subtle bg-white text-charcoal hover:bg-forest hover:text-ivory hover:border-forest flex items-center justify-center transition-colors cursor-pointer shadow-xs active:scale-95"
              aria-label="Xem hình kế tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Gallery Cards Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CELEBRITIES.map((celeb, idx) => (
          <motion.div
            key={celeb.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex-none w-[280px] sm:w-[320px] aspect-[3/4] snap-start bg-forest-dark rounded-xs overflow-hidden border border-border-subtle hover:border-champagne/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            {/* Background Image with 105% Zoom */}
            <Image
              src={celeb.image}
              alt={`${celeb.title} ${celeb.name} cùng trầm hương VĨNH TRẦM`}
              fill
              sizes="(max-width: 640px) 280px, 320px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300" />
            <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top Badge: Role */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-forest/85 backdrop-blur-xs text-ivory px-3 py-1 rounded-xs border border-forest-light shadow-md">
                {celeb.title}
              </span>
            </div>

            {/* Bottom Content: Always Visible Name + Hover Quote Reveal */}
            <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end text-ivory">
              {/* Quote revealed on Hover */}
              <div className="max-h-0 overflow-hidden group-hover:max-h-36 transition-all duration-500 ease-out">
                <div className="pt-2 pb-3 border-b border-ivory/20 mb-3">
                  <Quote className="w-4 h-4 text-champagne mb-1.5 opacity-80" />
                  <p className="text-xs text-ivory/90 leading-relaxed font-light italic">
                    &quot;{celeb.quote}&quot;
                  </p>
                  <Link
                    href={`/san-pham/${celeb.productSlug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-champagne hover:underline mt-2.5"
                  >
                    <span>{celeb.favoriteProduct}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Title & Name (Styled matching reference) */}
              <div>
                <p className="text-[11px] uppercase tracking-wider text-champagne font-semibold mb-0.5">
                  {celeb.title}
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-ivory uppercase group-hover:text-champagne-light transition-colors">
                  {celeb.name}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {CELEBRITIES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({ left: idx * 320, behavior: "smooth" });
              }
            }}
            aria-label={`Chuyển đến nghệ sĩ ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? "w-8 bg-forest"
                : "w-2 bg-stone-300 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
