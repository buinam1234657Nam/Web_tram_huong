import { describe, it, expect } from "vitest";
import { MockCatalogRepository } from "@/data/repositories/catalog-repository";

describe("Catalog Repository", () => {
  const repo = new MockCatalogRepository();

  it("retrieves all products and categories", async () => {
    const products = await repo.getProducts();
    const categories = await repo.getCategories();

    expect(products.length).toBeGreaterThan(0);
    expect(categories.length).toBe(6);
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
