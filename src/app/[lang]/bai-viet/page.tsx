import React from "react";
import { Metadata } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getLocale } from "@/i18n/server";
import { localeAlternates, localizePath } from "@/i18n/config";
import { blogMessages } from "@/i18n/messages/blog";
import { ArticlesView } from "./ArticlesView";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = blogMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/bai-viet", locale),
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: localizePath("/bai-viet", locale),
      images: [
        {
          url: "/images/artisan-story.jpg",
          width: 1376,
          height: 768,
          alt: t.ogImageAlt,
        },
      ],
    },
  };
}

export default async function ArticlesPage() {
  const [articles, locale] = await Promise.all([
    catalogRepository.getArticles(),
    getLocale(),
  ]);
  const t = blogMessages[locale];

  const breadcrumbs = [{ label: t.breadcrumb, href: "/bai-viet" }];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-10 sm:mt-14 mb-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-semibold text-agarwood tracking-tight">
          {t.heading}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">{t.intro}</p>
      </header>

      <ArticlesView initialArticles={articles} />
    </div>
  );
}
