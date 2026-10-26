import type { Ritual } from "@/types/product";
import type { Locale } from "@/i18n/config";

/** "Mua theo nhu cầu / nghi thức": home tiles, /nhu-cau/[slug] pages and the catalog filter. */
export interface RitualInfo {
  slug: Ritual;
  label: string;
  title: string;
  description: string;
  image: string;
}

/** Vietnamese (default). Use ritualsFor(locale) on localized pages. */
export const RITUALS: RitualInfo[] = [
  {
    slug: "deo-ho-than",
    label: "Đeo hộ thân",
    title: "Theo bạn mỗi ngày",
    description:
      "Vòng tay, chuỗi cổ và mặt dây trầm, ấm dần và tỏa hương theo hơi ấm cơ thể.",
    image: "/images/bracelet-108.jpg",
  },
  {
    slug: "thien",
    label: "Thiền & tĩnh tâm",
    title: "Một nén cho phút lặng",
    description:
      "Nhang và nụ trầm khói mảnh, hương êm cho góc thiền, bàn thờ và giờ đọc sách.",
    image: "/images/incense-sticks.jpg",
  },
  {
    slug: "ban-tra",
    label: "Thưởng trầm bên bàn trà",
    title: "Hương theo chén trà",
    description:
      "Trầm miếng, tinh dầu và lư xông để thưởng hương chậm rãi cùng bạn trà.",
    image: "/images/oud-oil.jpg",
  },
  {
    slug: "qua-bieu",
    label: "Quà biếu",
    title: "Trao lời chúc an yên",
    description:
      "Hộp quà, tượng và trầm cảnh cho dịp tết, tân gia và tri ân người thân.",
    // TODO: thay bằng ảnh quà tặng của shop (ảnh tạm lấy từ dữ liệu crawl)
    image: "https://thienmochuong.com/wp-content/uploads/2025/08/set-qua-tam-an-9-scaled.webp",
  },
];

export const ritualBySlug = (slug: string) => RITUALS.find((r) => r.slug === slug);

const RITUALS_EN: Record<Ritual, Pick<RitualInfo, "label" | "title" | "description">> = {
  "deo-ho-than": {
    label: "Worn for protection",
    title: "With you every day",
    description:
      "Agarwood bracelets, necklaces and pendants that warm up and release their scent with your body heat.",
  },
  thien: {
    label: "Meditation & stillness",
    title: "One stick for a quiet moment",
    description:
      "Fine-smoke agarwood incense and cones with a gentle scent, for the meditation corner, the altar and reading hours.",
  },
  "ban-tra": {
    label: "Agarwood at the tea table",
    title: "A scent to match your tea",
    description:
      "Agarwood chips, oud oil and burners for savouring the scent slowly with friends over tea.",
  },
  "qua-bieu": {
    label: "Gifts",
    title: "Wishes of peace, given",
    description:
      "Gift boxes, statues and agarwood sculptures for Tet, housewarmings and thanking the people you love.",
  },
};

export function ritualsFor(locale: Locale): RitualInfo[] {
  if (locale === "vi") return RITUALS;
  return RITUALS.map((r) => ({ ...r, ...RITUALS_EN[r.slug] }));
}

export const ritualBySlugFor = (slug: string, locale: Locale) =>
  ritualsFor(locale).find((r) => r.slug === slug);
