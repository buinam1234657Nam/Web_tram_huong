"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Hammer, ShieldCheck, Flame } from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    step: "01",
    title: "Tuyển Chọn Phôi Trầm Tự Nhiên",
    desc: "Trực tiếp tìm kiếm và tuyển chọn những gốc dó bầu tích tụ nhựa thơm từ 15-20 năm tại các vùng rừng Khánh Hòa & Quảng Nam.",
    icon: <Sparkles className="w-5 h-5 text-champagne-dark" />,
  },
  {
    step: "02",
    title: "Xỉa Giác Gỗ Thủ Công",
    desc: "Nghệ nhân dùng dao đục chuyên dụng tỉ mẩn bóc tách từng lớp giác gỗ trắng không chứa dầu, giữ lại phần thớ trầm đậm đặc nhất.",
    icon: <Hammer className="w-5 h-5 text-forest" />,
  },
  {
    step: "03",
    title: "Tiện Hạt & Mài Mộc Thuần Túy",
    desc: "Tiện từng hạt chuỗi bằng lưỡi dao mộc, mài bóng cơ học qua lớp vải thô tự nhiên, tuyệt đối không phun sáp hay phủ dầu hóa chất.",
    icon: <ShieldCheck className="w-5 h-5 text-agarwood" />,
  },
  {
    step: "04",
    title: "Ủ Hương & Đánh Giá Khứu Giác",
    desc: "Ủ trong hũ gốm kín khí để tinh dầu trầm tự thẩm thấu, sau đó được kiểm tra khứu giác tỉ mỉ trước khi đóng gói gửi tới tay Quý khách.",
    icon: <Flame className="w-5 h-5 text-champagne-dark" />,
  },
];

export function CraftProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative space-y-8">
      {/* Golden Connecting Line SVG across the 4 steps (Desktop) */}
      <div className="hidden lg:block absolute top-[48px] left-[10%] right-[10%] h-2 pointer-events-none z-0">
        <svg
          className="w-full h-4 overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 1000 20"
        >
          {/* Subtle Base Line */}
          <line
            x1="0"
            y1="10"
            x2="1000"
            y2="10"
            stroke="#E8DFD1"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {/* Animated Gold Draw Line */}
          <motion.path
            d="M 0,10 L 1000,10"
            fill="transparent"
            stroke="#C5A46D"
            strokeWidth="3"
            style={{ pathLength }}
          />
        </svg>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {STEPS.map((st, idx) => (
          <motion.div
            key={st.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative p-6 sm:p-7 rounded-sm bg-[#FAF8F4] border border-[#E8DFD1] hover:border-champagne/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Dramatic Luxury Big Process Number (01 -> 04) */}
            <span className="font-serif text-6xl sm:text-7xl font-bold text-champagne/20 absolute -top-1 right-2 select-none pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:text-champagne/30">
              {st.step}
            </span>

            {/* Icon & Step Header */}
            <div className="relative z-10 space-y-4">
              <div className="w-11 h-11 rounded-full bg-white border border-[#E8DFD1] group-hover:border-champagne flex items-center justify-center shadow-xs transition-colors">
                {st.icon}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-dark block mb-1">
                  Bước {st.step}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-charcoal group-hover:text-forest transition-colors leading-snug">
                  {st.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="relative z-10 text-xs sm:text-[13px] text-stone-600 leading-relaxed font-light mt-3 pt-3 border-t border-[#EFE7DC]">
              {st.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
