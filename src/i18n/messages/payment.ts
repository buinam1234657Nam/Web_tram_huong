import { defineMessages } from "../config";

/** Bank-transfer details block, shared by checkout and the order confirmation. */
export const paymentMessages = defineMessages({
  vi: {
    bank: "Ngân hàng",
    accountNumber: "Số tài khoản",
    accountHolder: "Chủ tài khoản",
    amount: "Số tiền",
    reference: "Nội dung chuyển khoản",
    copy: "Sao chép",
    copyLabel: (what: string) => `Sao chép ${what.toLowerCase()}`,
    copied: "Đã chép",
    qrAlt: (amount: string, reference: string) =>
      `Mã VietQR chuyển ${amount}, nội dung ${reference}`,
    qrCaption: "Quét bằng ứng dụng ngân hàng",
    referenceHint:
      "Ghi đúng nội dung để shop đối soát nhanh. Đơn được đóng gói ngay khi nhận tiền.",
    sampleWarning:
      "Đây là tài khoản mẫu, shop chưa cấu hình tài khoản thật. Vui lòng không chuyển khoản; chọn COD hoặc gọi hotline.",
  },
  en: {
    bank: "Bank",
    accountNumber: "Account number",
    accountHolder: "Account holder",
    amount: "Amount",
    reference: "Transfer reference",
    copy: "Copy",
    copyLabel: (what: string) => `Copy ${what.toLowerCase()}`,
    copied: "Copied",
    qrAlt: (amount: string, reference: string) =>
      `VietQR code for ${amount}, reference ${reference}`,
    qrCaption: "Scan with your banking app",
    referenceHint:
      "Use this exact reference so we can match your payment. We pack your order as soon as it arrives.",
    sampleWarning:
      "This is a sample account; the shop hasn't set up its real one yet. Please don't transfer; choose cash on delivery or call us.",
  },
});
