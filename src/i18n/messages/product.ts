import { defineMessages } from "../config";

/** Product card, product page chrome and the back-in-stock form. */
export const productMessages = defineMessages({
  vi: {
    // Card
    bestseller: "Bán chạy",
    outOfStock: "Tạm hết hàng",
    addToCart: "Thêm vào giỏ",
    addToCartLabel: (name: string) => `Thêm vào giỏ: ${name}`,
    notifyMe: "Báo tôi khi có hàng",
    notifyMeLabel: (name: string) => `Báo tôi khi có hàng: ${name}`,
    altAngle: (name: string) => `${name} - góc chụp khác`,
    sinksBadge: "Chìm nước",

    // Carousel
    viewAll: "Xem tất cả",
    prevProducts: "Xem sản phẩm trước",
    nextProducts: "Xem sản phẩm tiếp theo",

    // Gallery
    viewImage: (n: number) => `Xem ảnh ${n}`,
    imageAlt: (name: string, n: number) => `${name} - ảnh ${n}`,
    prevImage: "Ảnh trước",
    nextImage: "Ảnh tiếp theo",

    // Buy box
    discount: (pct: number) => `Giảm ${pct}%`,
    profileTitle: "Hồ sơ trầm",
    commitment: "Cam kết:",
    chooseVariant: "Chọn quy cách",
    sizeGuide: "Hướng dẫn chọn size",
    soldOut: "Hết hàng",
    added: "Đã thêm vào giỏ",
    buyNow: "Mua ngay",
    zaloConsult: "Tư vấn chọn trầm qua Zalo",

    // Detail tabs
    detailsLabel: "Thông tin sản phẩm",
    description: "Mô tả sản phẩm",
    scent: "Hương thơm",
    scentIntensity: "Độ tỏa hương",
    scentNotes: "Tầng hương",
    scentLongevity: "Lưu hương",
    specs: "Thông số & xuất xứ",
    specOrigin: "Xuất xứ",
    specHarvest: "Thu hái",
    sku: "Mã sản phẩm",
    authenticity: "Cách nhận biết trầm thật",
    authenticityMore: "Xem đầy đủ trong “Hiểu về trầm”",
    care: "Sử dụng & bảo quản",
    shippingFree: (amount: string) => `Miễn phí vận chuyển cho đơn từ ${amount}.`,
    shippingInspect: "Được mở hộp đồng kiểm trước khi thanh toán.",
    shippingReturns: (days: number) => `Đổi trả trong ${days} ngày nếu sản phẩm lỗi.`,
    shippingWarranty: "Bảo hành thay dây, đánh bóng hạt trọn đời.",
    reviews: (n: number) => `Đánh giá (${n})`,
    noReviews: "Chưa có đánh giá nào cho sản phẩm này.",
    faq: "Câu hỏi thường gặp",
    related: "Có thể bạn cũng thích",

    // Size guide modal
    sizeGuideIntro:
      "Quấn một sợi dây mềm quanh cổ tay ở vị trí muốn đeo, đánh dấu điểm giao nhau rồi đo trên thước (cm).",
    sizeBead: "Hạt",
    sizeWrist: "Cổ tay",
    sizeFit: "Phù hợp",
    sizeSmall: "Cổ tay nhỏ",
    sizeMedium: "Cổ tay vừa",
    sizeLarge: "Cổ tay lớn",
    sizeNote: "Vĩnh Trầm hỗ trợ thêm hoặc bớt hạt miễn phí để vòng vừa vặn nhất.",
    close: "Đóng",

    // Back-in-stock form
    bisContactLabel: "Số điện thoại hoặc email",
    bisIntro: "Sản phẩm tạm hết. Để lại liên hệ, chúng tôi sẽ báo ngay khi có hàng.",
    bisPlaceholder: "0908 xxx xxx hoặc ten@email.com",
    bisSubmit: "Gửi",
    bisSuccess: "Vĩnh Trầm sẽ báo cho Quý khách ngay khi sản phẩm có hàng trở lại.",
    bisInvalid: "Vui lòng nhập số điện thoại hoặc email hợp lệ.",
    bisNetworkError: "Không thể kết nối đến máy chủ, vui lòng thử lại sau.",

    // Breadcrumbs & metadata
    breadcrumbProducts: "Sản phẩm",
    notFoundTitle: "Không tìm thấy sản phẩm",
  },
  en: {
    bestseller: "Bestseller",
    outOfStock: "Out of stock",
    addToCart: "Add to bag",
    addToCartLabel: (name: string) => `Add to bag: ${name}`,
    notifyMe: "Notify me when available",
    notifyMeLabel: (name: string) => `Notify me when available: ${name}`,
    altAngle: (name: string) => `${name} - another angle`,
    sinksBadge: "Sinks in water",

    viewAll: "View all",
    prevProducts: "Previous products",
    nextProducts: "Next products",

    viewImage: (n: number) => `View image ${n}`,
    imageAlt: (name: string, n: number) => `${name} - image ${n}`,
    prevImage: "Previous image",
    nextImage: "Next image",

    discount: (pct: number) => `${pct}% off`,
    profileTitle: "Agarwood profile",
    commitment: "Our promise:",
    chooseVariant: "Choose an option",
    sizeGuide: "Size guide",
    soldOut: "Sold out",
    added: "Added to bag",
    buyNow: "Buy now",
    zaloConsult: "Ask our agarwood advisor on Zalo",

    detailsLabel: "Product details",
    description: "Description",
    scent: "Scent",
    scentIntensity: "Intensity",
    scentNotes: "Notes",
    scentLongevity: "Longevity",
    specs: "Details & origin",
    specOrigin: "Origin",
    specHarvest: "Harvest",
    sku: "SKU",
    authenticity: "Spotting real agarwood",
    authenticityMore: "Read the full guide in “Understanding agarwood”",
    care: "Use & care",
    shippingFree: (amount: string) => `Free shipping on orders from ${amount}.`,
    shippingInspect: "Open and inspect your parcel before you pay.",
    shippingReturns: (days: number) => `Returns within ${days} days for defective items.`,
    shippingWarranty: "Lifetime cord replacement and bead polishing.",
    reviews: (n: number) => `Reviews (${n})`,
    noReviews: "No reviews for this product yet.",
    faq: "Frequently asked questions",
    related: "You may also like",

    sizeGuideIntro:
      "Wrap a soft string around your wrist where you'll wear the bracelet, mark where it meets, then measure it against a ruler (cm).",
    sizeBead: "Bead",
    sizeWrist: "Wrist",
    sizeFit: "Fit",
    sizeSmall: "Small wrist",
    sizeMedium: "Medium wrist",
    sizeLarge: "Large wrist",
    sizeNote: "We'll add or remove beads free of charge for a perfect fit.",
    close: "Close",

    bisContactLabel: "Phone number or email",
    bisIntro: "This item is out of stock. Leave your contact and we'll let you know as soon as it's back.",
    bisPlaceholder: "Phone number or name@email.com",
    bisSubmit: "Send",
    bisSuccess: "We'll let you know as soon as this item is back in stock.",
    bisInvalid: "Please enter a valid phone number or email.",
    bisNetworkError: "Couldn't reach the server. Please try again later.",

    breadcrumbProducts: "Products",
    notFoundTitle: "Product not found",
  },
});
