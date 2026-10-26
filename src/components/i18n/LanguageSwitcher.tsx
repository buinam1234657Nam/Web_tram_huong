"use client";

import React, { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALES, LOCALE_LABELS, localizePath, splitLocale } from "@/i18n/config";
import { useLocale } from "@/i18n/client";

/**
 * VI / EN dropdown. Switching keeps the visitor on the same page (and query)
 * in the other language. `variant="row"` lays the options out inline for the
 * mobile menu.
 */
export function LanguageSwitcher({
  variant = "dropdown",
  className = "",
}: {
  variant?: "dropdown" | "row";
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Build-time prerender sees the internal "/vi/..." path; strip any prefix first.
  const { path } = splitLocale(pathname);
  const query = searchParams.toString();
  const hrefFor = (target: (typeof LOCALES)[number]) =>
    `${localizePath(path, target)}${query ? `?${query}` : ""}`;

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (variant === "row") {
    return (
      <div className={`flex gap-2 ${className}`} role="group" aria-label="Language / Ngôn ngữ">
        {LOCALES.map((l) => (
          <NextLink
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`h-10 px-4 rounded-full border text-sm font-medium inline-flex items-center transition-colors ${
              l === locale
                ? "border-mahogany bg-mahogany text-white"
                : "border-gold/40 text-mahogany hover:border-mahogany"
            }`}
          >
            {LOCALE_LABELS[l].name}
          </NextLink>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Language: ${LOCALE_LABELS[locale].name}`}
        className="h-9 pl-2.5 pr-2 rounded-full border border-gold/40 text-mahogany text-xs font-semibold inline-flex items-center gap-1.5 hover:border-mahogany transition-colors cursor-pointer"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        {LOCALE_LABELS[locale].short}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Language / Ngôn ngữ"
          className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-gold/25 bg-cream py-1.5 shadow-lg shadow-espresso/10 z-50"
        >
          {LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <NextLink
                href={hrefFor(l)}
                hrefLang={l}
                lang={l}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                  l === locale
                    ? "text-mahogany font-semibold"
                    : "text-charcoal hover:bg-cream-dark"
                }`}
              >
                <span>
                  <span className="inline-block w-7 text-xs font-semibold text-gold-dark">
                    {LOCALE_LABELS[l].short}
                  </span>
                  {LOCALE_LABELS[l].name}
                </span>
                {l === locale && <Check className="w-4 h-4" aria-hidden="true" />}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
