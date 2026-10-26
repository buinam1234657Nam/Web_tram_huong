import { defineMessages } from "../config";

/** /ve-chung-toi page chrome; the story itself is in src/data/content/about.ts. */
export const aboutMessages = defineMessages({
  vi: {
    metaTitle: "Về xưởng Vĩnh Trầm",
    metaDescription:
      "Xưởng trầm nhỏ ở Vạn Giã, Khánh Hòa: ai chọn phôi, ai tiện hạt, ai ủ hũ, và showroom ở Quận 1 để thử mùi trước khi mua.",
    ogDescription: "Xưởng trầm nhỏ ở Vạn Giã, Khánh Hòa và showroom ở Quận 1.",
    breadcrumb: "Về chúng tôi",
    viewProducts: "Xem sản phẩm",
    visitLink: "Ghé xưởng & showroom",
    timelineEyebrow: "Từ rừng dó tới showroom",
    timelineTitle: "Xưởng đã đi qua những năm nào",
    teamTitle: "Năm người làm ra mỗi chuỗi vòng",
    placesTitle: "Ghé xưởng hoặc showroom",
    workshopTitle: "Xưởng Khánh Hòa",
    workshopNote: "Xưởng đang làm việc, nên gọi trước khi ghé để có người tiếp.",
    showroomTitle: "Showroom Quận 1",
    showroomNote: (hours: string) =>
      `Mở cửa ${hours}. Ghé uống trà, thử mùi, không cần đặt lịch.`,
    callBefore: "Hoặc gọi",
    callAfter: "để hỏi trước.",
    directions: "Xem đường đi",
  },
  en: {
    metaTitle: "About the VĨNH TRẦM workshop",
    metaDescription:
      "A small agarwood workshop in Van Gia, Khanh Hoa: who selects the wood, who turns the beads, who cures the jars, and a District 1 showroom where you can smell before you buy.",
    ogDescription: "A small agarwood workshop in Van Gia, Khanh Hoa, and a showroom in District 1.",
    breadcrumb: "About us",
    viewProducts: "View products",
    visitLink: "Visit the workshop & showroom",
    timelineEyebrow: "From the aquilaria forest to the showroom",
    timelineTitle: "The workshop through the years",
    teamTitle: "The five people behind every bracelet",
    placesTitle: "Visit the workshop or showroom",
    workshopTitle: "Khanh Hoa workshop",
    workshopNote: "It's a working workshop, so please call ahead so someone can welcome you.",
    showroomTitle: "District 1 showroom",
    showroomNote: (hours: string) =>
      `Open ${hours}. Drop in for tea and to try the scents, no appointment needed.`,
    callBefore: "Or call",
    callAfter: "to ask ahead.",
    directions: "Get directions",
  },
});
