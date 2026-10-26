"use client";

import React, { createContext, useCallback, useContext } from "react";
import { DEFAULT_LOCALE, localizePath, type Locale } from "./config";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Set once by the root layout; every client component reads the locale from here. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Messages of one namespace for the current locale: `const t = useMessages(cartMessages)`. */
export function useMessages<T>(messages: Record<Locale, T>): T {
  return messages[useLocale()];
}

/** For router.push and other places that build URLs by hand. */
export function useLocalizePath() {
  const locale = useLocale();
  return useCallback((path: string) => localizePath(path, locale), [locale]);
}
