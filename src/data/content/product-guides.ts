import { brandConfig } from "@/lib/config/brand";
import { formatVND } from "@/lib/format/currency";

// TODO: chủ shop duyệt nội dung hướng dẫn và câu trả lời FAQ.

/** "Hướng dẫn sử dụng & bảo quản", keyed by category slug. */
const CARE_GUIDES: Record<string, string[]> = {
  "vong-tay-tram-huong": [
    "Tháo vòng khi tắm, bơi, rửa tay với xà phòng hoặc tập thể thao ra nhiều mồ hôi.",
    "Tránh nước hoa, cồn và hóa chất tẩy rửa tiếp xúc trực tiếp với hạt.",
    "Đeo thường xuyên để hơi ấm cơ thể giữ hương; khi không đeo, cất trong hộp hoặc túi vải kín.",
    "Lau nhẹ bằng khăn mềm, khô. Không đánh bóng bằng dầu hay sáp.",
  ],
  "trang-suc-tram-huong": [
    "Tháo khi tắm, bơi hoặc ngủ để tránh va đập và ẩm.",
    "Tránh nước hoa, mỹ phẩm và hóa chất tẩy rửa.",
    "Cất riêng trong hộp kín, tránh cọ xát với trang sức kim loại khác.",
    "Lau bằng khăn mềm, khô sau khi đeo.",
  ],
  "nhang-tram-huong": [
    "Thắp ở nơi thoáng, đặt trên lư hoặc đế cắm chống cháy, tránh gió lùa.",
    "Không để nhang cháy khi không có người trông, để xa rèm và vật dễ cháy.",
    "Đậy kín hộp sau khi dùng, để nơi khô ráo, tránh ánh nắng trực tiếp.",
  ],
  "tram-nu-xong-nha": [
    "Đặt nụ trên lư hoặc thác khói, đốt đầu nhọn đến khi bén lửa rồi thổi tắt cho nụ cháy âm ỉ.",
    "Dùng ở nơi kín gió để khói chảy đều; không để nụ cháy khi không có người trông.",
    "Bảo quản trong hộp kín, nơi khô ráo để nụ không hút ẩm.",
  ],
  "tram-huong-mieng": [
    "Xông bằng lư điện hoặc than gốm, để lửa nhỏ để hương tỏa từ từ, không làm cháy đen miếng trầm.",
    "Một miếng nhỏ có thể xông nhiều lần đến khi hết hương.",
    "Cất trong hộp kín hoặc túi zip, tránh ẩm và ánh nắng.",
  ],
  "tinh-dau-tram": [
    "Dùng một lượng rất nhỏ; thử trên vùng da nhỏ trước khi dùng trực tiếp lên da.",
    "Có thể nhỏ vào máy khuếch tán theo hướng dẫn của máy.",
    "Đậy chặt nắp, để nơi mát, tránh ánh nắng và xa tầm tay trẻ em.",
  ],
  "phu-kien-xong-tram": [
    "Đặt lư trên bề mặt chịu nhiệt, ổn định, xa vật dễ cháy.",
    "Đợi lư nguội hẳn rồi mới vệ sinh tro; lau bằng khăn khô.",
  ],
  "my-nghe-tram-huong": [
    "Đặt nơi khô ráo, tránh ánh nắng trực tiếp và hơi nước.",
    "Lau bụi bằng chổi lông mềm hoặc khăn khô; không dùng nước hay hóa chất.",
  ],
  "bo-qua-tang": [
    "Bảo quản hộp quà nơi khô ráo, tránh ánh nắng trực tiếp.",
    "Hướng dẫn chi tiết cho từng món đi kèm trong hộp.",
  ],
};

const DEFAULT_CARE = [
  "Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.",
  "Tránh để sản phẩm tiếp xúc với nước và hóa chất.",
];

export function careGuideFor(categorySlug: string) {
  return CARE_GUIDES[categorySlug] ?? DEFAULT_CARE;
}

/** Product page FAQ; also emitted as schema.org FAQPage. */
export function productFaq(categorySlug: string) {
  const { policies } = brandConfig;
  const items = [
    {
      question: "Làm sao để biết trầm tự nhiên hay trầm tẩm dầu?",
      answer:
        "Có thể nhìn vào năm dấu hiệu: mùi khi chưa đốt, vân dầu, màu sắc, khói khi đốt và cảm giác bề mặt. Xem mục \"Cách nhận biết\" ngay phía trên hoặc bài \"Hiểu về trầm\" để biết chi tiết.",
    },
    {
      question: "Tôi có được kiểm tra hàng trước khi thanh toán không?",
      answer: policies.inspectionOnDelivery
        ? "Có. Quý khách được mở hộp đồng kiểm khi nhận hàng, hài lòng mới thanh toán."
        : "Vui lòng liên hệ hotline để được hướng dẫn kiểm tra hàng.",
    },
    {
      question: "Chính sách đổi trả thế nào?",
      answer: `Đổi trả trong ${policies.returnDays} ngày nếu sản phẩm lỗi. Đơn từ ${formatVND(policies.freeShippingThreshold)} được miễn phí vận chuyển.`,
    },
  ];

  if (categorySlug === "vong-tay-tram-huong" || categorySlug === "trang-suc-tram-huong") {
    items.push({
      question: "Hương của vòng có nhạt dần không?",
      answer:
        "Trầm tự nhiên thơm rõ hơn khi ấm lên theo thân nhiệt và nhạt đi nếu để lâu ngoài không khí. Đeo thường xuyên và cất trong hộp kín khi không dùng sẽ giúp giữ hương.",
    });
  }

  return items;
}
