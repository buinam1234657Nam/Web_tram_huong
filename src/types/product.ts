export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductVariant {
  id: string;
  sku: string;
  name: string; // e.g. "Hạt 10mm (Cổ tay 15-16cm)", "Hộp 50g (~120 nụ)"
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
  inventoryStatus: InventoryStatus;
  attributes: {
    size?: string;
    weight?: string;
    beadsCount?: number;
  };
}

export interface ProductSpecification {
  label: string;
  value: string;
}

/** Loại trầm, by density: sinks, half-sinks, floats; "tốc" is insect-formed resin. */
export type AgarwoodGrade = "chìm" | "bán chìm" | "nổi" | "tốc";

/**
 * What the wood actually is. Every field is nullable: null means "the owner
 * hasn't confirmed this yet" and the UI hides it. Never fill these by guessing.
 */
export interface AgarwoodProfile {
  grade: AgarwoodGrade | null;
  /** e.g. "Vạn Ninh, Khánh Hòa" / "Tiên Phước, Quảng Nam" */
  origin: string | null;
  /** Tuổi tích trầm, e.g. "15–20 năm" */
  resinAgeYears: string | null;
  source: "tự nhiên" | "trồng cấy" | null;
  /** e.g. "dầu dày, vân rõ" */
  oilContent: string | null;
  /** e.g. ["ngọt dịu", "cay nhẹ", "thảo mộc khô"] */
  scentProfile: string[] | null;
  sinksInWater: boolean | null;
  /** e.g. "Không tẩm dầu, không phủ bóng" */
  treatment: string | null;
  /** Bracelets only */
  beadSizeMm?: number | null;
  /** Warranty card or lab certificate, if any */
  certificate: string | null;
}

/** Shopping need the product serves; drives /nhu-cau/[slug] and the catalog filter. */
export type Ritual = "deo-ho-than" | "thien" | "ban-tra" | "qua-bieu";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categorySlug: string;
  categoryName: string;
  images: string[];
  /** Hero products for the home page's "Tuyển chọn" section. */
  featured: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  /** One line for the home page story, e.g. "Hương ngọt ấm theo nhịp mạch tay". */
  storyLine: string | null;
  agarwoodProfile: AgarwoodProfile;
  ritual: Ritual[];
  /** Legacy sample-data fields; crawled products leave them empty. */
  purpose?: "meditation" | "daily_wear" | "fengshui" | "gift" | "relaxation";
  scentProfile: {
    intensity: "nhẹ nhàng" | "vừa phải" | "đậm sâu";
    notes: string[];
    longevity: string;
  } | null;
  specifications: ProductSpecification[];
  origin: string;
  harvestMethod: string;
  variants: ProductVariant[];
  inventoryStatus: InventoryStatus;
  inventoryQuantity: number;
  ratingAverage: number;
  ratingCount: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/**
 * What cards and list views need. Drops the long-form copy so catalog pages
 * don't ship every product description to the browser.
 */
export type ProductSummary = Omit<
  Product,
  "description" | "specifications" | "seo" | "shortDescription"
>;

export interface ProductFilterOptions {
  categorySlug?: string;
  ritual?: Ritual;
  priceMin?: number;
  priceMax?: number;
  inStockOnly?: boolean;
  sort?: "bestseller" | "price_asc" | "price_desc" | "newest" | "rating";
}
