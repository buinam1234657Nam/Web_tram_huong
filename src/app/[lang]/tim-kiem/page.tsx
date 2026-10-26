import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getLocale } from "@/i18n/server";
import { localeAlternates } from "@/i18n/config";
import { searchMessages } from "@/i18n/messages/search";
import { SearchView } from "./SearchView";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = searchMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/tim-kiem", locale),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage() {
  const t = searchMessages[await getLocale()];
  const breadcrumbs = [{ label: t.breadcrumb, href: "/tim-kiem" }];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-10 text-center text-3xl sm:text-4xl font-semibold text-agarwood">
        {t.heading}
      </h1>

      {/* The query comes from searchParams, so it must render inside Suspense. */}
      <Suspense fallback={<div className="py-24" aria-busy="true" />}>
        <SearchView />
      </Suspense>
    </div>
  );
}
