export type PaymentMethod = "cod" | "bank_transfer";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  province: string;
  district: string;
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
  code: string; // e.g. "VT-784394-7994"
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  items: OrderLine[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: "confirmed";
}
