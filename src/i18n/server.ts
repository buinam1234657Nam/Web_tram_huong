import { lang } from "next/root-params";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

/** Current locale in Server Components, read from the [lang] root segment. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Messages of one namespace for the current locale: `const t = await getMessages(homeMessages)`. */
export async function getMessages<T>(messages: Record<Locale, T>): Promise<T> {
  return messages[await getLocale()];
}
