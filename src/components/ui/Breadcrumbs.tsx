import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-muted">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-forest transition-colors"
            title="Trang chủ"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Trang chủ</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-medium text-charcoal truncate max-w-[200px] sm:max-w-[320px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-forest transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
