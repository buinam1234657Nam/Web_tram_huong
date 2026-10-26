import React from "react";
import { Metadata } from "next";
import {
  GRADE_GUIDE,
  REGION_GUIDE,
  RESIN_AGE_NOTES,
} from "@/data/content/nhan-biet-tram";
import { RITUALS } from "@/data/content/rituals";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { AuthenticitySigns } from "@/components/product/AuthenticitySigns";

export const metadata: Metadata = {
  title: "Hiểu về trầm hương: loại trầm, vùng trầm và cách nhận biết",
  description:
    "Trầm chìm, bán chìm, nổi và trầm tốc khác nhau thế nào; các vùng trầm Việt Nam; tuổi tích trầm ảnh hưởng tới mùi và giá; cách phân biệt trầm tự nhiên với trầm tẩm dầu.",
  alternates: { canonical: "/hieu-ve-tram" },
  openGraph: {
    title: "Hiểu về trầm hương | VĨNH TRẦM",
    description:
      "Loại trầm, vùng trầm Việt Nam, tuổi tích trầm và cách nhận biết trầm tự nhiên.",
    url: "/hieu-ve-tram",
    images: [
      {
        url: "/images/raw-agarwood.jpg",
        width: 1024,
        height: 1024,
        alt: "Trầm hương tự nhiên",
      },
    ],
  },
};

const CONTAINER = "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8";

const SECTIONS = [
  { id: "loai-tram", label: "Các loại trầm" },
  { id: "vung-tram", label: "Vùng trầm Việt Nam" },
  { id: "tuoi-tram", label: "Tuổi tích trầm" },
  { id: "nhan-biet", label: "Phân biệt trầm tẩm dầu" },
];

export default function AgarwoodGuidePage() {
  const breadcrumbs = [{ label: "Hiểu về trầm", href: "/hieu-ve-tram" }];

  return (
    <div className="pb-24">
      <div className={`${CONTAINER} pt-6`}>
        <BreadcrumbJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <header className={`${CONTAINER} mt-10 sm:mt-14`}>
        <p className="text-sm font-medium text-gold-dark">Hiểu về trầm</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-semibold leading-[1.12] tracking-tight max-w-3xl">
          Biết trầm trước khi chọn trầm
        </h1>
        <p className="mt-5 text-[17px] text-muted leading-relaxed max-w-2xl">
          Cùng là trầm hương nhưng mùi, độ bền và giá có thể khác nhau rất xa.
          Bốn điều dưới đây giúp bạn đọc được một món trầm: nó thuộc loại nào,
          đến từ đâu, tích nhựa bao lâu và có bị tẩm dầu hay không.
        </p>
        <nav aria-label="Mục lục" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center h-10 px-4 rounded-full border border-gold/40 text-sm text-agarwood-dark hover:bg-ivory transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section
        id="loai-tram"
        className={`${CONTAINER} mt-16 sm:mt-20 scroll-mt-[calc(var(--header-h)+1rem)]`}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl">1. Các loại trầm</h2>
          <p className="mt-3 text-[15px] text-muted max-w-2xl leading-relaxed">
            Người chơi trầm phân loại chủ yếu theo lượng nhựa tích trong gỗ,
            dễ thấy nhất khi thả vào nước.
          </p>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GRADE_GUIDE.map((g, idx) => (
            <FadeIn
              key={g.grade}
              delay={(idx % 2) * 0.12}
              className="h-full rounded-2xl border border-gold/30 bg-ivory-light p-6"
            >
              <h3 className="text-xl font-semibold text-agarwood">{g.title}</h3>
              <p className="mt-2 text-[15px] text-charcoal/80 leading-relaxed">
                {g.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section
        id="vung-tram"
        className="mt-16 sm:mt-20 bg-espresso-dark text-white scroll-mt-[calc(var(--header-h)+1rem)]"
      >
        <div className={`${CONTAINER} py-16 sm:py-20`}>
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl text-white">
              2. Vùng trầm Việt Nam
            </h2>
            <p className="mt-3 text-[15px] text-white/70 max-w-2xl leading-relaxed">
              Thổ nhưỡng và khí hậu mỗi vùng cho trầm một sắc hương riêng. Đây
              là những vùng thường được nhắc tới, không xếp theo thứ hạng.
            </p>
          </FadeIn>
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REGION_GUIDE.map((r) => (
              <div
                key={r.name}
                className="rounded-2xl border border-gold/30 bg-white/5 p-6"
              >
                <dt className="text-lg font-semibold text-gold-light">
                  {r.name}
                </dt>
                <dd className="mt-2 text-[15px] text-white/75 leading-relaxed">
                  {r.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="tuoi-tram"
        className={`${CONTAINER} mt-16 sm:mt-20 scroll-mt-[calc(var(--header-h)+1rem)]`}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl">
            3. Tuổi tích trầm ảnh hưởng tới mùi và giá
          </h2>
        </FadeIn>
        <ul className="mt-8 space-y-4 max-w-3xl">
          {RESIN_AGE_NOTES.map((note) => (
            <li
              key={note}
              className="flex gap-4 text-[17px] text-charcoal/85 leading-relaxed"
            >
              <span
                aria-hidden="true"
                className="mt-2.5 w-2 h-2 shrink-0 rounded-full bg-gold"
              />
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="nhan-biet"
        className={`${CONTAINER} mt-16 sm:mt-20 scroll-mt-[calc(var(--header-h)+1rem)]`}
      >
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl">
            4. Phân biệt trầm tự nhiên và trầm tẩm dầu
          </h2>
          <p className="mt-3 text-[15px] text-muted max-w-2xl leading-relaxed">
            Không cần dụng cụ: chỉ cần mũi, mắt, tay và một que diêm.
          </p>
        </FadeIn>
        <div className="mt-8">
          <AuthenticitySigns variant="cards" />
        </div>
      </section>

      <section className={`${CONTAINER} mt-16 sm:mt-20`}>
        <FadeIn className="rounded-3xl bg-ivory p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl">Chọn trầm theo nhu cầu</h2>
          <p className="mt-3 text-[15px] text-muted max-w-xl mx-auto">
            Mỗi sản phẩm của Vĩnh Trầm đều có “Hồ sơ trầm” ghi rõ loại trầm,
            vùng và tuổi tích trầm khi đã được xác nhận.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {RITUALS.map((r) => (
              <Button key={r.slug} href={`/nhu-cau/${r.slug}`} variant="outline">
                {r.label}
              </Button>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
