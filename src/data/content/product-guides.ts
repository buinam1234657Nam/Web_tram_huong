import { brandConfig } from "@/lib/config/brand";
import { formatVND } from "@/lib/format/currency";
import type { Locale } from "@/i18n/config";

// TODO: chủ shop duyệt nội dung hướng dẫn và câu trả lời FAQ (cả bản tiếng Anh).

type CareGuides = Record<string, string[]>;

/** "Hướng dẫn sử dụng & bảo quản", keyed by category slug. */
const CARE_GUIDES: Record<Locale, CareGuides> = {
  vi: {
    "vong-tay-tram-huong": [
      "Tháo vòng khi tắm, bơi, rửa tay với xà phòng hoặc tập thể thao ra nhiều mồ hôi.",
      "Tránh nước hoa, cồn và hóa chất tẩy rửa tiếp xúc trực tiếp với hạt.",
      "Đeo thường xuyên để hơi ấm cơ thể giữ hương; khi không đeo, cất trong hộp hoặc túi vải kín.",
      "Lau nhẹ bằng khăn mềm, khô. Không đánh bóng bằng dầu hay sáp.",
    ],
    "trang-suc-tram-huong": [
      "Tháo khi tắm, bơi hoặc ngủ để tránh va đập và ẩm.",
      "Tránh nước hoa, mỹ phẩm và hóa chất tẩy rửa.",
      "Cất riêng trong hộp kín, tránh cọ xát với trang sức kim loại khác.",
      "Lau bằng khăn mềm, khô sau khi đeo.",
    ],
    "nhang-tram-huong": [
      "Thắp ở nơi thoáng, đặt trên lư hoặc đế cắm chống cháy, tránh gió lùa.",
      "Không để nhang cháy khi không có người trông, để xa rèm và vật dễ cháy.",
      "Đậy kín hộp sau khi dùng, để nơi khô ráo, tránh ánh nắng trực tiếp.",
    ],
    "tram-nu-xong-nha": [
      "Đặt nụ trên lư hoặc thác khói, đốt đầu nhọn đến khi bén lửa rồi thổi tắt cho nụ cháy âm ỉ.",
      "Dùng ở nơi kín gió để khói chảy đều; không để nụ cháy khi không có người trông.",
      "Bảo quản trong hộp kín, nơi khô ráo để nụ không hút ẩm.",
    ],
    "tram-huong-mieng": [
      "Xông bằng lư điện hoặc than gốm, để lửa nhỏ để hương tỏa từ từ, không làm cháy đen miếng trầm.",
      "Một miếng nhỏ có thể xông nhiều lần đến khi hết hương.",
      "Cất trong hộp kín hoặc túi zip, tránh ẩm và ánh nắng.",
    ],
    "tinh-dau-tram": [
      "Dùng một lượng rất nhỏ; thử trên vùng da nhỏ trước khi dùng trực tiếp lên da.",
      "Có thể nhỏ vào máy khuếch tán theo hướng dẫn của máy.",
      "Đậy chặt nắp, để nơi mát, tránh ánh nắng và xa tầm tay trẻ em.",
    ],
    "phu-kien-xong-tram": [
      "Đặt lư trên bề mặt chịu nhiệt, ổn định, xa vật dễ cháy.",
      "Đợi lư nguội hẳn rồi mới vệ sinh tro; lau bằng khăn khô.",
    ],
    "my-nghe-tram-huong": [
      "Đặt nơi khô ráo, tránh ánh nắng trực tiếp và hơi nước.",
      "Lau bụi bằng chổi lông mềm hoặc khăn khô; không dùng nước hay hóa chất.",
    ],
    "bo-qua-tang": [
      "Bảo quản hộp quà nơi khô ráo, tránh ánh nắng trực tiếp.",
      "Hướng dẫn chi tiết cho từng món đi kèm trong hộp.",
    ],
  },
  en: {
    "vong-tay-tram-huong": [
      "Take the bracelet off to shower, swim, wash your hands with soap or work out hard.",
      "Keep perfume, alcohol and cleaning products away from the beads.",
      "Wear it often so body warmth keeps the scent alive; when not wearing it, store it in a closed box or cloth pouch.",
      "Wipe gently with a soft, dry cloth. Never polish with oil or wax.",
    ],
    "trang-suc-tram-huong": [
      "Remove it to shower, swim or sleep to avoid knocks and moisture.",
      "Keep perfume, cosmetics and cleaning products away.",
      "Store it on its own in a closed box so it doesn't rub against metal jewellery.",
      "Wipe with a soft, dry cloth after wearing.",
    ],
    "nhang-tram-huong": [
      "Burn in a ventilated spot, in a burner or fireproof holder, away from draughts.",
      "Never leave incense burning unattended; keep it away from curtains and anything flammable.",
      "Close the box after use and store it somewhere dry, out of direct sunlight.",
    ],
    "tram-nu-xong-nha": [
      "Set the cone on a burner or backflow stand, light the tip until it catches, then blow out the flame so it smoulders.",
      "Use it out of the wind so the smoke flows evenly; never leave a cone burning unattended.",
      "Keep cones in a closed box somewhere dry so they don't absorb moisture.",
    ],
    "tram-huong-mieng": [
      "Warm the chips on an electric burner or charcoal over low heat so the scent rises slowly without scorching the wood.",
      "A small chip can be warmed many times until its scent is spent.",
      "Store in a closed box or zip bag, away from moisture and sunlight.",
    ],
    "tinh-dau-tram": [
      "A very small amount is enough; patch-test on a small area of skin before applying directly.",
      "You can add a few drops to a diffuser, following its instructions.",
      "Close the cap tightly and keep it somewhere cool, out of sunlight and away from children.",
    ],
    "phu-kien-xong-tram": [
      "Place the burner on a stable, heat-resistant surface away from anything flammable.",
      "Let it cool completely before emptying the ash; wipe with a dry cloth.",
    ],
    "my-nghe-tram-huong": [
      "Keep it somewhere dry, away from direct sunlight and steam.",
      "Dust with a soft brush or dry cloth; never use water or chemicals.",
    ],
    "bo-qua-tang": [
      "Store the gift box somewhere dry, out of direct sunlight.",
      "Each item in the box comes with its own care card.",
    ],
  },
};

const DEFAULT_CARE: Record<Locale, string[]> = {
  vi: [
    "Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.",
    "Tránh để sản phẩm tiếp xúc với nước và hóa chất.",
  ],
  en: [
    "Store somewhere cool and dry, out of direct sunlight.",
    "Keep the product away from water and chemicals.",
  ],
};

export function careGuideFor(categorySlug: string, locale: Locale = "vi") {
  return CARE_GUIDES[locale][categorySlug] ?? DEFAULT_CARE[locale];
}

/** Product page FAQ; also emitted as schema.org FAQPage. */
export function productFaq(categorySlug: string, locale: Locale = "vi") {
  const { policies } = brandConfig;
  const freeShipping = formatVND(policies.freeShippingThreshold);
  const isWearable =
    categorySlug === "vong-tay-tram-huong" || categorySlug === "trang-suc-tram-huong";

  if (locale === "en") {
    const items = [
      {
        question: "How can I tell natural agarwood from oil-treated wood?",
        answer:
          "Look at five signs: the scent before burning, the oil veins, the colour, the smoke when burned and how the surface feels. See “How to tell” above, or our “Understanding agarwood” guide for details.",
      },
      {
        question: "Can I inspect my order before paying?",
        answer: policies.inspectionOnDelivery
          ? "Yes. You can open and inspect the parcel on delivery and only pay if you're happy."
          : "Please call our hotline and we'll explain how to inspect your order.",
      },
      {
        question: "What is your returns policy?",
        answer: `Returns within ${policies.returnDays} days for defective items. Orders from ${freeShipping} ship free.`,
      },
    ];
    if (isWearable) {
      items.push({
        question: "Will the bracelet's scent fade?",
        answer:
          "Natural agarwood smells stronger as it warms against your skin and fades if left out in the air for long. Wearing it often and keeping it in a closed box when you don't helps it hold its scent.",
      });
    }
    return items;
  }

  const items = [
    {
      question: "Làm sao để biết trầm tự nhiên hay trầm tẩm dầu?",
      answer:
        "Có thể nhìn vào năm dấu hiệu: mùi khi chưa đốt, vân dầu, màu sắc, khói khi đốt và cảm giác bề mặt. Xem mục \"Cách nhận biết\" ngay phía trên hoặc bài \"Hiểu về trầm\" để biết chi tiết.",
    },
    {
      question: "Tôi có được kiểm tra hàng trước khi thanh toán không?",
      answer: policies.inspectionOnDelivery
        ? "Có. Quý khách được mở hộp đồng kiểm khi nhận hàng, hài lòng mới thanh toán."
        : "Vui lòng liên hệ hotline để được hướng dẫn kiểm tra hàng.",
    },
    {
      question: "Chính sách đổi trả thế nào?",
      answer: `Đổi trả trong ${policies.returnDays} ngày nếu sản phẩm lỗi. Đơn từ ${freeShipping} được miễn phí vận chuyển.`,
    },
  ];

  if (isWearable) {
    items.push({
      question: "Hương của vòng có nhạt dần không?",
      answer:
        "Trầm tự nhiên thơm rõ hơn khi ấm lên theo thân nhiệt và nhạt đi nếu để lâu ngoài không khí. Đeo thường xuyên và cất trong hộp kín khi không dùng sẽ giúp giữ hương.",
    });
  }

  return items;
}
