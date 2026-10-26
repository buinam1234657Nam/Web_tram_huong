import React from "react";
import Link from "@/components/i18n/Link";
import { Metadata } from "next";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { layoutMessages } from "@/i18n/messages/layout";
import { commonMessages } from "@/i18n/messages/common";

export async function generateMetadata(): Promise<Metadata> {
  const t = layoutMessages[await getLocale()].notFound;
  return {
    title: t.metaTitle,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = layoutMessages[locale].notFound;
  const common = commonMessages[locale];
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
      <p className="text-sm font-medium text-gold-dark">{t.eyebrow}</p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-semibold text-agarwood tracking-tight">
        {t.title}
      </h1>
      <p className="mt-4 text-[15px] sm:text-base text-muted leading-relaxed">
        {t.body}
      </p>

      {/* Plain GET form: works without JavaScript and lands on the search page. */}
      <form
        action={localizePath("/tim-kiem", locale)}
        method="get"
        role="search"
        className="mt-10 mx-auto max-w-md flex items-center gap-2 rounded-full bg-ivory pl-5 pr-1.5 py-1.5"
      >
        <Search className="w-5 h-5 text-muted shrink-0" aria-hidden="true" />
        <label htmlFor="not-found-search" className="sr-only">
          {t.searchLabel}
        </label>
        <input
          id="not-found-search"
          type="text"
          enterKeyHint="search"
          name="q"
          placeholder={t.searchPlaceholder}
          className="flex-1 min-w-0 bg-transparent py-2.5 text-[15px] text-charcoal placeholder:text-muted-light focus:outline-none"
        />
        <Button type="submit" className="shrink-0 whitespace-nowrap">
          {common.search}
        </Button>
      </form>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {t.suggestions.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex px-4 py-2 rounded-full border border-border-subtle text-sm text-charcoal hover:border-charcoal transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Button href="/">{common.backHome}</Button>
        <Button href="/san-pham" variant="outline">
          {common.viewAllProducts}
        </Button>
      </div>
    </div>
  );
}
