import { brandConfig } from "@/lib/config/brand";

/*
  /ve-chung-toi copy and data. Edit here, not in the page component.
  Names, years after the founding year, numbers and photos are MOCK
  stand-ins until the shop sends its own; each `shot` says what the real
  photo should show (it is also the alt text).
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
