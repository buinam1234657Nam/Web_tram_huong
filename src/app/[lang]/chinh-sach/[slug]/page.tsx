import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PolicyDetailView, PolicyData } from "./PolicyDetailView";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

// Mock policy copy for the demo.
const policiesData: Record<string, PolicyData> = {
  "chinh-sach-bao-hanh": {
    slug: "chinh-sach-bao-hanh",
    title: "Bảo hành dây & đánh bóng hạt trọn đời",
    shortTitle: "Bảo hành & đánh bóng",
    summary:
      "Vĩnh Trầm chăm sóc chiếc vòng của bạn trong suốt thời gian bạn sở hữu nó.",
    content: `## 1. Phạm vi bảo hành miễn phí trọn đời
- **Thay dây:** miễn phí thay dây co giãn trọn đời cho mọi vòng tay trầm hương, cả vòng đơn lẫn chuỗi 108 hạt.
- **Vệ sinh & đánh bóng:** gửi vòng về xưởng hoặc mang tới showroom để nghệ nhân lau sạch và đánh bóng lại bề mặt bằng vải thô.
- **Ủ hương:** hỗ trợ ủ lại hương cho vòng trong hũ gốm chuyên dụng, miễn phí.

## 2. Cam kết trầm tự nhiên
Vĩnh Trầm cam kết 100% trầm tự nhiên. Nếu kết quả kiểm định tại một đơn vị uy tín cho thấy sản phẩm là trầm ép hoặc trầm nấu dầu, chúng tôi hoàn tiền 200% giá trị sản phẩm.

## 3. Cách gửi bảo hành
Gửi chuyển phát về xưởng Khánh Hòa hoặc mang trực tiếp tới showroom TP. Hồ Chí Minh. Vòng được hoàn thiện và gửi trả trong 2–3 ngày làm việc.`,
  },
  "chinh-sach-doi-tra": {
    slug: "chinh-sach-doi-tra",
    title: "Đổi trả trong 7 ngày",
    shortTitle: "Đổi trả 7 ngày",
    summary:
      "Bạn có 7 ngày kể từ khi nhận hàng để đổi hoặc trả sản phẩm nếu chưa ưng ý.",
    content: `## 1. Điều kiện đổi trả
- Sản phẩm còn nguyên vẹn, chưa đốt xông (với nhang, nụ, bột và trầm miếng).
- Vòng tay chưa ngấm nước, chưa tiếp xúc nước hoa, xà phòng hay hóa chất.
- Còn đủ hộp, thẻ bảo hành và quà tặng kèm (nếu có).

## 2. Đổi mới ngay, miễn phí
- Sản phẩm bị nứt, vỡ hạt hoặc móp méo khi vận chuyển.
- Sản phẩm sai mẫu, sai cỡ hạt hoặc sai chu vi cổ tay so với đơn đặt.

Trong các trường hợp trên, Vĩnh Trầm chịu toàn bộ phí vận chuyển đổi trả.`,
  },
  "chinh-sach-giao-hang": {
    slug: "chinh-sach-giao-hang",
    title: "Vận chuyển & đồng kiểm khi nhận hàng",
    shortTitle: "Vận chuyển & đồng kiểm",
    summary:
      "Giao hàng toàn quốc, và bạn được mở hộp kiểm tra trước khi thanh toán.",
    content: `## 1. Phí giao hàng
- **Miễn phí** cho đơn từ 1.000.000 ₫.
- **30.000 ₫** cho đơn dưới 1.000.000 ₫.
- **Giao hỏa tốc trong 2 giờ** tại nội thành Nha Trang và TP. Hồ Chí Minh, tính phí theo ứng dụng giao hàng.

## 2. Đồng kiểm cùng bưu tá
- Bạn được mở hộp, kiểm tra số lượng, tình trạng hạt và ngửi thử hương trước khi thanh toán.
- Nếu sản phẩm không như mô tả, bạn có thể từ chối nhận hàng mà không mất phí.`,
  },
  "chinh-sach-bao-mat": {
    slug: "chinh-sach-bao-mat",
    title: "Bảo mật thông tin khách hàng",
    shortTitle: "Bảo mật thông tin",
    summary:
      "Chúng tôi chỉ dùng thông tin của bạn để giao hàng và chăm sóc sau bán.",
    content: `## 1. Thông tin chúng tôi thu thập
Họ tên, số điện thoại, địa chỉ nhận hàng và email, dùng để:
- Xác nhận đơn hàng và tư vấn cỡ vòng.
- Giao hàng tới đúng địa chỉ.
- Kích hoạt bảo hành và gửi thông tin chăm sóc khách hàng.

## 2. Cam kết không chia sẻ
- Không bán, cho thuê hay chia sẻ dữ liệu của bạn cho bên thứ ba vì mục đích quảng cáo.
- Thanh toán chuyển khoản và thanh toán trực tuyến được mã hóa qua kết nối an toàn (SSL/TLS).`,
  },
};

export async function generateStaticParams() {
  return Object.keys(policiesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = policiesData[slug];

  if (!policy) {
    return { title: "Không tìm thấy chính sách" };
  }

  return {
    title: policy.title,
    description: policy.summary,
    alternates: {
      canonical: `/chinh-sach/${policy.slug}`,
    },
    openGraph: {
      title: `${policy.title} | VĨNH TRẦM`,
      description: policy.summary,
      url: `/chinh-sach/${policy.slug}`,
      images: [
        {
          url: "/images/hero-agarwood.jpg",
          width: 1376,
          height: 768,
          alt: "Trầm hương tự nhiên Vĩnh Trầm",
        },
      ],
    },
  };
}

// Non-async page: the slug-dependent content streams inside Suspense so the
// route's shared shell stays instant (Next 16 partial prefetching).
export default function PolicyPage({ params }: PolicyPageProps) {
  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Suspense fallback={<PolicySkeleton />}>
        <PolicyContent params={params} />
      </Suspense>
    </div>
  );
}

async function PolicyContent({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = policiesData[slug];

  if (!policy) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Chính sách", href: "/chinh-sach/chinh-sach-bao-hanh" },
    { label: policy.shortTitle, href: `/chinh-sach/${policy.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <PolicyDetailView
        currentSlug={slug}
        policies={Object.values(policiesData)}
      />
    </>
  );
}

function PolicySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-48 bg-ivory" />
      <div className="mt-14 h-12 w-2/3 max-w-xl bg-ivory" />
      <div className="mt-6 h-5 w-full max-w-lg bg-ivory" />
    </div>
  );
}
