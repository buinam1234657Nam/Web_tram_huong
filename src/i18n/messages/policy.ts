import { defineMessages } from "../config";

type PolicyHeadline = { title: string; shortTitle: string; summary: string };

/**
 * Policy pages (/chinh-sach/[slug]). Only the page chrome and each policy's
 * headline are translated; policy bodies stay Vietnamese for now.
 * Vietnamese headlines live with the bodies in the page file.
 */
export const policyMessages = defineMessages({
  vi: {
    notFoundTitle: "Không tìm thấy chính sách",
    ogImageAlt: "Trầm hương tự nhiên Vĩnh Trầm",
    breadcrumb: "Chính sách",
    navLabel: "Chính sách",
    sidebarHeading: "Chính sách",
    needHelp: "Cần hỗ trợ thêm? Gọi",
    stillQuestions: "Còn câu hỏi? Gọi",
    browseProducts: "Xem sản phẩm",
    vietnameseOnly: "",
    headlines: {} as Record<string, PolicyHeadline>,
  },
  en: {
    notFoundTitle: "Policy not found",
    ogImageAlt: "Natural agarwood by Vĩnh Trầm",
    breadcrumb: "Policies",
    navLabel: "Policies",
    sidebarHeading: "Policies",
    needHelp: "Need more help? Call",
    stillQuestions: "Still have questions? Call",
    browseProducts: "Shop the collection",
    vietnameseOnly:
      "The full policy text below is currently available in Vietnamese only. Call us any time for help in English.",
    headlines: {
      "chinh-sach-bao-hanh": {
        title: "Lifetime cord replacement & bead polishing",
        shortTitle: "Warranty & polishing",
        summary: "Vĩnh Trầm looks after your bracelet for as long as you own it.",
      },
      "chinh-sach-doi-tra": {
        title: "7-day returns",
        shortTitle: "7-day returns",
        summary:
          "You have 7 days from delivery to exchange or return a piece you're not happy with.",
      },
      "chinh-sach-giao-hang": {
        title: "Shipping & inspection on delivery",
        shortTitle: "Shipping & inspection",
        summary: "We deliver nationwide, and you can open and check the box before paying.",
      },
      "chinh-sach-bao-mat": {
        title: "Customer privacy",
        shortTitle: "Privacy",
        summary: "We only use your details to deliver your order and look after you afterwards.",
      },
    } as Record<string, PolicyHeadline>,
  },
});
