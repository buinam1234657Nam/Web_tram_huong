import type { Ritual } from "@/types/product";

/** "Mua theo nhu cầu / nghi thức": home tiles, /nhu-cau/[slug] pages and the catalog filter. */
export const RITUALS: Array<{
  slug: Ritual;
  label: string;
  title: string;
  description: string;
  image: string;
}> = [
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
