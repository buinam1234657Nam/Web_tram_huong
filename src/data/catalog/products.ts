import type { Product, ProductSummary } from "@/types/product";
import { mockProducts } from "@/data/mock/products";
import { mockCategories } from "@/data/mock/categories";
import crawl from "@/data/crawl/products.json";
import { PRODUCT_OVERRIDES } from "./overrides";

/**
 * Temporary catalog: products mapped from the crawl (scripts/import-crawl.mjs)
 * plus the original sample products, which stay so their URLs keep resolving.
 * Swap this module for the product API when it is ready.
 */
const crawledProducts = crawl.products as Omit<Product, "featured">[];

export const catalogProducts: Product[] = [
  ...crawledProducts.map((p) => ({ ...p, featured: false })),
  ...mockProducts,
].map((p) => {
  // Category names live in one place; the sample data carries stale copies.
  const categoryName =
    mockCategories.find((c) => c.slug === p.categorySlug)?.name ?? p.categoryName;
  const override = PRODUCT_OVERRIDES[p.slug];
  if (!override) return { ...p, categoryName };
  return {
    ...p,
    categoryName,
    featured: override.featured ?? p.featured,
    storyLine: override.storyLine !== undefined ? override.storyLine : p.storyLine,
    ritual: override.ritual ?? p.ritual,
    agarwoodProfile: { ...p.agarwoodProfile, ...override.agarwoodProfile },
  };
});

/**
 * Card data for list pages. Cards show two images and add the default
 * variant to the cart, so the rest is left out of the page payload.
 */
export function toSummary(product: Product): ProductSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description, specifications, seo, shortDescription, ...summary } = product;
  return {
    ...summary,
    images: product.images.slice(0, 2),
    variants: product.variants.slice(0, 1),
  };
}
