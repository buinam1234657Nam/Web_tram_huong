import { Product, ProductFilterOptions } from "@/types/product";
import { Category } from "@/types/category";
import { Review } from "@/types/review";
import { Article } from "@/types/article";
import { mockProducts } from "@/data/mock/products";
import { mockCategories } from "@/data/mock/categories";
import { mockReviews } from "@/data/mock/reviews";
import { mockArticles } from "@/data/mock/articles";

export interface ICatalogRepository {
  getProducts(filters?: ProductFilterOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  getBestsellers(limit?: number): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getRelatedProducts(productId: string, categorySlug: string, limit?: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  
  getReviewsByProductId(productId: string): Promise<Review[]>;
  getAllReviews(): Promise<Review[]>;
  
  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
}

export class MockCatalogRepository implements ICatalogRepository {
  async getProducts(filters?: ProductFilterOptions): Promise<Product[]> {
    let result = [...mockProducts];

    if (filters?.categorySlug) {
      result = result.filter((p) => p.categorySlug === filters.categorySlug);
    }

    if (filters?.purpose) {
      result = result.filter((p) => p.purpose === filters.purpose);
    }

    if (filters?.priceMin !== undefined) {
      result = result.filter((p) => p.price >= (filters.priceMin ?? 0));
    }

    if (filters?.priceMax !== undefined) {
      result = result.filter((p) => p.price <= (filters.priceMax ?? Infinity));
    }

    if (filters?.scentIntensity) {
      result = result.filter((p) => p.scentProfile.intensity === filters.scentIntensity);
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
    const product = mockProducts.find((p) => p.slug === slug);
    return product || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = mockProducts.find((p) => p.id === id);
    return product || null;
  }

  async getBestsellers(limit = 4): Promise<Product[]> {
    const bestsellers = mockProducts.filter((p) => p.bestseller);
    return bestsellers.slice(0, limit);
  }

  async getFeaturedProducts(limit = 6): Promise<Product[]> {
    const featured = mockProducts.filter((p) => p.featured);
    return featured.slice(0, limit);
  }

  async getRelatedProducts(productId: string, categorySlug: string, limit = 3): Promise<Product[]> {
    const sameCategory = mockProducts.filter(
      (p) => p.id !== productId && p.categorySlug === categorySlug
    );
    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit);
    }
    const others = mockProducts.filter(
      (p) => p.id !== productId && p.categorySlug !== categorySlug
    );
    return [...sameCategory, ...others].slice(0, limit);
  }

  async searchProducts(query: string): Promise<Product[]> {
    if (!query || !query.trim()) return [];
    const normalized = query.toLowerCase().trim();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) ||
        p.shortDescription.toLowerCase().includes(normalized) ||
        p.categoryName.toLowerCase().includes(normalized) ||
        p.origin.toLowerCase().includes(normalized) ||
        p.seo.keywords.some((kw) => kw.toLowerCase().includes(normalized))
    );
  }

  async getCategories(): Promise<Category[]> {
    return [...mockCategories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const cat = mockCategories.find((c) => c.slug === slug);
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
