import type { Order } from "@/types/order";

// Mock orders aren't persisted server-side, so the success page reads the order the
// checkout just placed from sessionStorage. Only the order code goes in the URL.
const keyFor = (code: string) => `vinhtram-order:${code}`;

export function saveOrder(order: Order) {
  try {
    sessionStorage.setItem(keyFor(order.code), JSON.stringify(order));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the success page degrades gracefully.
  }
}

export function loadOrder(code: string): Order | null {
  try {
    const raw = sessionStorage.getItem(keyFor(code));
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
