/**
 * Order codes look like "VT12345678". The same string is the bank-transfer
 * reference, so it stays plain ASCII with no separators (banking apps strip them).
 */
export const ORDER_CODE_PATTERN = /^VT\d{8}$/;

export function createOrderCode(): string {
  const time = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `VT${time}${random}`;
}
