export type PaymentMethod = "cod" | "bank_transfer";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  /** Post-2025 units: province/city, then ward/commune (no district). */
  province: string;
  ward: string;
  streetAddress: string;
  note?: string;
  paymentMethod: PaymentMethod;
}

export interface OrderLine {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
}

/** Shape returned by the mock POST /api/orders and kept in sessionStorage for the success page. */
export interface Order {
  id: string;
  code: string; // e.g. "VT12345678", also the bank-transfer reference
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  items: OrderLine[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: "confirmed";
}
