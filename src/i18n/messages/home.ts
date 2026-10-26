import { defineMessages } from "../config";

/** Home page and its components (hero slider, featured showcase). */
export const homeMessages = defineMessages({
  vi: {
    metaDescription:
      "Thương hiệu trầm hương thượng hạng chế tác thủ công từ cây dó bầu Khánh Hòa & Quảng Nam. Vòng tay trầm hương, nhang trầm, trầm nụ, tinh dầu nguyên chất.",

    heroLabel: "Banner Vĩnh Trầm",
    heroGoTo: (n: number) => `Xem banner ${n}`,
    heroPrev: "Banner trước",
    heroNext: "Banner tiếp theo",

    showcaseEyebrow: "Tuyển chọn của Vĩnh Trầm",
    showcaseTitle: "Tuyển tác phẩm",
    showcaseBody:
      "Mỗi sản phẩm là một câu chuyện về thiên nhiên, về sự kiên nhẫn và giá trị trường tồn.",
    viewAll: "Xem tất cả",
    showcaseLabel: "Sản phẩm tuyển chọn",
    showcaseGoTo: (n: number) => `Xem sản phẩm ${n}`,
    showcasePrev: "Sản phẩm trước",
    showcaseNext: "Sản phẩm tiếp theo",
    bestseller: "Bán chạy",
    from: "Từ",
    viewDetails: "Xem chi tiết",
    explore: "Khám phá",
    collections: [
      { title: "Tuyển tập quà tặng", subtitle: "Nghệ thuật trao gửi" },
      { title: "Trầm hương tự nhiên", subtitle: "Giá trị nguyên bản" },
    ],

    ritualsTitle: "Mua theo nhu cầu",
    ritualsLink: "Xem tất cả sản phẩm",

    guideEyebrow: "Hiểu về trầm",
    guideTitle: "Năm dấu hiệu của trầm tự nhiên",
    guideBody:
      "Trước khi chọn trầm, hãy biết cách phân biệt trầm tự nhiên với trầm tẩm dầu, chỉ bằng mũi, mắt và tay.",
    guideCta: "Xem đầy đủ",
    readMore: "Đọc thêm:",
    allArticles: "Tất cả bài viết",

    workshopImageAlt: "Nghệ nhân VĨNH TRẦM chế tác trầm hương thủ công",
    workshopEyebrow: "Câu chuyện xưởng & nghệ nhân",
    workshopTitle: "Từ đôi tay nghệ nhân",
    workshopBody:
      "Không tẩm hóa chất, không phủ bóng nhân tạo. Từng mảnh giác được xỉa sạch để giữ nguyên thớ dầu.",
    workshopCta: "Ghé thăm xưởng",

    whyEyebrow: "Vì sao chọn Vĩnh Trầm",
    whyTitle: "Tinh túy từ rừng dó bầu Khánh Hòa",
    whyBody:
      "Mỗi chuỗi trầm bắt đầu từ cây dó bầu tích nhựa hàng chục năm. Chúng tôi chỉ giữ lại phần tinh túy nhất để trao đến tay bạn.",
    factNatural: "Trầm tự nhiên, không tẩm ướp",
    factFounded: "Năm thành lập xưởng",
    factLines: "Dòng sản phẩm thủ công",
    factReturns: (days: number) => ({ value: `${days} ngày`, label: "Đổi trả nếu sản phẩm lỗi" }),

    reviewsEyebrow: "Cảm nhận thật",
    reviewsTitle: "Khách hàng nói gì",
    reviewsBody: "Những chia sẻ từ khách đã đeo, đã thắp trầm của Vĩnh Trầm.",
    verifiedPurchase: "Đã mua hàng",
    purchased: "Đã mua",
    stars: (n: number) => `${n} trên 5 sao`,

    showroomEyebrow: "Showroom",
    showroomTitle: "Ghé thử mùi trước khi chọn",
    showroomImageAlt: "Nhang trầm đang toả khói trên khay gỗ",
    directions: "Xem đường đi",
    call: (phone: string) => `Gọi ${phone}`,
    newsletterTitle: "Nhận tin từ Vĩnh Trầm",
    newsletterBody:
      "Kiến thức thưởng trầm, bộ sưu tập mới và ưu đãi dành riêng cho thành viên.",
  },
  en: {
    metaDescription:
      "Fine natural agarwood, handcrafted from Khanh Hoa and Quang Nam aquilaria trees: agarwood bracelets, incense sticks, incense cones and pure oud oil.",

    heroLabel: "VĨNH TRẦM banners",
    heroGoTo: (n: number) => `Show banner ${n}`,
    heroPrev: "Previous banner",
    heroNext: "Next banner",

    showcaseEyebrow: "Curated by VĨNH TRẦM",
    showcaseTitle: "Curated pieces",
    showcaseBody:
      "Every piece tells a story of nature, of patience and of lasting value.",
    viewAll: "View all",
    showcaseLabel: "Curated products",
    showcaseGoTo: (n: number) => `Show product ${n}`,
    showcasePrev: "Previous product",
    showcaseNext: "Next product",
    bestseller: "Bestseller",
    from: "From",
    viewDetails: "View details",
    explore: "Explore",
    collections: [
      { title: "Gift collection", subtitle: "The art of giving" },
      { title: "Natural agarwood", subtitle: "Value in its original form" },
    ],

    ritualsTitle: "Shop by occasion",
    ritualsLink: "View all products",

    guideEyebrow: "Understanding agarwood",
    guideTitle: "Five signs of natural agarwood",
    guideBody:
      "Before you choose, learn to tell natural agarwood from oil-treated wood using nothing but your nose, eyes and hands.",
    guideCta: "Read the full guide",
    readMore: "Read more:",
    allArticles: "All articles",

    workshopImageAlt: "A VĨNH TRẦM artisan handcrafting agarwood",
    workshopEyebrow: "Our workshop & artisans",
    workshopTitle: "Shaped by artisans' hands",
    workshopBody:
      "No chemical soaking, no artificial gloss. Every piece is cleaned of pale sapwood by hand to keep the oil-rich grain intact.",
    workshopCta: "Visit the workshop",

    whyEyebrow: "Why VĨNH TRẦM",
    whyTitle: "The essence of Khanh Hoa's aquilaria forests",
    whyBody:
      "Every string of agarwood begins with an aquilaria tree that has gathered resin for decades. We keep only its finest part for you.",
    factNatural: "Natural agarwood, never treated",
    factFounded: "Workshop founded",
    factLines: "Handcrafted product lines",
    factReturns: (days: number) => ({ value: `${days} days`, label: "Returns on faulty items" }),

    reviewsEyebrow: "In their words",
    reviewsTitle: "What our customers say",
    reviewsBody: "Notes from customers who wear and burn VĨNH TRẦM agarwood.",
    verifiedPurchase: "Verified purchase",
    purchased: "Purchased",
    stars: (n: number) => `${n} out of 5 stars`,

    showroomEyebrow: "Showroom",
    showroomTitle: "Smell it before you choose",
    showroomImageAlt: "Agarwood incense smoking on a wooden tray",
    directions: "Get directions",
    call: (phone: string) => `Call ${phone}`,
    newsletterTitle: "News from VĨNH TRẦM",
    newsletterBody:
      "Agarwood know-how, new collections and members-only offers.",
  },
});
