import { defineMessages } from "../config";

/**
 * /hieu-ve-tram page chrome. The guide content itself (grades, regions,
 * resin age, authenticity signs) is in src/data/content/nhan-biet-tram.ts.
 * TODO: chủ shop duyệt nội dung chuyên môn, cả bản tiếng Anh.
 */
export const guideMessages = defineMessages({
  vi: {
    metaTitle: "Hiểu về trầm hương: loại trầm, vùng trầm và cách nhận biết",
    metaDescription:
      "Trầm chìm, bán chìm, nổi và trầm tốc khác nhau thế nào; các vùng trầm Việt Nam; tuổi tích trầm ảnh hưởng tới mùi và giá; cách phân biệt trầm tự nhiên với trầm tẩm dầu.",
    ogTitle: "Hiểu về trầm hương | VĨNH TRẦM",
    ogDescription:
      "Loại trầm, vùng trầm Việt Nam, tuổi tích trầm và cách nhận biết trầm tự nhiên.",
    ogImageAlt: "Trầm hương tự nhiên",
    breadcrumb: "Hiểu về trầm",
    eyebrow: "Hiểu về trầm",
    title: "Biết trầm trước khi chọn trầm",
    intro:
      "Cùng là trầm hương nhưng mùi, độ bền và giá có thể khác nhau rất xa. Bốn điều dưới đây giúp bạn đọc được một món trầm: nó thuộc loại nào, đến từ đâu, tích nhựa bao lâu và có bị tẩm dầu hay không.",
    tocLabel: "Mục lục",
    sections: {
      grades: "Các loại trầm",
      regions: "Vùng trầm Việt Nam",
      age: "Tuổi tích trầm",
      authenticity: "Phân biệt trầm tẩm dầu",
    },
    gradesTitle: "1. Các loại trầm",
    gradesBody:
      "Người chơi trầm phân loại chủ yếu theo lượng nhựa tích trong gỗ, dễ thấy nhất khi thả vào nước.",
    regionsTitle: "2. Vùng trầm Việt Nam",
    regionsBody:
      "Thổ nhưỡng và khí hậu mỗi vùng cho trầm một sắc hương riêng. Đây là những vùng thường được nhắc tới, không xếp theo thứ hạng.",
    ageTitle: "3. Tuổi tích trầm ảnh hưởng tới mùi và giá",
    authenticityTitle: "4. Phân biệt trầm tự nhiên và trầm tẩm dầu",
    authenticityBody: "Không cần dụng cụ: chỉ cần mũi, mắt, tay và một que diêm.",
    ritualsTitle: "Chọn trầm theo nhu cầu",
    ritualsBody:
      "Mỗi sản phẩm của Vĩnh Trầm đều có “Hồ sơ trầm” ghi rõ loại trầm, vùng và tuổi tích trầm khi đã được xác nhận.",

    // /nhu-cau/[slug]
    ritualMetaTitle: (label: string) => `${label} – Trầm hương theo nhu cầu`,
    ritualNotFound: "Không tìm thấy nhu cầu",
    productsBreadcrumb: "Sản phẩm",
  },
  en: {
    metaTitle: "Understanding agarwood: grades, regions and how to spot the real thing",
    metaDescription:
      "How sinking, semi-sinking, floating and insect-formed agarwood differ; Vietnam's agarwood regions; how resin age shapes scent and price; and how to tell natural agarwood from oil-treated wood.",
    ogTitle: "Understanding agarwood | VĨNH TRẦM",
    ogDescription:
      "Agarwood grades, Vietnamese regions, resin age and how to recognise natural agarwood.",
    ogImageAlt: "Natural agarwood",
    breadcrumb: "Understanding agarwood",
    eyebrow: "Understanding agarwood",
    title: "Know agarwood before you choose it",
    intro:
      "Two pieces of agarwood can differ enormously in scent, longevity and price. These four things help you read a piece: what grade it is, where it comes from, how long it gathered resin, and whether it has been oil-treated.",
    tocLabel: "Contents",
    sections: {
      grades: "Agarwood grades",
      regions: "Vietnamese regions",
      age: "Resin age",
      authenticity: "Spotting oil-treated wood",
    },
    gradesTitle: "1. Agarwood grades",
    gradesBody:
      "Collectors grade agarwood mainly by how much resin the wood holds, which shows most clearly when you drop it in water.",
    regionsTitle: "2. Vietnam's agarwood regions",
    regionsBody:
      "Each region's soil and climate give its agarwood a scent of its own. These are the regions most often mentioned, listed without ranking.",
    ageTitle: "3. How resin age shapes scent and price",
    authenticityTitle: "4. Natural vs. oil-treated agarwood",
    authenticityBody: "No tools needed: just your nose, eyes, hands and a match.",
    ritualsTitle: "Choose agarwood by occasion",
    ritualsBody:
      "Every VĨNH TRẦM product carries an “Agarwood profile” listing its grade, region and resin age once these are confirmed.",

    ritualMetaTitle: (label: string) => `${label} – Agarwood by occasion`,
    ritualNotFound: "Occasion not found",
    productsBreadcrumb: "Products",
  },
});
