import React from "react";
import { getLocale } from "@/i18n/server";
import { commonMessages } from "@/i18n/messages/common";

export default async function Loading() {
  const t = commonMessages[await getLocale()];
  return (
    <div
      className="min-h-[50vh] flex items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{t.loading}</span>
      {/* Thin indeterminate bar instead of a spinner + copy */}
      <span
        aria-hidden="true"
        className="relative block h-0.5 w-24 overflow-hidden rounded-full bg-ivory-dark"
      >
        <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-espresso animate-[loading-slide_1.2s_ease-in-out_infinite]" />
      </span>
      <style>{`@keyframes loading-slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } } @media (prefers-reduced-motion: reduce) { [class*="loading-slide"] { animation: none; } }`}</style>
    </div>
  );
}
