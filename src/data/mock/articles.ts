import { Article } from "@/types/article";

// Mock editorial content for the demo. Authors are fictional brand staff, not public figures.
export const mockArticles: Article[] = [
  {
    id: "art-4",
    slug: "cach-dot-tram-nu-dung-cach",
    title: "Cách Đốt Trầm Nụ Đúng Cách Để Khói Chảy Đẹp",
    excerpt:
      "Năm bước đơn giản để nụ trầm cháy đều, khói xuôi mềm và hương thơm trọn vẹn, cùng vài lưu ý an toàn khi xông trong nhà.",
    coverImage: "/images/incense-cones.jpg",
    category: "Nghệ thuật Thưởng trầm",
    author: {
      name: "Ban biên tập Vĩnh Trầm",
      role: "Kiến thức thưởng trầm",
    },
    publishedAt: "2026-10-20",
    readingTimeMinutes: 4,
    tags: ["Trầm nụ", "Cách xông trầm", "Thác khói"],
    content: `Trầm nụ là cách thưởng hương dễ nhất cho người mới: không cần lò xông, chỉ cần một chiếc lư hoặc thác khói nhỏ. Nhưng chỉ cần châm sai một chút, nụ trầm sẽ cháy nhanh, khói đứt quãng và hương bị khét.

## 1. Chuẩn bị
- Một lư gốm hoặc thác khói có lỗ thông ở đáy để khói chảy xuống.
- Bật lửa hoặc nến. Tránh dùng diêm có lưu huỳnh vì mùi diêm sẽ lẫn vào hương trầm.
- Chọn chỗ kín gió. Gió lùa làm khói tản và nụ cháy lệch.

## 2. Châm nụ
1. Cầm phần đáy nụ, hơ đầu nhọn vào lửa khoảng 5–10 giây cho tới khi đầu nụ đỏ đều.
2. Thổi nhẹ để tắt ngọn lửa. Nụ trầm chỉ cần cháy âm ỉ, không cần lửa.
3. Đặt nụ đứng thẳng lên lư hoặc úp vào lỗ thác khói.

Một nụ trầm thường cháy trong khoảng 15–20 phút, tùy kích thước.

## 3. Để khói chảy đẹp
- Thác khói cần được làm ấm. Nụ đầu tiên thường cho khói bay lên; từ nụ thứ hai, khói sẽ chảy xuôi mượt hơn.
- Lau sạch tàn và nhựa đọng trong lỗ thác sau vài lần dùng để khói không bị nghẹt.

## 4. Lưu ý an toàn
- Luôn đặt lư trên mặt phẳng chịu nhiệt, xa rèm, giấy và tầm tay trẻ nhỏ.
- Mở hé cửa sổ để phòng thông thoáng, nhất là phòng nhỏ.
- Không để nụ trầm cháy khi bạn rời khỏi phòng.`,
  },
  {
    id: "art-5",
    slug: "cham-soc-vong-tay-tram-huong",
    title: "Chăm Sóc Vòng Tay Trầm Hương Để Hương Bền Lâu",
    excerpt:
      "Những thói quen nhỏ khi đeo và cất giữ giúp vòng trầm giữ được vân gỗ đẹp và mùi hương tự nhiên qua nhiều năm.",
    coverImage: "/images/single-bracelet.jpg",
    category: "Kiến thức Trầm",
    author: {
      name: "Nghệ nhân Đặng Văn Hùng",
      role: "Trưởng xưởng chế tác Vĩnh Trầm Khánh Hòa",
    },
    publishedAt: "2026-10-15",
    readingTimeMinutes: 5,
    tags: ["Vòng tay trầm hương", "Bảo quản", "Chăm sóc"],
    content: `Vòng trầm tự nhiên càng đeo càng lên nước bóng và hương ấm hơn nhờ hơi ấm của tay người. Để được như vậy, bạn chỉ cần tránh vài thứ làm hỏng gỗ.

## 1. Những thứ nên tránh
- **Nước và xà phòng:** tháo vòng khi tắm, rửa bát hoặc đi bơi. Gỗ ngấm nước lâu có thể bị xỉn màu và nhạt hương.
- **Nước hoa, cồn, kem dưỡng:** mùi hóa chất bám vào gỗ sẽ át đi hương trầm.
- **Nắng gắt và nhiệt cao:** không để vòng trên taplo ô tô hoặc cạnh bếp.

## 2. Vệ sinh định kỳ
Lau vòng bằng khăn cotton mềm, khô sau khi đeo, nhất là những ngày ra nhiều mồ hôi. Không dùng bàn chải hay khăn ướt.

## 3. Cất giữ khi không đeo
Để vòng trong hộp hoặc túi vải kín, tránh không khí ẩm. Có thể đặt chung với vài mảnh trầm vụn để vòng giữ hương.

## 4. Khi nào cần thay dây
Dây co giãn sẽ chùng dần sau một thời gian. Khi thấy các hạt hở khe hoặc vòng lỏng hơn trước, hãy mang vòng tới xưởng để thay dây, tránh để đứt dây làm rơi hạt.`,
  },
  {
    id: "art-2",
    slug: "nghe-thuat-thuong-tram-ben-ban-tra",
    title: "Nghệ Thuật Thưởng Trầm Bên Bàn Trà Của Người Xưa",
    excerpt:
      "Sự kết hợp giữa ngụm trà ấm và làn khói trầm mỏng nhẹ tạo nên không gian thanh tịnh để lắng nghe chính mình.",
    coverImage: "/images/hero-agarwood.jpg",
    category: "Nghệ thuật Thưởng trầm",
    author: {
      name: "Trần Mai Anh",
      role: "Biên tập viên văn hóa trà & hương",
    },
    publishedAt: "2026-10-12",
    readingTimeMinutes: 5,
    tags: ["Thưởng trà", "Khói trầm", "Lối sống an nhiên"],
    content: `Từ lâu, trà và trầm đã là đôi bạn trong những buổi gặp gỡ tao nhã. Nếu trà đánh thức vị giác và sự tỉnh táo, thì trầm hương làm dịu tâm trí và mở ra một khoảng lặng.

## 1. Thời điểm thích hợp
Sáng sớm khi nắng vừa lên, hoặc buổi tối khi đã gác lại công việc, là lúc không khí lắng dịu và khứu giác nhạy nhất.

## 2. Chọn làn hương phù hợp
- **Khi trò chuyện cùng bạn bè:** nhang trầm không tăm cho khói mảnh, hương thanh và không lấn át mùi trà.
- **Khi ngồi một mình:** trầm miếng xông trên lò điện, hoặc trầm nụ trên thác khói, tạo không khí ấm và tĩnh.

## 3. Đừng để hương át trà
Đặt lư trầm cách bàn trà một khoảng và đốt trước khi pha trà vài phút. Khi trà đã rót, hương trầm chỉ nên còn thoang thoảng.`,
  },
  {
    id: "art-6",
    slug: "chon-kich-thuoc-hat-vong-tram",
    title: "Chọn Kích Thước Hạt Vòng Trầm Theo Cổ Tay",
    excerpt:
      "Cách đo cổ tay tại nhà và gợi ý chọn hạt 6, 8, 10 hay 12mm để vòng vừa vặn và cân đối với dáng tay.",
    coverImage: "/images/bracelet-108.jpg",
    category: "Kiến thức Trầm",
    author: {
      name: "Ban biên tập Vĩnh Trầm",
      role: "Tư vấn sản phẩm",
    },
    publishedAt: "2026-10-08",
    readingTimeMinutes: 4,
    tags: ["Size hạt", "Vòng tay trầm hương", "Hướng dẫn"],
    content: `Một chiếc vòng vừa tay sẽ nằm gọn ở cổ tay, không trượt xuống bàn tay và không hằn vào da. Bạn có thể tự đo trong một phút.

## 1. Đo chu vi cổ tay
1. Quấn một sợi dây mềm hoặc mảnh giấy dài quanh vị trí muốn đeo vòng.
2. Đánh dấu điểm hai đầu gặp nhau, không kéo quá chặt.
3. Trải phẳng và đo bằng thước, tính theo cm.

## 2. Gợi ý kích thước hạt
- **Hạt 6mm:** cổ tay khoảng 14 – 15,5 cm, hợp với cổ tay nhỏ hoặc chuỗi 108 hạt quấn nhiều vòng.
- **Hạt 8mm:** cổ tay khoảng 16 – 17,5 cm, cỡ phổ biến nhất cho cả nam và nữ.
- **Hạt 10 – 12mm:** cổ tay khoảng 17,5 – 19,5 cm, cho dáng tay lớn hoặc khi muốn vòng nổi bật.

## 3. Vòng đơn hay chuỗi 108 hạt?
Vòng đơn gọn và dễ đeo hằng ngày. Chuỗi 108 hạt thường quấn 3–4 vòng trên cổ tay, hoặc đeo cổ, phù hợp khi bạn muốn dùng để lần hạt.

Nếu số đo nằm giữa hai cỡ, hãy chọn cỡ lớn hơn. Xưởng có thể thêm hoặc bớt hạt để vòng vừa vặn.`,
  },
  {
    id: "art-3",
    slug: "y-nghia-phong-thuy-chuoi-vong-tram-108-hat",
    title: "Ý Nghĩa Chuỗi Vòng Trầm Hương 108 Hạt Trong Đời Sống",
    excerpt:
      "Con số 108 trong quan niệm phương Đông và lý do chuỗi trầm 108 hạt được nhiều người chọn làm vật hộ thân.",
    coverImage: "/images/raw-agarwood.jpg",
    category: "Phong thủy & Tinh thần",
    author: {
      name: "Ban biên tập Vĩnh Trầm",
      role: "Văn hóa & tín ngưỡng",
    },
    publishedAt: "2026-09-30",
    readingTimeMinutes: 6,
    tags: ["108 hạt", "Ý nghĩa phong thủy", "Vòng tay trầm hương"],
    content: `Trong văn hóa Phật giáo và nhiều truyền thống Á Đông, con số 108 tượng trưng cho sự trọn vẹn. Theo quan niệm phổ biến, con người mang 108 phiền não sinh ra từ sự tiếp xúc của các giác quan với thế giới bên ngoài.

## 1. Ý nghĩa của chuỗi 108 hạt
Khi lần từng hạt kết hợp với hơi thở chậm, tâm trí được nhắc quay về hiện tại. Với nhiều người, hương thơm dịu của trầm tự nhiên còn giúp họ cảm thấy thư thái hơn trong lúc thiền hoặc tụng niệm.

## 2. Đeo chuỗi 108 hạt thế nào
- Quấn 3–4 vòng trên cổ tay với hạt 6mm, hoặc đeo cổ với hạt 8mm.
- Khi lần hạt, bắt đầu từ hạt cạnh hạt mẹ (hạt lớn nhất) và lần theo một chiều.

Xem thêm hướng dẫn chọn kích thước hạt ở bài viết "Chọn kích thước hạt vòng trầm theo cổ tay".`,
  },
  {
    id: "art-1",
    slug: "phan-biet-tram-huong-tu-nhien-va-tram-nau-dau",
    title: "Cách Phân Biệt Trầm Hương Tự Nhiên Và Trầm Ép Dầu Hóa Chất",
    excerpt:
      "Những dấu hiệu về vân dầu, mùi hương và cách tỏa hương giúp bạn nhận biết trầm tự nhiên nguyên bản.",
    coverImage: "/images/artisan-story.jpg",
    category: "Kiến thức Trầm",
    author: {
      name: "Nghệ nhân Đặng Văn Hùng",
      role: "Trưởng xưởng chế tác Vĩnh Trầm Khánh Hòa",
    },
    publishedAt: "2026-09-18",
    readingTimeMinutes: 6,
    tags: ["Kiến thức trầm", "Phân biệt trầm", "Trầm Khánh Hòa"],
    content: `Trầm hương tự nhiên hình thành khi cây dó bầu (*Aquilaria crassna*) bị tổn thương, do sét đánh, gãy cành hoặc côn trùng đục khoét, và tiết nhựa để tự chữa lành. Qua nhiều năm, phần gỗ thấm nhựa ấy mới kết thành trầm.

## 1. Quan sát vân dầu và bề mặt
- **Trầm tự nhiên:** vân dầu phân bố không đều, uốn lượn tự nhiên; nhìn rõ thớ gỗ đan xen những tia dầu nâu sẫm hoặc đen.
- **Trầm ép dầu:** thường đen kịt hoặc nâu bóng đều từ ngoài vào trong, do được nấu áp suất với tinh dầu nhân tạo.

## 2. Thử bằng khứu giác
- **Trầm tự nhiên:** ở nhiệt độ phòng chỉ thoang thoảng, dịu và sạch. Hương tỏa rõ hơn khi gặp hơi ấm của tay hoặc khi được xông.
- **Trầm ép dầu:** vừa mở hộp đã nồng, hắc; ngửi lâu dễ gây khó chịu.

## 3. Mua ở đâu để yên tâm
Chọn nơi cho phép bạn kiểm tra hàng trước khi thanh toán và cam kết hoàn tiền nếu kiểm định ra trầm ép dầu.`,
  },
];
