import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, RotateCcw, Lock, PhoneCall } from "lucide-react";
import { brandConfig } from "@/lib/config/brand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface PolicyPageProps {
  params: Promise<{ slug: string }>;
}

interface PolicyItem {
  slug: string;
  title: string;
  icon: React.ReactNode;
  content: string;
}

const policiesData: Record<string, PolicyItem> = {
  "chinh-sach-bao-hanh": {
    slug: "chinh-sach-bao-hanh",
    title: "Chính Sách Bảo Hành Dây & Bảo Dưỡng Hạt Trọn Đời",
    icon: <ShieldCheck className="w-8 h-8 text-forest" />,
    content: `VĨNH TRẦM cam kết đồng hành cùng Quý khách trong suốt quá trình sở hữu và thưởng thức tác phẩm trầm hương.

### 1. Phạm vi bảo hành miễn phí trọn đời
- **Thay dây xỏ:** Miễn phí thay dây dù bện co giãn Nhật Bản trọn đời đối với tất cả chuỗi vòng tay trầm hương (vòng đơn, vòng 108 hạt).
- **Vệ sinh & Đánh bóng mộc:** Khách hàng có thể gửi chuỗi vòng hoặc mang tới xưởng/showroom để được nghệ nhân dùng vải thô đánh bóng lại bề mặt, loại bỏ tế bào chết hoặc bụi bẩn bám dính sau thời gian dài sử dụng.
- **Bảo dưỡng hương thơm:** Hỗ trợ ủ dưỡng hương bằng hũ gốm chuyên dụng miễn phí.

### 2. Cam kết nguồn gốc tự nhiên
- VĨNH TRẦM cam kết 100% trầm tự nhiên. Nếu Quý khách kiểm định tại các viện ngọc học / lâm nghiệp uy tín phát hiện trầm ép hóa chất hoặc trầm nấu nhân tạo, chúng tôi cam kết hoàn tiền 200% giá trị sản phẩm.

### 3. Quy trình gửi bảo hành
- Quý khách có thể gửi chuyển phát nhanh về xưởng Khánh Hòa hoặc mang trực tiếp tới showroom TP. Hồ Chí Minh. Thời gian hoàn thiện và gửi lại trong vòng 2 - 3 ngày làm việc.`,
  },
  "chinh-sach-doi-tra": {
    slug: "chinh-sach-doi-tra",
    title: "Chính Sách Đổi Trả Sản Phẩm Trong 7 Ngày",
    icon: <RotateCcw className="w-8 h-8 text-agarwood" />,
    content: `Để Quý khách hoàn toàn an tâm khi lựa chọn tác phẩm trầm hương trực tuyến, VĨNH TRẦM áp dụng chính sách đổi trả linh hoạt trong vòng 7 ngày kể từ ngày nhận hàng.

### 1. Điều kiện áp dụng đổi trả
- Sản phẩm còn nguyên vẹn, chưa qua sử dụng đốt xông (đối với nhang nụ, bột trầm, trầm miếng).
- Vòng tay chưa bị ngấm nước, chưa tiếp xúc với nước hoa, xà phòng hoặc hóa chất làm biến đổi hương trầm.
- Còn đầy đủ hộp bảo quản sơn mài/gỗ, thẻ bảo hành và quà tặng kèm theo (nếu có).

### 2. Các trường hợp được đổi mới ngay lập tức
- Sản phẩm bị nứt, vỡ hạt hoặc móp méo trong quá trình chuyển phát của bưu tá.
- Sản phẩm không đúng mẫu mã, quy cách hạt hoặc kích thước chu vi cổ tay mà Quý khách đã đặt.
- Mọi chi phí vận chuyển phát sinh khi đổi trả do lỗi đóng gói hoặc vận chuyển đều do VĨNH TRẦM chi trả.`,
  },
  "chinh-sach-giao-hang": {
    slug: "chinh-sach-giao-hang",
    title: "Chính Sách Vận Chuyển & Đồng Kiểm Tận Nơi",
    icon: <Truck className="w-8 h-8 text-forest" />,
    content: `VĨNH TRẦM hợp tác cùng các đơn vị vận chuyển uy tín hàng đầu (Viettel Post, GHTK) để chuyển phát bảo đảm từng kiện hàng trầm quý đến tận tay Quý khách.

### 1. Biểu phí giao hàng
- **Miễn phí vận chuyển toàn quốc:** Áp dụng cho tất cả đơn hàng có giá trị từ 1.000.000 ₫ trở lên.
- **Phí giao hàng tiêu chuẩn:** 30.000 ₫ cho các đơn hàng dưới 1.000.000 ₫.
- **Giao hỏa tốc 2 giờ:** Hỗ trợ tại khu vực nội thành Nha Trang và TP. Hồ Chí Minh theo biểu phí của ứng dụng vận chuyển công nghệ.

### 2. Quyền lợi Đồng Kiểm cùng bưu tá
- Khi bưu tá giao hàng, Quý khách được quyền mở hộp kiểm tra số lượng, tình trạng hạt và ngửi thử mùi thơm mộc mạc trước khi thanh toán.
- Trường hợp không ưng ý hoặc sản phẩm không như mô tả, Quý khách có quyền từ chối nhận hàng mà không phải chịu bất kỳ chi phí nào.`,
  },
  "chinh-sach-bao-mat": {
    slug: "chinh-sach-bao-mat",
    title: "Chính Sách Bảo Mật Thông Tin Khách Hàng",
    icon: <Lock className="w-8 h-8 text-champagne-dark" />,
    content: `VĨNH TRẦM tôn trọng và cam kết bảo vệ thông tin riêng tư của Quý khách theo chuẩn mực bảo mật cao nhất.

### 1. Mục đích thu thập thông tin
Chúng tôi chỉ thu thập họ tên, số điện thoại, địa chỉ nhận hàng và email phục vụ cho việc:
- Xác nhận đơn đặt hàng và liên hệ đồng kiểm kích thước cổ tay.
- Giao nhận kiện hàng tới đúng địa chỉ yêu cầu.
- Kích hoạt mã bảo hành điện tử và thông báo ưu đãi chăm sóc khách hàng thân thiết.

### 2. Cam kết không chia sẻ dữ liệu
- Tuyệt đối không bán, cho thuê hoặc chia sẻ dữ liệu khách hàng cho bất kỳ bên thứ ba nào vì mục đích tiếp thị thương mại.
- Mọi giao dịch qua chuyển khoản VietQR hoặc cổng điện tử đều được mã hóa theo chuẩn an toàn SSL/TLS.`,
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
    title: `${policy.title} | VĨNH TRẦM`,
    description: `Chi tiết về ${policy.title.toLowerCase()} tại thương hiệu trầm hương tự nhiên VĨNH TRẦM.`,
    alternates: {
      canonical: `/chinh-sach/${policy.slug}`,
    },
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = policiesData[slug];

  if (!policy) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Chính sách", href: "/chinh-sach/chinh-sach-bao-hanh" },
    { label: policy.title, href: `/chinh-sach/${policy.slug}` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="bg-white border border-border-subtle rounded-sm p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-border-subtle">
          <div className="p-3 rounded-full bg-ivory border border-border-subtle">
            {policy.icon}
          </div>
          <div>
            <span className="text-xs uppercase font-semibold text-agarwood tracking-wider">
              Quy Định & Quyền Lợi Khách Hàng
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              {policy.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-stone max-w-none text-charcoal/90 leading-relaxed font-light text-sm sm:text-base whitespace-pre-line space-y-4">
          {policy.content}
        </div>

        {/* Support Direct Box */}
        <div className="pt-6 border-t border-border-subtle bg-ivory/50 -mx-6 -mb-6 p-6 sm:-mx-10 sm:-mb-10 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-sm font-semibold text-charcoal mb-0.5">
              Cần hỗ trợ thêm về chính sách?
            </h4>
            <p className="text-xs text-muted">
              Đội ngũ tư vấn viên luôn sẵn sàng giải đáp mọi thắc mắc của Quý khách.
            </p>
          </div>
          <a
            href={`tel:${brandConfig.contact.hotline}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest text-ivory rounded text-xs font-semibold hover:bg-forest-dark transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Hotline: {brandConfig.contact.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
