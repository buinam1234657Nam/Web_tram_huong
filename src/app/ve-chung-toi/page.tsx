import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, MapPin } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ArtisanCollage } from "@/components/about/ArtisanCollage";
import { CraftProcessSteps } from "@/components/about/CraftProcessSteps";

export const metadata: Metadata = {
  title: "Câu Chuyện Thương Hiệu & Triết Lý Chế Tác",
  description:
    "Tìm hiểu hành trình bảo tồn và tôn vinh trầm hương tự nhiên Việt Nam tại VĨNH TRẦM. Nghệ thuật thủ công mộc mạc từ Khánh Hòa và Quảng Nam.",
  alternates: {
    canonical: "/ve-chung-toi",
  },
  openGraph: {
    title: "Về VĨNH TRẦM - Tinh Hoa Trầm Hương Tự Nhiên Đất Việt",
    description: "Kết nối thiên nhiên và tâm hồn qua hương trầm nguyên bản.",
    url: "https://vinhtram.vn/ve-chung-toi",
    images: [{ url: "/images/artisan-story.jpg", alt: "Xưởng chế tác VĨNH TRẦM" }],
  },
};

export default function AboutUsPage() {
  const breadcrumbs = [
    { label: "Về chúng tôi", href: "/ve-chung-toi" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Brand Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block">
          Khởi Nguồn Từ Đất Mẹ
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal leading-tight">
          Hương Trầm Trường Tồn <br />
          <span className="text-forest font-normal italic">
            Tinh Hoa Đất Trời Việt Nam
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-muted leading-relaxed font-light max-w-2xl mx-auto">
          Tại VĨNH TRẦM, chúng tôi tin rằng trầm hương không đơn thuần là một món trang sức hay vật phẩm đốt thơm. Đó là một khoảng lặng bình an, một nhịp cầu nối liền con người với thiên nhiên đại ngàn.
        </p>
      </div>

      {/* Split Story 1 with Offset Gold Border & Grain Collage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <ArtisanCollage />

        <div className="space-y-4">
          <span className="text-xs uppercase font-semibold text-agarwood tracking-wider">
            Triết Lý Chế Tác
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Tôn Trọng Sự Thật Của Gỗ
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
            Giữa thị trường tràn ngập những sản phẩm trầm nấu dầu áp suất cao, ngâm tẩm hóa chất tạo hương công nghiệp độc hại, VĨNH TRẦM kiên định con đường bảo tồn: giữ trọn sự mộc mạc và chân thật của từng thớ gỗ dó bầu.
          </p>
          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-light">
            Mỗi vân dầu tự nhiên là một dấu ấn độc bản của thời gian và thời tiết. Chúng tôi không can thiệp màu sắc, không dùng bóng PU, để người thưởng trầm cảm nhận đúng mùi thơm ngọt dịu và ấm áp vốn có của trầm hương rừng nhiệt đới.
          </p>

          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-forest">
              <CheckCircle className="w-4 h-4 text-champagne-dark" />
              <span>Cam kết nói không với trầm hóa chất và ép dầu nhân tạo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Craft Process with Big Numbers & SVG Line Draw */}
      <div className="bg-white border border-border-subtle rounded-sm p-6 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-semibold text-agarwood-dark tracking-widest block">
            Quy Chuẩn Nghệ Nhân
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Quy Trình 4 Bước Tạo Nên Tác Phẩm VĨNH TRẦM
          </h2>
          <p className="text-xs text-muted font-light">
            Từ khối gỗ thô mộc nơi rừng già đến chuỗi bảo vật ngát hương trên cổ tay Quý khách
          </p>
        </div>

        <CraftProcessSteps />
      </div>

      {/* Sourcing & Workshop Details */}
      <div className="bg-forest-dark text-ivory rounded-sm p-8 sm:p-12 border border-forest grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs uppercase font-semibold text-champagne tracking-widest block">
            Vùng Đất Địa Linh
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
            Xuất Xứ Khánh Hòa & Tiên Phước
          </h2>
          <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
            Khánh Hòa từ xưa được xưng tụng là &quot;Xứ Trầm Biển Yến&quot;. Nắng gió khắc nghiệt miền Trung cùng chất đất đỏ bazan sườn núi tạo điều kiện hoàn hảo cho cây dó bầu tích tụ những thớ trầm có tỷ trọng tinh dầu đậm đặc nhất thế giới.
          </p>

          <div className="space-y-2 text-xs text-ivory/90 pt-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <span><strong>Xưởng chế tác Khánh Hòa:</strong> {brandConfig.contact.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
              <span><strong>Không gian trải nghiệm Sài Gòn:</strong> {brandConfig.contact.showroomAddress}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button href="/san-pham" variant="champagne" size="md">
              Khám phá sản phẩm
            </Button>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded overflow-hidden border border-forest-light">
          <Image
            src="/images/hero-agarwood.jpg"
            alt="Khối trầm hương tự nhiên Khánh Hòa tích tụ tinh hoa rừng già Việt Nam"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
