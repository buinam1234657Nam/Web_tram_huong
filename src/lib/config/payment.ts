/**
 * Account that receives bank transfers, shown on checkout and on the order
 * confirmation. Set the NEXT_PUBLIC_BANK_* variables (see .env.example);
 * NEXT_PUBLIC_ because shoppers see these details in the browser.
 *
 * TODO: chủ shop điền tài khoản thật vào env. Until then the sample account
 * below is used and checkout warns shoppers not to transfer to it.
 */
export const bankAccount = {
  bankName: process.env.NEXT_PUBLIC_BANK_NAME || "Vietcombank",
  /** NAPAS bank BIN for VietQR, e.g. 970436 = Vietcombank. */
  bin: process.env.NEXT_PUBLIC_BANK_BIN || "970436",
  accountNumber: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "0123456789",
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "VINH TRAM",
  isSample: !process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER,
};
