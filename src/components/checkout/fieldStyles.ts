/**
 * Shared look for checkout inputs (height is set per control). 16px text below lg so iOS Safari doesn't
 * zoom in on focus; placeholders use the lighter placeholder token.
 */
export const inputClass = (hasError: boolean) =>
  `w-full px-4 rounded-lg bg-cream-dark/25 border text-base lg:text-[15px] text-charcoal placeholder:text-placeholder focus:outline-none focus:border-agarwood focus:ring-2 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-60 transition-colors ${
    hasError ? "border-rose-500" : "border-gold/30 hover:border-gold/60"
  }`;
