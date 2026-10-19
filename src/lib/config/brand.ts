export interface BrandConfig {
  name: string;
  slogan: string;
  tagline: string;
  storySummary: string;
  origin: string;
  foundingYear: number;
  contact: {
    hotline: string;
    phoneFormatted: string;
    email: string;
    address: string;
    showroomAddress: string;
    workingHours: string;
  };
  social: {
    facebook: string;
    zalo: string;
    instagram: string;
    youtube: string;
  };
  policies: {
    freeShippingThreshold: number;
    shippingStandardFee: number;
    returnDays: number;
    warrantyYears: number;
    inspectionOnDelivery: boolean;
  };
  trustPillars: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
  }>;
}

export const brandConfig: BrandConfig = {
  name: "VĨNH TRẦM",
  slogan: "Kết nối thiên nhiên và tâm hồn",
  tagline: "Tinh Hoa Trầm Hương Tự Nhiên Đất Việt",
  storySummary:
    "Khởi nguồn từ những cánh rừng dó bầu tự nhiên Khánh Hòa và Tiên Phước - Quảng Nam, VĨNH TRẦM gìn giữ trọn vẹn hương thơm nguyên bản và giá trị tĩnh tại cho đời sống đương đại.",
  origin: "Vạn Giã, Vạn Ninh, Tỉnh Khánh Hòa & Tiên Phước, Tỉnh Quảng Nam, Việt Nam",
  foundingYear: 2018,
  contact: {
    hotline: "0908866989",
    phoneFormatted: "0908 866 989",
    email: "lienhe@vinhtram.vn",
    address: "Số 68 Đường Trầm Hương, Phường Vĩnh Hòa, TP. Nha Trang, Khánh Hòa",
    showroomAddress: "Tầng 2, 18A Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    workingHours: "08:30 - 21:00 (Thứ 2 - Chủ Nhật)",
  },
  social: {
    facebook: "https://facebook.com/vinhtram.agarwood",
    zalo: "https://zalo.me/vinhtram",
    instagram: "https://instagram.com/vinhtram.vietnam",
    youtube: "https://youtube.com/@vinhtram-vietnam",
  },
  policies: {
    freeShippingThreshold: 1000000, // 1.000.000 VND
    shippingStandardFee: 30000,
    returnDays: 7,
    warrantyYears: 2,
    inspectionOnDelivery: true,
  },
  trustPillars: [
    {
      id: "source",
      title: "100% Trầm Tự Nhiên",
      subtitle: "Xuất xứ Khánh Hòa & Quảng Nam",
      description:
        "Tuyển chọn từ cây dó bầu tích trầm tự nhiên lâu năm, nói không với hóa chất ép dầu nhân tạo.",
      icon: "ShieldCheck",
    },
    {
      id: "craft",
      title: "Thủ Công Tinh Xảo",
      subtitle: "Nghệ nhân mộc truyền thống",
      description:
        "Từng hạt trầm và miếng gỗ được gọt giũa tỉ mỉ, lưu giữ tối đa tinh dầu và vân trầm nguyên bản.",
      icon: "Sparkles",
    },
    {
      id: "warranty",
      title: "Bảo Hành Dây & Hạt",
      subtitle: "Bảo dưỡng hương trọn đời",
      description:
        "Miễn phí thay dây, đánh bóng hạt định kỳ và cam kết bồi hoàn nếu phát hiện trầm giả.",
      icon: "Award",
    },
    {
      id: "shipping",
      title: "Giao Hàng & Đồng Kiểm",
      subtitle: "Kiểm tra trước khi thanh toán",
      description:
        "Hỗ trợ giao hàng hỏa tốc toàn quốc. Quý khách được mở hộp kiểm tra chất lượng trước khi nhận.",
      icon: "Truck",
    },
  ],
};
