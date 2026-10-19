import { CartItem } from "./cart";

export type PaymentMethod = "cod" | "bank_transfer" | "vnpay";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  note?: string;
}

export interface Order {
  id: string;
  code: string; // e.g. "VT-20261019-9821"
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: "pending_confirmation" | "confirmed" | "shipping" | "completed";
  paymentStatus: "unpaid" | "paid" | "processing";
  demoNote: string;
}
