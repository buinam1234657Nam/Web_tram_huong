import type { Locale } from "@/i18n/config";

export interface HeroSlide {
  id: string;
  /** Desktop image. Client banners: 2048×768 (8:3), like the reference site. */
  image: string;
  /** Optional portrait banner for phones (4:5); falls back to `image`. */
  mobileImage?: string;
  alt: string;
  /** Short looping clip over the first slide's photo. */
  video?: Array<{ src: string; type: string }>;
  /**
   * Text drawn over the photo. Leave out for banners that already have the
   * copy baked into the artwork, so it isn't printed twice.
   */
  caption?: {
    eyebrow: string;
    /** One positioning line. */
    title: string;
  };
  cta: { label: string; href: string };
}

// TODO: thay ảnh bằng banner thật của chủ shop (PC 2048×768, mobile 4:5).
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "nguyen-ban",
    image: "/images/hero-agarwood.jpg",
    alt: "Khói trầm hương tự nhiên VĨNH TRẦM",
    // Rendered from hero-agarwood.jpg (smoke over the ember, slow push-in, 10s loop).
    video: [
      { src: "/videos/hero-khoi-tram.webm", type: "video/webm" },
      { src: "/videos/hero-khoi-tram.mp4", type: "video/mp4" },
    ],
    caption: {
      eyebrow: "Trầm hương tự nhiên đất Việt",
      title: "Hương trầm Việt. Nguyên bản.",
    },
    cta: { label: "Khám phá bộ sưu tập", href: "/san-pham" },
  },
  {
    id: "vong-tay",
    image: "/images/single-bracelet.jpg",
    alt: "Vòng tay trầm hương VĨNH TRẦM",
    caption: {
      eyebrow: "Đeo hộ thân",
      title: "Ấm dần theo nhịp tay.",
    },
    cta: { label: "Khám phá vòng tay", href: "/danh-muc/vong-tay-tram-huong" },
  },
  {
    id: "nhang-nu",
    image: "/images/incense-cones.jpg",
    alt: "Trầm nụ và nhang trầm VĨNH TRẦM",
    caption: {
      eyebrow: "Thiền & tĩnh tâm",
      title: "Một nén cho phút lặng.",
    },
    cta: { label: "Khám phá nhang trầm", href: "/nhu-cau/thien" },
  },
];

/** English captions for the same slides, by id. */
const HERO_SLIDES_EN: Record<string, Pick<HeroSlide, "alt" | "caption" | "cta">> = {
  "nguyen-ban": {
    alt: "Smoke rising from natural VĨNH TRẦM agarwood",
    caption: {
      eyebrow: "Natural Vietnamese agarwood",
      title: "Vietnamese agarwood. As nature made it.",
    },
    cta: { label: "Explore the collection", href: "/san-pham" },
  },
  "vong-tay": {
    alt: "VĨNH TRẦM agarwood bracelet",
    caption: {
      eyebrow: "Worn close",
      title: "Warming with every pulse.",
    },
    cta: { label: "Explore bracelets", href: "/danh-muc/vong-tay-tram-huong" },
  },
  "nhang-nu": {
    alt: "VĨNH TRẦM agarwood cones and incense",
    caption: {
      eyebrow: "Meditation & stillness",
      title: "One stick for a quiet moment.",
    },
    cta: { label: "Explore incense", href: "/nhu-cau/thien" },
  },
};

export function heroSlidesFor(locale: Locale): HeroSlide[] {
  if (locale === "vi") return HERO_SLIDES;
  return HERO_SLIDES.map((slide) => ({ ...slide, ...HERO_SLIDES_EN[slide.id] }));
}
