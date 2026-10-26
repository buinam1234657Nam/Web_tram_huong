import { brandConfig } from "@/lib/config/brand";
import type { Locale } from "@/i18n/config";

/*
  /ve-chung-toi copy and data. Edit here, not in the page component.
  Names, years after the founding year, numbers and photos are MOCK
  stand-ins until the shop sends its own; each `shot` says what the real
  photo should show (it is also the alt text).
  English versions are at the bottom (aboutContentFor); they translate the
  same mock copy and need the same review once the real story is in.
*/

export const ABOUT_INTRO = {
  eyebrow: "Về Vĩnh Trầm",
  title: "Một xưởng trầm nhỏ ở Vạn Giã",
  body: `Hai gian nhà sau vườn ở Khánh Hòa: một gian tiện hạt, một gian ủ hũ. Từ năm ${brandConfig.foundingYear}, mọi chuỗi vòng của Vĩnh Trầm đều đi qua tay năm người bên dưới.`,
  image: "/images/artisan-story.jpg",
  shot: "Thợ xỉa giác trầm bên bàn gỗ trong xưởng, mạt gỗ quanh tay",
};

export const PHILOSOPHY = {
  title: "Tôn trọng sự thật của gỗ",
  body: [
    "Ngoài chợ có nhiều trầm nấu dầu áp suất cao, ngâm hương liệu công nghiệp cho thơm nồng và đen bóng. Vĩnh Trầm làm ngược lại: giữ nguyên thớ gỗ dó bầu như lúc lấy ra khỏi khúc.",
    "Mỗi vệt dầu là dấu vết riêng của năm tháng và thời tiết. Hạt chỉ được mài bằng vải thô, để bạn ngửi đúng mùi ngọt dịu, ấm của trầm chứ không phải mùi hương liệu.",
  ],
  rules: [
    {
      title: "Không tẩm dầu",
      body: "Không nấu áp suất, không ngâm tinh dầu nhân tạo. Hạt thơm bao nhiêu là do khúc gỗ.",
    },
    {
      title: "Không phủ bóng",
      body: "Không phun PU, không sáp. Hạt bóng lên dần nhờ dầu trong gỗ gặp hơi ấm của tay.",
    },
    {
      title: "Không nhuộm màu",
      body: "Vân sáng tối không đều là bình thường. Hạt đen bóng đều từ ngoài vào trong mới đáng ngờ.",
    },
  ],
};

/** The shop's own timeline: forest → workshop → showroom. MOCK. */
export const TIMELINE = [
  {
    year: "2009",
    title: "Đi mua trầm ở Vạn Ninh",
    body: "Chú Ba Lộc thu mua phôi dó từ các hộ quanh Vạn Lương, Vạn Phú rồi bán lại cho xưởng ở Nha Trang.",
    image: "/images/raw-agarwood.jpg",
    shot: "Bao phôi dó vừa thu mua, đặt trên nền đất đỏ",
  },
  {
    year: String(brandConfig.foundingYear),
    title: "Dựng xưởng sau nhà",
    body: "Anh Tâm mua hai máy tiện cũ, kê sau nhà để tự làm hạt thay vì bán phôi thô. Tháng đầu làm được 12 chuỗi.",
    image: "/images/single-bracelet.jpg",
    shot: "Những chuỗi vòng đầu tiên của xưởng xếp trên bàn gỗ",
  },
  {
    year: "2020",
    title: "Không bỏ phí vụn trầm",
    body: "Cô Sáu Mai gom vụn sau khi tiện, xay mịn, trộn keo bời lời ép thành nụ. Trầm nụ và nhang ra đời từ phần gỗ trước đây bỏ đi.",
    image: "/images/incense-cones.jpg",
    shot: "Nụ trầm mới ép đang cháy trên lư gốm",
  },
  {
    year: "2023",
    title: "Mở showroom ở Quận 1",
    body: "Một phòng nhỏ để khách ở Sài Gòn được cầm, ngửi trước khi mua. Chị Thảo trông quầy và pha trà.",
    image: "/images/incense-sticks.jpg",
    shot: "Bàn trà trong showroom, khay nhang đang cháy",
  },
];

/** The people. MOCK names and roles; photos are stand-ins. */
export const TEAM = [
  {
    name: "Chú Ba Lộc",
    role: "Chọn phôi",
    note: "Hơn 30 năm mua bán trầm; nhìn mặt cắt là biết khúc nào đáng giữ.",
    image: "/images/raw-agarwood.jpg",
    shot: "Chân dung chú Ba bên đống phôi dó",
  },
  {
    name: "Chị Hồng",
    role: "Xỉa giác",
    note: "Xỉa bằng bộ dao tự rèn, mỗi ngày khoảng 3 kg phôi.",
    image: "/images/hero-agarwood.jpg",
    shot: "Chị Hồng cúi xỉa giác bên cửa sổ xưởng",
  },
  {
    name: "Anh Tâm",
    role: "Thợ tiện, chủ xưởng",
    note: "Con chú Ba; dựng xưởng tiện sau nhà với hai máy cũ.",
    image: "/images/artisan-story.jpg",
    shot: "Anh Tâm đứng cạnh máy tiện, tạp dề dính mạt gỗ",
  },
  {
    name: "Cô Sáu Mai",
    role: "Ủ hũ, làm trầm nụ",
    note: "Gom vụn trầm sau khi tiện để ép nụ, không bỏ phí phần nào.",
    image: "/images/incense-cones.jpg",
    shot: "Cô Sáu nặn nụ trầm trên mâm gỗ",
  },
  {
    name: "Chị Thảo",
    role: "Đóng hộp, trông showroom",
    note: "Viết tay thẻ bảo hành cho từng hộp; tiếp khách ở Quận 1.",
    image: "/images/gift-set.jpg",
    shot: "Chị Thảo đóng hộp quà, thẻ bảo hành bên cạnh",
  },
];

// ---------------------------------------------------------------- English

const ABOUT_INTRO_EN: typeof ABOUT_INTRO = {
  ...ABOUT_INTRO,
  eyebrow: "About VĨNH TRẦM",
  title: "A small agarwood workshop in Van Gia",
  body: `Two rooms behind a garden in Khanh Hoa: one for turning beads, one for curing jars. Since ${brandConfig.foundingYear}, every VĨNH TRẦM bracelet has passed through the hands of the five people below.`,
  shot: "An artisan cleaning agarwood at a wooden bench in the workshop, shavings around his hands",
};

const PHILOSOPHY_EN: typeof PHILOSOPHY = {
  title: "Respecting the truth of the wood",
  body: [
    "The market is full of agarwood pressure-cooked in oil and soaked in industrial fragrance to smell strong and look glossy black. VĨNH TRẦM does the opposite: we keep the aquilaria grain exactly as it came out of the log.",
    "Every oil vein is a record of its own years and weather. Beads are polished only with rough cloth, so what you smell is the soft, warm sweetness of agarwood, not added fragrance.",
  ],
  rules: [
    {
      title: "No oil treatment",
      body: "No pressure-cooking, no soaking in artificial oils. However fragrant a bead is, that is the wood itself.",
    },
    {
      title: "No glossy coating",
      body: "No PU spray, no wax. The beads gain their shine slowly as the wood's own oil meets the warmth of your hand.",
    },
    {
      title: "No dye",
      body: "Uneven light and dark veins are normal. Beads that are glossy black all the way through are the ones to question.",
    },
  ],
};

const TIMELINE_EN: typeof TIMELINE = [
  {
    ...TIMELINE[0],
    title: "Buying agarwood in Van Ninh",
    body: "Uncle Ba Loc bought raw aquilaria wood from households around Van Luong and Van Phu and sold it on to workshops in Nha Trang.",
    shot: "Sacks of freshly bought raw aquilaria wood on red earth",
  },
  {
    ...TIMELINE[1],
    title: "A workshop behind the house",
    body: "Tam bought two old lathes and set them up behind the house to make beads himself instead of selling raw wood. In the first month he made 12 bracelets.",
    shot: "The workshop's first bracelets laid out on a wooden table",
  },
  {
    ...TIMELINE[2],
    title: "Wasting no agarwood dust",
    body: "Auntie Sau Mai gathered the shavings left after turning, ground them fine and pressed them with litsea bark binder into cones. Our cones and incense were born from wood once thrown away.",
    shot: "Freshly pressed agarwood cones burning on a ceramic burner",
  },
  {
    ...TIMELINE[3],
    title: "A showroom in District 1",
    body: "A small room where customers in Saigon can hold and smell before they buy. Thao looks after the counter and makes the tea.",
    shot: "The tea table in the showroom, a tray of incense burning",
  },
];

const TEAM_EN: typeof TEAM = [
  {
    ...TEAM[0],
    role: "Selects the raw wood",
    note: "Over 30 years trading agarwood; one look at a cut face tells him which log is worth keeping.",
    shot: "Portrait of Uncle Ba beside a pile of raw aquilaria wood",
  },
  {
    ...TEAM[1],
    role: "Cleans the sapwood",
    note: "Works with a set of knives she forged herself, about 3 kg of raw wood a day.",
    shot: "Hong bent over her work by the workshop window",
  },
  {
    ...TEAM[2],
    role: "Bead turner, workshop owner",
    note: "Uncle Ba's son; built the lathe workshop behind the house with two old machines.",
    shot: "Tam standing beside the lathe, apron covered in shavings",
  },
  {
    ...TEAM[3],
    role: "Cures the jars, makes the cones",
    note: "Collects the agarwood dust left after turning to press cones, so nothing goes to waste.",
    shot: "Auntie Sau shaping agarwood cones on a wooden tray",
  },
  {
    ...TEAM[4],
    role: "Packs the boxes, runs the showroom",
    note: "Handwrites the warranty card for every box and welcomes visitors in District 1.",
    shot: "Thao packing a gift box, a warranty card beside it",
  },
];

export function aboutContentFor(locale: Locale) {
  if (locale === "en") {
    return { intro: ABOUT_INTRO_EN, philosophy: PHILOSOPHY_EN, timeline: TIMELINE_EN, team: TEAM_EN };
  }
  return { intro: ABOUT_INTRO, philosophy: PHILOSOPHY, timeline: TIMELINE, team: TEAM };
}
