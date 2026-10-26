import { describe, it, expect } from "vitest";
import { MockCatalogRepository } from "@/data/repositories/catalog-repository";

describe("Catalog Repository", () => {
  const repo = new MockCatalogRepository();

  it("retrieves all products and categories", async () => {
    const products = await repo.getProducts();
    const categories = await repo.getCategories();

    expect(products.length).toBeGreaterThan(0);
    expect(categories.length).toBe(9);
    // Counts are derived from the catalog, not hard-coded.
    const total = categories.reduce((sum, c) => sum + c.productCount, 0);
    expect(total).toBe(products.length);
  });

  it("keeps every product slug unique and the legacy URLs resolvable", async () => {
    const products = await repo.getProducts();
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    for (const slug of [
      "vong-tay-tram-huong-khanh-hoa-108-hat",
      "tram-nu-thuong-hang-huong-xua",
      "hop-qua-binh-an",
    ]) {
      expect(await repo.getProductBySlug(slug)).not.toBeNull();
    }
  });

  it("returns 3–4 featured products", async () => {
    const featured = await repo.getFeaturedProducts(4);
    expect(featured.length).toBeGreaterThanOrEqual(3);
    expect(featured.length).toBeLessThanOrEqual(4);
    featured.forEach((p) => expect(p.featured).toBe(true));
  });

  it("filters products by ritual", async () => {
    const gifts = await repo.getProductsByRitual("qua-bieu");
    expect(gifts.length).toBeGreaterThan(0);
    gifts.forEach((p) => expect(p.ritual).toContain("qua-bieu"));
  });

  it("searches without diacritics", async () => {
    const accented = await repo.searchProducts("vòng tay");
    const plain = await repo.searchProducts("vong tay");
    expect(plain.length).toBe(accented.length);
    expect(plain.length).toBeGreaterThan(0);
  });

  it("filters products by category slug", async () => {
    const bracelets = await repo.getProducts({ categorySlug: "vong-tay-tram-huong" });
    expect(bracelets.length).toBeGreaterThan(0);
    bracelets.forEach((p) => {
      expect(p.categorySlug).toBe("vong-tay-tram-huong");
    });
  });

  it("filters products by price range", async () => {
    const lowCostProducts = await repo.getProducts({ priceMax: 1000000 });
    lowCostProducts.forEach((p) => {
      expect(p.price).toBeLessThanOrEqual(1000000);
    });
  });

  it("searches products by Vietnamese keyword accurately", async () => {
    const results = await repo.searchProducts("Khánh Hòa");
    expect(results.length).toBeGreaterThan(0);
  });

  it("retrieves product by slug", async () => {
    const product = await repo.getProductBySlug("vong-tay-tram-huong-khanh-hoa-108-hat");
    expect(product).not.toBeNull();
    expect(product?.name).toContain("108 Hạt");
    expect(product?.variants.length).toBeGreaterThanOrEqual(1);
  });

  it("returns null for non-existent product slug", async () => {
    const product = await repo.getProductBySlug("san-pham-khong-ton-tai");
    expect(product).toBeNull();
  });
});
