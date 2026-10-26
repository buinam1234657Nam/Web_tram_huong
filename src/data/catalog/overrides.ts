import type { AgarwoodProfile, Ritual } from "@/types/product";

/**
 * Owner-editable layer on top of the product data, keyed by slug. This is the
 * one place to mark featured products, write their home-page story line and
 * confirm agarwood facts until the real product API exists.
 *
 * Rule: only write what the shop has verified. Leave a field out (or null)
 * rather than guess; the storefront hides anything that is null.
 */
export interface ProductOverride {
  featured?: boolean;
  storyLine?: string | null;
  ritual?: Ritual[];
  agarwoodProfile?: Partial<AgarwoodProfile>;
}

export const PRODUCT_OVERRIDES: Record<string, ProductOverride> = {
  // "Tuyển chọn của Vĩnh Trầm" on the home page: 3–4 products, one per need.
  // TODO: chủ shop chọn lại 3–4 sản phẩm chủ lực thật sự.
  "vong-tay-tram-huong-108-nguyen-uoc": {
    featured: true,
    storyLine: null, // TODO: chủ shop bổ sung 1 câu kể chuyện
  },
  "nhang-tram-dai-cat-thuong-pham": {
    featured: true,
    storyLine: null, // TODO: chủ shop bổ sung 1 câu kể chuyện
  },
  "tram-huong-mieng-on-huong": {
    featured: true,
    storyLine: null, // TODO: chủ shop bổ sung 1 câu kể chuyện
  },
  "set-qua-tet-bach-nien-co-tram-qua-tang-tet-2026": {
    featured: true,
    storyLine: null, // TODO: chủ shop bổ sung 1 câu kể chuyện
  },
};
