/**
 * VietQR payload (EMVCo merchant-presented QR, NAPAS 247 "QRIBFTTA" service),
 * built locally so checkout never calls an outside QR service. Any Vietnamese
 * banking app that scans it pre-fills account, amount and reference.
 */

function field(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

/** CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF), as EMVCo field 63 requires. */
export function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/** Banking apps only carry plain ASCII letters, digits and spaces in the reference. */
export function toTransferText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .slice(0, 25);
}

export function buildVietQrPayload({
  bin,
  accountNumber,
  amount,
  reference,
}: {
  bin: string;
  accountNumber: string;
  amount?: number;
  reference?: string;
}): string {
  const beneficiary = field("00", bin) + field("01", accountNumber);
  const merchantInfo =
    field("00", "A000000727") + field("01", beneficiary) + field("02", "QRIBFTTA");
  const note = reference ? toTransferText(reference) : "";

  const payload =
    field("00", "01") +
    // 12 = dynamic QR (carries an amount), 11 = static
    field("01", amount ? "12" : "11") +
    field("38", merchantInfo) +
    field("53", "704") +
    (amount ? field("54", String(Math.round(amount))) : "") +
    field("58", "VN") +
    (note ? field("62", field("08", note)) : "") +
    "6304";

  return payload + crc16(payload);
}
