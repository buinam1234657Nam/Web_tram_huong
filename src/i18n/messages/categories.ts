import type { Category } from "@/types/category";
import { defineMessages, type Locale } from "../config";

type CategoryText = Record<string, { name: string; description: string }>;

/**
 * English names and descriptions for the catalog categories. Vietnamese
 * comes straight from src/data/mock/categories.ts, so it isn't repeated here.
 */
const EN: CategoryText = {
  "vong-tay-tram-huong": {
    name: "Agarwood Bracelets",
    description:
      "Hand-turned from natural Khanh Hoa and Tien Phuoc agarwood, bead by bead; a warm, sweet scent rises as the wood meets your skin.",
  },
  "tram-nu-xong-nha": {
    name: "Incense Cones",
    description:
      "Cones of 100% agarwood powder bound with litsea bark: a soft, flowing smoke that clears the room and settles the mind.",
  },
  "nhang-tram-huong": {
    name: "Agarwood Incense",
    description:
      "Simple agarwood incense with a fine, gentle smoke that won't sting the eyes, for meditation, tea and the family altar.",
  },
  "tram-huong-mieng": {
    name: "Agarwood Chips",
    description:
      "Resin-rich natural agarwood from Khanh Hoa, with dense dark oil veins, for electric burners or charcoal.",
  },
  "tinh-dau-tram": {
    name: "Oud Oil",
    description:
      "Steam-distilled from aged natural agarwood: a deep, lasting scent and a quiet moment of calm.",
  },
  "bo-qua-tang": {
    name: "Gift Sets",
    description:
      "Lacquer and fine-wood boxes pairing a bracelet, a ceramic burner and premium cones, carrying wishes of peace and good fortune.",
  },
  "trang-suc-tram-huong": {
    name: "Agarwood Jewellery",
    description:
      "Necklaces, rings, earrings and pendants crafted from agarwood, worn every day as a personal talisman.",
  },
  "phu-kien-xong-tram": {
    name: "Burners & Accessories",
    description:
      "Brass and porcelain burners, backflow cones and burning tools for the tea table, altar and meditation corner.",
  },
  "my-nghe-tram-huong": {
    name: "Agarwood Art",
    description:
      "Statues, carvings and natural agarwood sculptures for altars, living rooms and gifting.",
  },
};

export const categoryMessages = defineMessages({
  vi: {} as CategoryText,
  en: EN,
});

/** A category with its name and description in the given locale (falls back to Vietnamese). */
export function localizeCategory<C extends Pick<Category, "slug" | "name" | "description">>(
  category: C,
  locale: Locale,
): C {
  const text = categoryMessages[locale][category.slug];
  return text ? { ...category, ...text } : category;
}

/** Category name by slug, e.g. for a product's `categoryName`. */
export function categoryNameFor(slug: string, fallback: string, locale: Locale) {
  return categoryMessages[locale][slug]?.name ?? fallback;
}
