import { ProductSummary, ProductVariant } from "./product";

export interface CartItem {
  id: string; // `${productId}-${variantId}`
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  variantName: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  quantity: number;
  maxQuantity: number;
}

export interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductSummary, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}
