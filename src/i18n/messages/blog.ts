import { defineMessages } from "../config";

/**
 * Blog UI (/bai-viet). Articles themselves are Vietnamese only for now;
 * `categories` only translates the tab and label text, the data keeps the
 * Vietnamese category names.
 */
export const blogMessages = defineMessages({
  vi: {
    metaTitle: "Tin Tức & Kiến Thức Trầm Hương",
    metaDescription:
      "Kiến thức phân biệt trầm hương tự nhiên, cách xông trầm, chăm sóc vòng tay và ý nghĩa chuỗi trầm 108 hạt.",
    ogTitle: "Tin Tức & Kiến Thức Trầm Hương | VĨNH TRẦM",
    ogDescription: "Kiến thức thưởng trầm và chăm sóc trầm hương tự nhiên.",
    ogImageAlt: "Nghệ nhân Vĩnh Trầm chế tác trầm hương",
    breadcrumb: "Tin tức",
    heading: "Tin tức & kiến thức trầm",
    intro:
      "Cách nhận biết trầm thật, cách xông, cách giữ vòng bền hương và những câu chuyện từ xưởng chế tác.",
    all: "Tất cả",
    tabsLabel: "Chuyên mục",
    categories: {} as Record<string, string>,
    readingTime: (minutes: number) => `${minutes} phút đọc`,
    empty: "Chưa có bài viết trong chuyên mục này.",
    notFoundTitle: "Không tìm thấy bài viết",
    topics: "Chủ đề:",
    allArticles: "Tất cả bài viết",
    ctaTitle: "Trải nghiệm trầm hương tự nhiên",
    ctaBody:
      "Bảo hành dây và đánh bóng trọn đời. Được mở hộp kiểm tra trước khi thanh toán.",
    ctaButton: "Xem sản phẩm",
    readNext: "Đọc tiếp",
    vietnameseOnly: "",
  },
  en: {
    metaTitle: "Journal & Agarwood Knowledge",
    metaDescription:
      "How to tell natural agarwood, how to burn it, how to care for your bracelet and what the 108-bead mala means.",
    ogTitle: "Journal & Agarwood Knowledge | VĨNH TRẦM",
    ogDescription: "Notes on enjoying and caring for natural agarwood.",
    ogImageAlt: "A Vĩnh Trầm artisan carving agarwood",
    breadcrumb: "Journal",
    heading: "Journal & agarwood knowledge",
    intro:
      "How to recognise genuine agarwood, how to burn it, how to keep a bracelet's scent, and stories from our workshop.",
    all: "All",
    tabsLabel: "Topics",
    categories: {
      "Nghệ thuật Thưởng trầm": "The Art of Agarwood",
      "Kiến thức Trầm": "Agarwood Basics",
      "Phong thủy & Tinh thần": "Feng Shui & Spirit",
    } as Record<string, string>,
    readingTime: (minutes: number) => `${minutes} min read`,
    empty: "No articles in this topic yet.",
    notFoundTitle: "Article not found",
    topics: "Topics:",
    allArticles: "All articles",
    ctaTitle: "Experience natural agarwood",
    ctaBody:
      "Lifetime cord replacement and polishing. Inspect your order before you pay.",
    ctaButton: "Shop the collection",
    readNext: "Read next",
    vietnameseOnly: "Our articles are currently available in Vietnamese only.",
  },
});
