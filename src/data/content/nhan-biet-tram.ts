import type { AgarwoodGrade } from "@/types/product";

// TODO: chủ shop duyệt nội dung chuyên môn – không tự khẳng định số liệu.
// Everything here is deliberately qualitative: no ages, prices, percentages or
// rankings. Add figures only once the shop can stand behind them.

/** "Cách nhận biết trầm tự nhiên với trầm tẩm dầu" – product page accordion + /hieu-ve-tram. */
export const AUTHENTICITY_SIGNS: Array<{
  id: string;
  title: string;
  natural: string;
  treated: string;
}> = [
  {
    id: "mui",
    title: "Mùi khi chưa đốt",
    natural:
      "Thơm nhẹ, phải đưa sát mũi hoặc để ấm lên trong tay mới rõ; hương ngọt, có chiều sâu.",
    treated:
      "Nồng ngay khi mở hộp, mùi gắt và một màu như hương liệu, ngửi lâu dễ choáng.",
  },
  {
    id: "van-dau",
    title: "Vân dầu",
    natural:
      "Vân đậm nhạt đan xen, chạy theo thớ gỗ, mỗi hạt hay mỗi miếng một khác.",
    treated:
      "Vân mờ hoặc đều tăm tắp, màu dầu loang thành mảng, không theo thớ gỗ.",
  },
  {
    id: "mau-sac",
    title: "Màu sắc",
    natural:
      "Nhiều sắc độ trên cùng một hạt, từ vàng nâu đến nâu sẫm; lau khăn trắng không ra màu.",
    treated:
      "Đen hoặc nâu đều bất thường; lau bằng khăn trắng có thể thấy vệt dầu hoặc màu.",
  },
  {
    id: "khoi",
    title: "Khói khi đốt",
    natural:
      "Khói trắng xanh, mảnh; hương ngọt dịu và chuyển dần trong lúc cháy, không cay mắt.",
    treated:
      "Khói đen hoặc đặc, mùi khét hắc; có thể sủi bọt dầu ở chỗ cháy.",
  },
  {
    id: "be-mat",
    title: "Cảm giác bề mặt",
    natural:
      "Khô, mịn tay; trầm nhiều dầu có thể hơi dính nhẹ nhưng không để lại vệt.",
    treated:
      "Nhờn rít hoặc bóng như phủ sáp, để lại vết dầu trên giấy trắng.",
  },
];

/** Loại trầm – /hieu-ve-tram. */
export const GRADE_GUIDE: Array<{
  grade: AgarwoodGrade;
  title: string;
  body: string;
}> = [
  {
    grade: "chìm",
    title: "Trầm chìm",
    body: "Phần gỗ tích nhựa dày đến mức nặng hơn nước, thả vào nước thì chìm hẳn. Hiếm nhất, hương đậm và sâu, thường dành cho sưu tầm hoặc thưởng trầm.",
  },
  {
    grade: "bán chìm",
    title: "Trầm bán chìm (chìm lửng)",
    body: "Lượng nhựa nhiều nhưng chưa đủ để chìm hẳn, thả vào nước thì lơ lửng. Hương đầy đặn, cân bằng giữa độ hiếm và giá.",
  },
  {
    grade: "nổi",
    title: "Trầm nổi",
    body: "Gỗ có tích nhựa nhưng nhẹ hơn nước. Phổ biến nhất cho vòng tay, nhang và nụ; hương thanh, nhẹ, dễ dùng hằng ngày.",
  },
  {
    grade: "tốc",
    title: "Trầm tốc",
    body: "Hình thành quanh những vết côn trùng đục trong thân dó bầu, thớ gỗ có nhiều lỗ nhỏ và vân xen kẽ. Hương thường ngọt, rất riêng.",
  },
];

/** Vùng trầm Việt Nam – /hieu-ve-tram. Listed for orientation, not ranked. */
export const REGION_GUIDE: Array<{ name: string; body: string }> = [
  {
    name: "Khánh Hòa",
    body: "Vạn Ninh, Ninh Hòa và vùng núi quanh Nha Trang, nơi nghề tìm trầm gắn với nhiều thế hệ.",
  },
  {
    name: "Quảng Nam",
    body: "Tiên Phước, Quế Sơn và dải rừng Trường Sơn phía tây, nổi tiếng với trầm có hương ngọt.",
  },
  {
    name: "Hà Tĩnh & Quảng Bình",
    body: "Vùng rừng Bắc Trung Bộ, dó bầu mọc tự nhiên lẫn trong rừng già.",
  },
  {
    name: "Phú Yên & Tây Nguyên",
    body: "Các cánh rừng trung du, nơi cây dó bầu được tìm thấy rải rác.",
  },
];

/** Tuổi tích trầm – /hieu-ve-tram. */
export const RESIN_AGE_NOTES: string[] = [
  "Tuổi tích trầm là khoảng thời gian cây dó bầu tiết nhựa để tự chữa lành vết thương. Nhựa tích càng lâu, thớ gỗ càng đặc và nặng.",
  "Trầm tích lâu thường có hương sâu, ấm và ít mùi gỗ sống; trầm tích ngắn hương thanh và nhẹ hơn.",
  "Vì cần nhiều năm và hiếm dần theo thời gian, tuổi tích trầm là một trong những yếu tố lớn nhất quyết định giá.",
];
