import { defineMessages } from "../config";

/** Product listing pages (/san-pham, /danh-muc/[slug]) and their filters. */
export const catalogMessages = defineMessages({
  vi: {
    metaTitle: "Bộ Sưu Tập Trầm Hương Tự Nhiên Thượng Hạng",
    metaDescription:
      "Tuyển chọn các tác phẩm trầm hương tự nhiên Khánh Hòa & Quảng Nam: Vòng tay trầm 108 hạt, nhang trầm không tăm, trầm nụ, tinh dầu nguyên chất.",
    ogTitle: "Bộ Sưu Tập Trầm Hương Tự Nhiên | VĨNH TRẦM",
    ogDescription: "Trầm hương tự nhiên nguyên bản, bảo hành dây và hạt trọn đời.",
    ogImageAlt: "Bộ sưu tập trầm hương VĨNH TRẦM",
    categoryNotFound: "Không tìm thấy danh mục",
    breadcrumbProducts: "Sản phẩm",

    allProducts: "Tất cả sản phẩm",
    categoriesNav: "Danh mục sản phẩm",
    showFilters: "Hiện bộ lọc",
    hideFilters: "Ẩn bộ lọc",
    sortBy: "Sắp xếp theo",
    filters: "Bộ lọc",
    closeFilters: "Đóng bộ lọc",
    clearFilters: "Xóa bộ lọc",
    showResults: (n: number) => `Xem ${n} sản phẩm`,

    filterRitual: "Nhu cầu",
    filterGrade: "Loại trầm",
    filterOrigin: "Vùng nguồn gốc",
    filterPrice: "Khoảng giá",
    filterStock: "Tình trạng",
    inStockOnly: "Chỉ hiện sản phẩm còn hàng",

    priceUnder1m: "Dưới 1.000.000₫",
    price1to3m: "1.000.000₫ – 3.000.000₫",
    price3to5m: "3.000.000₫ – 5.000.000₫",
    priceOver5m: "Trên 5.000.000₫",

    sortFeatured: "Nổi bật",
    sortPriceDesc: "Giá: Cao - Thấp",
    sortPriceAsc: "Giá: Thấp - Cao",
    sortRating: "Đánh giá cao nhất",

    showing: (shown: number, total: number) => `Đang xem ${shown} / ${total} sản phẩm`,
    loadMore: "Xem thêm sản phẩm",
    emptyTitle: "Không tìm thấy sản phẩm phù hợp",
    emptyHint: "Thử bỏ bớt bộ lọc hoặc chọn danh mục khác.",
  },
  en: {
    metaTitle: "Natural Agarwood Collection",
    metaDescription:
      "Natural agarwood from Khanh Hoa and Quang Nam: 108-bead bracelets, stickless incense, incense cones and pure oud oil.",
    ogTitle: "Natural Agarwood Collection | VĨNH TRẦM",
    ogDescription: "Genuine natural agarwood, with a lifetime cord and bead warranty.",
    ogImageAlt: "VĨNH TRẦM agarwood collection",
    categoryNotFound: "Category not found",
    breadcrumbProducts: "Products",

    allProducts: "All products",
    categoriesNav: "Product categories",
    showFilters: "Show filters",
    hideFilters: "Hide filters",
    sortBy: "Sort by",
    filters: "Filters",
    closeFilters: "Close filters",
    clearFilters: "Clear filters",
    showResults: (n: number) => `Show ${n} products`,

    filterRitual: "Occasion",
    filterGrade: "Grade",
    filterOrigin: "Region",
    filterPrice: "Price",
    filterStock: "Availability",
    inStockOnly: "In stock only",

    priceUnder1m: "Under 1,000,000₫",
    price1to3m: "1,000,000₫ – 3,000,000₫",
    price3to5m: "3,000,000₫ – 5,000,000₫",
    priceOver5m: "Over 5,000,000₫",

    sortFeatured: "Featured",
    sortPriceDesc: "Price: High to low",
    sortPriceAsc: "Price: Low to high",
    sortRating: "Top rated",

    showing: (shown: number, total: number) => `Showing ${shown} of ${total} products`,
    loadMore: "Load more",
    emptyTitle: "No matching products",
    emptyHint: "Try removing a filter or choosing another category.",
  },
});
