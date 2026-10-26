import { Product, ProductFilterOptions, Ritual } from "@/types/product";
import { Category } from "@/types/category";
import { Review } from "@/types/review";
import { Article } from "@/types/article";
import { catalogProducts } from "@/data/catalog/products";
import { mockCategories } from "@/data/mock/categories";
import { mockReviews } from "@/data/mock/reviews";
import { mockArticles } from "@/data/mock/articles";

export interface ICatalogRepository {
  getProducts(filters?: ProductFilterOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  getBestsellers(limit?: number): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getProductsByRitual(ritual: Ritual): Promise<Product[]>;
  getRelatedProducts(productId: string, categorySlug: string, limit?: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;

  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;

  getReviewsByProductId(productId: string): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;

  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
}

/** Lowercase and strip Vietnamese diacritics so "khanh hoa" finds "Khánh Hòa". */
export function normalizeSearchText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

export function matchesSearch(product: Product, normalizedQuery: string) {
  const profile = product.agarwoodProfile;
  return [
    product.name,
    product.shortDescription,
    product.categoryName,
    product.origin,
    profile.origin ?? "",
    profile.grade ? `trầm ${profile.grade}` : "",
    ...product.seo.keywords,
  ].some((field) => normalizeSearchText(field).includes(normalizedQuery));
}

const categoryCounts = catalogProducts.reduce<Record<string, number>>(
  (counts, p) => {
    counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    return counts;
  },
  {},
);

const categories: Category[] = mockCategories.map((c) => ({
  ...c,
  productCount: categoryCounts[c.slug] || 0,
}));

export class MockCatalogRepository implements ICatalogRepository {
  async getProducts(filters?: ProductFilterOptions): Promise<Product[]> {
    let result = [...catalogProducts];

    if (filters?.categorySlug) {
      result = result.filter((p) => p.categorySlug === filters.categorySlug);
    }

    if (filters?.ritual) {
      const ritual = filters.ritual;
      result = result.filter((p) => p.ritual.includes(ritual));
    }

    if (filters?.priceMin !== undefined) {
      result = result.filter((p) => p.price >= (filters.priceMin ?? 0));
    }

    if (filters?.priceMax !== undefined) {
      result = result.filter((p) => p.price <= (filters.priceMax ?? Infinity));
    }

    if (filters?.inStockOnly) {
      result = result.filter((p) => p.inventoryStatus !== "out_of_stock");
    }

    if (filters?.sort) {
      switch (filters.sort) {
        case "price_asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          result.sort((a, b) => b.ratingAverage - a.ratingAverage);
          break;
        case "bestseller":
          result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
          break;
        default:
          break;
      }
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = catalogProducts.find((p) => p.slug === slug);
    return product || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = catalogProducts.find((p) => p.id === id);
    return product || null;
  }

  async getBestsellers(limit = 4): Promise<Product[]> {
    const bestsellers = catalogProducts.filter((p) => p.bestseller);
    if (bestsellers.length >= limit) {
      return bestsellers.slice(0, limit);
    }
    const remaining = catalogProducts.filter((p) => !p.bestseller);
    return [...bestsellers, ...remaining].slice(0, limit);
  }

  async getFeaturedProducts(limit = 4): Promise<Product[]> {
    const featured = catalogProducts.filter((p) => p.featured);
    return featured.slice(0, limit);
  }

  async getProductsByRitual(ritual: Ritual): Promise<Product[]> {
    return catalogProducts.filter((p) => p.ritual.includes(ritual));
  }

  async getRelatedProducts(productId: string, categorySlug: string, limit = 3): Promise<Product[]> {
    const sameCategory = catalogProducts.filter(
      (p) => p.id !== productId && p.categorySlug === categorySlug
    );
    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit);
    }
    const others = catalogProducts.filter(
      (p) => p.id !== productId && p.categorySlug !== categorySlug
    );
    return [...sameCategory, ...others].slice(0, limit);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const normalized = normalizeSearchText(query);
    if (!normalized) return [];
    return catalogProducts.filter((p) => matchesSearch(p, normalized));
  }

  async getCategories(): Promise<Category[]> {
    return [...categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const cat = categories.find((c) => c.slug === slug);
    return cat || null;
  }

  async getReviewsByProductId(productId: string): Promise<Review[]> {
    return mockReviews.filter((r) => r.productId === productId);
  }

  async getAllReviews(): Promise<Review[]> {
    return [...mockReviews];
  }

  async getArticles(): Promise<Article[]> {
    return [...mockArticles];
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const art = mockArticles.find((a) => a.slug === slug);
    return art || null;
  }
}

// Singleton catalog repository instance
export const catalogRepository: ICatalogRepository = new MockCatalogRepository();
