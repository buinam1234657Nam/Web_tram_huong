import { defineMessages } from "../config";

/** Small strings reused across many components. */
export const commonMessages = defineMessages({
  vi: {
    home: "Trang chủ",
    close: "Đóng",
    clear: "Xóa",
    search: "Tìm",
    viewAll: "Xem tất cả",
    viewProducts: "Xem sản phẩm",
    viewAllProducts: "Xem tất cả sản phẩm",
    backHome: "Về trang chủ",
    loading: "Đang tải…",
    loadingProducts: "Đang tải sản phẩm",
    photoOf: (name: string) => `Ảnh ${name}`,
  },
  en: {
    home: "Home",
    close: "Close",
    clear: "Clear",
    search: "Search",
    viewAll: "View all",
    viewProducts: "Shop now",
    viewAllProducts: "View all products",
    backHome: "Back to home",
    loading: "Loading…",
    loadingProducts: "Loading products",
    photoOf: (name: string) => `Photo of ${name}`,
  },
});
