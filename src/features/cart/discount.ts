export type DiscountResult =
  | { ok: true; code: string; amount: number }
  | { ok: false };

/**
 * Checks a discount code.
 *
 * TODO: gọi API mã giảm giá khi backend có. Until then every code is
 * rejected, so totals and the order sent to /api/orders never change; once
 * codes are real, send the accepted code with the order and let the server
 * recompute the total.
 */
export async function applyDiscountCode(code: string): Promise<DiscountResult> {
  void code;
  return { ok: false };
}
