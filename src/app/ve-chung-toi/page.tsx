import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionPrimitives";
import { CraftProcessSteps } from "@/components/about/CraftProcessSteps";

export const metadata: Metadata = {
  title: "Câu Chuyện Thương Hiệu & Triết Lý Chế Tác",
  description:
    "Hành trình gìn giữ trầm hương tự nhiên Việt Nam của Vĩnh Trầm: chế tác thủ công từ trầm Khánh Hòa và Tiên Phước, Quảng Nam.",
  alternates: {
    canonical: "/ve-chung-toi",
  },
  openGraph: {
    title: "Về Vĩnh Trầm | Trầm Hương Tự Nhiên Đất Việt",
    description: "Kết nối thiên nhiên và tâm hồn qua hương trầm nguyên bản.",
    url: "/ve-chung-toi",
    images: [
      {
        url: "/images/artisan-story.jpg",
        width: 1376,
        height: 768,
        alt: "Xưởng chế tác Vĩnh Trầm",
      },
    ],
  },
};

export default function AboutUsPage() {
  const breadcrumbs = [{ label: "Về chúng tôi", href: "/ve-chung-toi" }];
  const showroomMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    brandConfig.contact.showroomAddress,
  )}`;

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BreadcrumbJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-10 sm:mt-14 max-w-3xl">
          <p className="text-sm font-medium text-gold-dark">Về Vĩnh Trầm</p>
          <h1 className="mt-3 text-4xl sm:text-6xl font-semibold text-charcoal leading-[1.12] tracking-tight">
            Giữ trọn hương trầm tự nhiên của đất Việt
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
            Với chúng tôi, trầm hương không chỉ là món trang sức hay vật phẩm
            đốt thơm. Đó là một khoảng lặng bình an, nối con người với rừng già.
          </p>
        </header>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative aspect-4/3 sm:aspect-16/7 bg-ivory overflow-hidden">
          <Image
            src="/images/artisan-story.jpg"
            alt="Nghệ nhân Vĩnh Trầm xỉa giác gỗ trầm hương tự nhiên"
            fill
            preload
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Philosophy */}
      <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <h2 className="lg:col-span-5 text-3xl sm:text-4xl font-semibold text-charcoal leading-[1.15] tracking-tight">
          Tôn trọng sự thật của gỗ
        </h2>
        <div className="lg:col-span-7 space-y-5 text-[17px] text-charcoal/85 leading-[1.75]">
          <p>
            Thị trường đầy những sản phẩm trầm nấu dầu áp suất cao, ngâm tẩm
            hương liệu công nghiệp. Vĩnh Trầm chọn con đường ngược lại: giữ
            nguyên sự mộc mạc và chân thật của từng thớ gỗ dó bầu.
          </p>
          <p>
            Mỗi vân dầu tự nhiên là dấu vết riêng của thời gian và thời tiết.
            Chúng tôi không nhuộm màu, không phủ bóng PU, để bạn cảm nhận đúng
            mùi thơm ngọt dịu và ấm áp vốn có của trầm.
          </p>
          <p className="text-charcoal font-medium">
            Không tẩm hóa chất. Không ép dầu. Không phủ bóng.
          </p>
        </div>
      </FadeIn>

      {/* Craft process */}
      <section className="bg-ivory mt-24 sm:mt-32 py-20 sm:py-24">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal tracking-tight">
            Từ khúc gỗ đến chuỗi vòng
          </h2>
          <p className="mt-3 text-lg text-muted max-w-2xl">
            Bốn bước thủ công tại xưởng Khánh Hòa.
          </p>
          <div className="mt-12">
            <CraftProcessSteps />
          </div>
        </FadeIn>
      </section>

      {/* Origin & places */}
      <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 sm:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative aspect-4/3 bg-ivory overflow-hidden">
          <Image
            src="/images/hero-agarwood.jpg"
            alt="Trầm hương tự nhiên Khánh Hòa"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-charcoal leading-[1.15] tracking-tight">
            Trầm Khánh Hòa & Tiên Phước
          </h2>
          <p className="mt-5 text-[17px] text-charcoal/85 leading-[1.75]">
            Khánh Hòa từ lâu được gọi là &quot;xứ trầm biển yến&quot;. Nắng gió
            khắc nghiệt miền Trung và đất đỏ bazan sườn núi là điều kiện để cây
            dó bầu tích những thớ trầm nhiều dầu.
          </p>

          <dl className="mt-8 space-y-5 text-[15px]">
            <div>
              <dt className="font-medium text-charcoal">Xưởng chế tác</dt>
              <dd className="mt-1 text-muted">{brandConfig.contact.address}</dd>
            </div>
            <div>
              <dt className="font-medium text-charcoal">Showroom</dt>
              <dd className="mt-1 text-muted">
                {brandConfig.contact.showroomAddress}
                <br />
                {brandConfig.contact.workingHours}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/san-pham">Xem sản phẩm</Button>
            <Link
              href={showroomMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[15px] text-gold-dark hover:underline underline-offset-4"
            >
              Chỉ đường tới showroom
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
