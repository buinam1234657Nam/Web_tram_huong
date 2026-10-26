"use client";

import { useEffect, useState } from "react";
import type { ProductSummary } from "@/types/product";

/** Debounce so typing "vòng tay" doesn't fire a request per keystroke. */
const DEBOUNCE_MS = 200;

/**
 * Queries /api/products/search. `enabled: false` skips fetching (e.g. while the
 * overlay is closed). An empty query returns bestsellers.
 */
export function useProductSearch(
  query: string,
  { limit, enabled = true }: { limit?: number; enabled?: boolean } = {},
) {
  const [state, setState] = useState<{
    query: string | null;
    total: number;
    products: ProductSummary[];
  }>({ query: null, total: 0, products: [] });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const params = new URLSearchParams({ q: query });
    if (limit) params.set("limit", String(limit));

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?${params}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setState({ query, total: data.total, products: data.products });
      } catch {
        // Aborted by a newer query, or offline: keep the last results.
      }
    }, query ? DEBOUNCE_MS : 0);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, limit, enabled]);

  return { ...state, isLoading: enabled && state.query !== query };
}
