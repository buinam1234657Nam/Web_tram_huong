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
  featured?: boolean;
  bestseller?: boolean;
  purpose: "meditation" | "daily_wear" | "fengshui" | "gift" | "relaxation";
  scentProfile: {
    intensity: "nhẹ nhàng" | "vừa phải" | "đậm sâu";
    notes: string[];
    longevity: string;
  };
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

export interface ProductFilterOptions {
  categorySlug?: string;
  purpose?: string;
  priceMin?: number;
  priceMax?: number;
  scentIntensity?: string;
  inStockOnly?: boolean;
  sort?: "bestseller" | "price_asc" | "price_desc" | "newest" | "rating";
}
