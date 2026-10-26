import { defineMessages } from "../config";

/**
 * Search page (/tim-kiem). Product data is Vietnamese only for now, so the
 * English suggestions show an English label but search the Vietnamese term.
 */
export const searchMessages = defineMessages({
  vi: {
    metaTitle: "Tìm Kiếm",
    metaDescription:
      "Tìm nhanh vòng tay, nhang trầm, trầm nụ và tinh dầu trầm hương tự nhiên của VĨNH TRẦM.",
    breadcrumb: "Tìm kiếm",
    heading: "Tìm kiếm",
    inputLabel: "Từ khóa tìm kiếm",
    placeholder: "Tên sản phẩm, loại trầm hoặc xuất xứ…",
    submit: "Tìm",
    popular: [
      { label: "Vòng tay 108 hạt", query: "Vòng tay 108 hạt" },
      { label: "Trầm nụ", query: "Trầm nụ" },
      { label: "Nhang không tăm", query: "Nhang không tăm" },
      { label: "Khánh Hòa", query: "Khánh Hòa" },
      { label: "Tinh dầu trầm", query: "Tinh dầu trầm" },
      { label: "Bộ quà tặng", query: "Bộ quà tặng" },
    ],
    resultsFor: (query: string) => `Kết quả cho “${query}”`,
    searching: "Đang tìm…",
    showing: (shown: number, total: number) =>
      `Đang hiển thị ${shown} / ${total} kết quả. Thêm từ khóa để thu hẹp tìm kiếm.`,
    noResultsTitle: "Không tìm thấy sản phẩm phù hợp",
    noResultsHint: "Thử từ khóa ngắn hơn như “vòng tay”, “nụ” hoặc “nhang”.",
    prompt: "Nhập từ khóa hoặc chọn một gợi ý để bắt đầu.",
    languageNote: "",
  },
  en: {
    metaTitle: "Search",
    metaDescription:
      "Quickly find VĨNH TRẦM natural agarwood bracelets, incense, cones and oud oil.",
    breadcrumb: "Search",
    heading: "Search",
    inputLabel: "Search terms",
    placeholder: "Product name, agarwood grade or origin…",
    submit: "Search",
    popular: [
      { label: "108-bead bracelets", query: "Vòng tay 108 hạt" },
      { label: "Incense cones", query: "Trầm nụ" },
      { label: "Stickless incense", query: "Nhang không tăm" },
      { label: "Khanh Hoa", query: "Khánh Hòa" },
      { label: "Oud oil", query: "Tinh dầu trầm" },
      { label: "Gift sets", query: "Bộ quà tặng" },
    ],
    resultsFor: (query: string) => `Results for “${query}”`,
    searching: "Searching…",
    showing: (shown: number, total: number) =>
      `Showing ${shown} of ${total} results. Add a word to narrow your search.`,
    noResultsTitle: "No matching products",
    noResultsHint: "Try a shorter term, such as “vong tay” (bracelet), “nu” (cone) or “nhang” (incense).",
    prompt: "Type a search term or pick a suggestion to begin.",
    languageNote:
      "Product names are in Vietnamese for now; Vietnamese terms (with or without accents) give the best results.",
  },
});
