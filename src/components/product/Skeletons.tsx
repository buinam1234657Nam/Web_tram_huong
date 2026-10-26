"use client";

import React from "react";
import { useMessages } from "@/i18n/client";
import { commonMessages } from "@/i18n/messages/common";

/** Placeholder shown while a catalog route resolves its URL params. */
export function CatalogSkeleton() {
  const t = useMessages(commonMessages);
  return (
    <div
      aria-busy="true"
      aria-label={t.loadingProducts}
      className="animate-pulse"
    >
      <div className="h-4 w-40 bg-ivory rounded" />
      <div className="mt-8 h-7 w-64 bg-ivory rounded" />
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-square bg-ivory" />
            <div className="mt-4 h-4 w-3/4 bg-ivory rounded" />
            <div className="mt-2 h-4 w-1/3 bg-ivory rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Placeholder shown while a product page resolves its URL params. */
export function ProductDetailSkeleton() {
  const t = useMessages(commonMessages);
  return (
    <div
      aria-busy="true"
      aria-label={t.loadingProducts}
      className="animate-pulse"
    >
      <div className="h-4 w-56 bg-ivory rounded" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,800px)_minmax(0,440px)] lg:justify-center gap-8 lg:gap-14 xl:gap-20">
        <div className="aspect-square bg-ivory" />
        <div>
          <div className="h-8 w-3/4 bg-ivory rounded" />
          <div className="mt-3 h-4 w-1/3 bg-ivory rounded" />
          <div className="mt-6 h-6 w-1/4 bg-ivory rounded" />
          <div className="mt-10 h-14 bg-ivory rounded-md" />
          <div className="mt-2 h-14 bg-ivory rounded-md" />
          <div className="mt-8 h-14 bg-ivory rounded-full" />
        </div>
      </div>
    </div>
  );
}
