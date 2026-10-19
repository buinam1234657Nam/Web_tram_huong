import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  const colClass =
    columns === 3
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded border border-border-subtle p-8">
        <p className="font-serif text-lg text-charcoal mb-2">Không tìm thấy sản phẩm</p>
        <p className="text-xs text-muted">
          Quý khách vui lòng thử điều chỉnh bộ lọc hoặc tìm kiếm danh mục khác.
        </p>
      </div>
    );
  }

  return (
    <div className={colClass}>
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 2} />
      ))}
    </div>
  );
}
