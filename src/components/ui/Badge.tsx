import React from "react";
import { InventoryStatus } from "@/types/product";

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "forest" | "agarwood" | "champagne" | "outline";
  className?: string;
}) {
  const variantStyles = {
    default: "bg-ivory-dark text-charcoal",
    forest: "bg-forest/10 text-forest border border-forest/20",
    agarwood: "bg-agarwood/10 text-agarwood-dark border border-agarwood/20",
    champagne: "bg-champagne/15 text-champagne-dark border border-champagne/30",
    outline: "border border-border-subtle text-muted",
  };

  return (
    <span
      className={`inline-flex items-center text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StockBadge({
  status,
  className = "",
}: {
  status: InventoryStatus;
  className?: string;
}) {
  switch (status) {
    case "in_stock":
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap shrink-0 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          Còn hàng
        </span>
      );
    case "low_stock":
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 whitespace-nowrap shrink-0 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Số lượng có hạn
        </span>
      );
    case "out_of_stock":
      return (
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200 whitespace-nowrap shrink-0 ${className}`}
        >
          Tạm hết hàng
        </span>
      );
  }
}
