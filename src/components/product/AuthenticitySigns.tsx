import React from "react";
import { AUTHENTICITY_SIGNS } from "@/data/content/nhan-biet-tram";

/**
 * "Cách nhận biết trầm tự nhiên với trầm tẩm dầu". `compact` shows only the
 * natural-agarwood side (home page teaser); `list` is the product accordion;
 * `cards` is the full side-by-side comparison on /hieu-ve-tram.
 */
export function AuthenticitySigns({
  variant,
}: {
  variant: "compact" | "list" | "cards";
}) {
  if (variant === "compact") {
    return (
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AUTHENTICITY_SIGNS.map((sign, idx) => (
          <li
            key={sign.id}
            className="rounded-2xl border border-gold/30 bg-white/5 p-5"
          >
            <p className="text-sm font-medium text-gold-light">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-[15px] font-medium text-white">
              {sign.title}
            </p>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              {sign.natural}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "list") {
    return (
      <ol className="space-y-4">
        {AUTHENTICITY_SIGNS.map((sign, idx) => (
          <li key={sign.id}>
            <p className="font-medium text-charcoal">
              {idx + 1}. {sign.title}
            </p>
            <p className="mt-1">
              <span className="text-agarwood font-medium">Tự nhiên:</span>{" "}
              {sign.natural}
            </p>
            <p className="mt-0.5">
              <span className="text-muted font-medium">Tẩm dầu:</span>{" "}
              {sign.treated}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="space-y-3">
      {AUTHENTICITY_SIGNS.map((sign, idx) => (
        <li
          key={sign.id}
          className="rounded-2xl border border-border-subtle p-5 sm:p-6 grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-3 md:gap-6"
        >
          <p className="font-medium text-agarwood">
            {idx + 1}. {sign.title}
          </p>
          <p className="text-[15px] text-charcoal leading-relaxed">
            <span className="block text-xs font-medium uppercase tracking-wider text-gold-dark mb-1">
              Trầm tự nhiên
            </span>
            {sign.natural}
          </p>
          <p className="text-[15px] text-muted leading-relaxed">
            <span className="block text-xs font-medium uppercase tracking-wider text-muted-light mb-1">
              Trầm tẩm dầu
            </span>
            {sign.treated}
          </p>
        </li>
      ))}
    </ol>
  );
}
