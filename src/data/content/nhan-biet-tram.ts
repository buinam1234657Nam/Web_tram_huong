import type { AgarwoodGrade } from "@/types/product";
import type { Locale } from "@/i18n/config";

// TODO: chủ shop duyệt nội dung chuyên môn – không tự khẳng định số liệu.
// TODO: chủ shop duyệt cả bản tiếng Anh (guideContentFor("en") bên dưới).
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

// ---------------------------------------------------------------- English

const AUTHENTICITY_SIGNS_EN: typeof AUTHENTICITY_SIGNS = [
  {
    id: "mui",
    title: "Scent before burning",
    natural:
      "Faint until you hold it close or warm it in your hand; sweet, with real depth.",
    treated:
      "Strong the moment the box opens, sharp and one-note like added fragrance; overwhelming after a while.",
  },
  {
    id: "van-dau",
    title: "Resin veins",
    natural:
      "Dark and light veins interlace and follow the grain; no two beads or pieces look alike.",
    treated:
      "Veins are faint or suspiciously even, with oil pooled in patches that ignore the grain.",
  },
  {
    id: "mau-sac",
    title: "Colour",
    natural:
      "Several shades on a single bead, from golden brown to deep brown; a white cloth stays clean.",
    treated:
      "An unnaturally even black or brown; a white cloth may pick up oil or colour.",
  },
  {
    id: "khoi",
    title: "Smoke when burned",
    natural:
      "Thin, blue-white smoke; a soft, sweet scent that shifts as it burns and doesn't sting the eyes.",
    treated:
      "Dark or heavy smoke with an acrid, burnt smell; oil may bubble where it burns.",
  },
  {
    id: "be-mat",
    title: "Feel of the surface",
    natural:
      "Dry and smooth; very resinous wood can feel faintly tacky but leaves no mark.",
    treated:
      "Greasy, sticky or waxy-shiny, and leaves an oil mark on white paper.",
  },
];

const GRADE_GUIDE_EN: typeof GRADE_GUIDE = [
  {
    grade: "chìm",
    title: "Sinking agarwood (trầm chìm)",
    body: "Wood so saturated with resin it is heavier than water and sinks outright. The rarest grade, with a rich, deep scent, usually kept for collectors or for appreciation.",
  },
  {
    grade: "bán chìm",
    title: "Semi-sinking agarwood (trầm bán chìm)",
    body: "Plenty of resin, though not enough to sink fully: it hangs in the water. A full scent that balances rarity and price.",
  },
  {
    grade: "nổi",
    title: "Floating agarwood (trầm nổi)",
    body: "Resinous wood that is still lighter than water. The most common grade for bracelets, incense and cones, with a light, clean scent for everyday use.",
  },
  {
    grade: "tốc",
    title: "Insect-formed agarwood (trầm tốc)",
    body: "Formed around insect bore holes in the aquilaria trunk, so the wood is full of small holes and interlaced veins. The scent is often sweet and very distinctive.",
  },
];

const REGION_GUIDE_EN: typeof REGION_GUIDE = [
  {
    name: "Khanh Hoa",
    body: "Van Ninh, Ninh Hoa and the hills around Nha Trang, where agarwood hunting has passed down through generations.",
  },
  {
    name: "Quang Nam",
    body: "Tien Phuoc, Que Son and the western Truong Son forests, known for sweet-scented agarwood.",
  },
  {
    name: "Ha Tinh & Quang Binh",
    body: "The forests of the North Central Coast, where aquilaria grows wild among old-growth trees.",
  },
  {
    name: "Phu Yen & the Central Highlands",
    body: "Midland forests where aquilaria trees are found scattered here and there.",
  },
];

const RESIN_AGE_NOTES_EN: typeof RESIN_AGE_NOTES = [
  "Resin age is how long the aquilaria tree has been producing resin to heal its wounds. The longer the resin builds up, the denser and heavier the wood.",
  "Long-aged agarwood tends to smell deeper and warmer, with less raw-wood note; younger agarwood is lighter and cleaner.",
  "Because it takes many years and grows scarcer over time, resin age is one of the biggest factors in price.",
];

/** All of the guide content above, in one locale. */
export function guideContentFor(locale: Locale) {
  if (locale === "en") {
    return {
      authenticitySigns: AUTHENTICITY_SIGNS_EN,
      gradeGuide: GRADE_GUIDE_EN,
      regionGuide: REGION_GUIDE_EN,
      resinAgeNotes: RESIN_AGE_NOTES_EN,
    };
  }
  return {
    authenticitySigns: AUTHENTICITY_SIGNS,
    gradeGuide: GRADE_GUIDE,
    regionGuide: REGION_GUIDE,
    resinAgeNotes: RESIN_AGE_NOTES,
  };
}
