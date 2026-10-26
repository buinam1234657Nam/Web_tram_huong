"use client";

import React from "react";
import { guideContentFor } from "@/data/content/nhan-biet-tram";
import { useLocale } from "@/i18n/client";

const LABELS = {
  vi: { natural: "Tự nhiên:", treated: "Tẩm dầu:", naturalCol: "Trầm tự nhiên", treatedCol: "Trầm tẩm dầu" },
  en: { natural: "Natural:", treated: "Oil-treated:", naturalCol: "Natural agarwood", treatedCol: "Oil-treated agarwood" },
};

/**
 * "Cách nhận biết trầm tự nhiên với trầm tẩm dầu". `compact` shows only the
 * natural-agarwood side (home page teaser); `list` is the product accordion;
 * `cards` is the full side-by-side comparison on /hieu-ve-tram.
 * A client component so the product page (a client tree) can render it too.
 */
export function AuthenticitySigns({
  variant,
}: {
  variant: "compact" | "list" | "cards";
}) {
  const locale = useLocale();
  const AUTHENTICITY_SIGNS = guideContentFor(locale).authenticitySigns;
  const t = LABELS[locale];

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
              <span className="text-agarwood font-medium">{t.natural}</span>{" "}
              {sign.natural}
            </p>
            <p className="mt-0.5">
              <span className="text-muted font-medium">{t.treated}</span>{" "}
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
              {t.naturalCol}
            </span>
            {sign.natural}
          </p>
          <p className="text-[15px] text-muted leading-relaxed">
            <span className="block text-xs font-medium uppercase tracking-wider text-muted-light mb-1">
              {t.treatedCol}
            </span>
            {sign.treated}
          </p>
        </li>
      ))}
    </ol>
  );
}
