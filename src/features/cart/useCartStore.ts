"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStoreState, CartItem } from "@/types/cart";
import { Product, ProductVariant } from "@/types/product";

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, variant?: ProductVariant, quantity = 1) => {
        const selectedVariant = variant || product.variants[0];
        const itemId = `${product.id}-${selectedVariant.id}`;
        const maxQty = selectedVariant.inventoryQuantity;

        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingItemIndex > -1) {
            const currentItem = state.items[existingItemIndex];
            const newQty = Math.min(currentItem.quantity + quantity, maxQty);

            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...currentItem,
              quantity: newQty,
            };
            return { items: updatedItems, isOpen: true };
          } else {
            const newItem: CartItem = {
              id: itemId,
              productId: product.id,
              variantId: selectedVariant.id,
              name: product.name,
              slug: product.slug,
              variantName: selectedVariant.name,
              price: selectedVariant.price,
              compareAtPrice: selectedVariant.compareAtPrice,
              image: product.images[0] || "/images/hero-agarwood.jpg",
              quantity: Math.min(quantity, maxQty),
              maxQuantity: maxQty,
            };
            return { items: [...state.items, newItem], isOpen: true };
          }
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              const safeQty = Math.min(quantity, item.maxQuantity);
              return { ...item, quantity: safeQty };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "vinhtram-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
