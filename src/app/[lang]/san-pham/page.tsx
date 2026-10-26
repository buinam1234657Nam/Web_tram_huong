import React from "react";
import { Metadata } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { toSummary } from "@/data/catalog/products";
import { getLocale } from "@/i18n/server";
import { localeAlternates, localizePath } from "@/i18n/config";
import { catalogMessages } from "@/i18n/messages/catalog";
import { localizeCategory } from "@/i18n/messages/categories";
import { CatalogView } from "./CatalogView";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = catalogMessages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: localeAlternates("/san-pham", locale),
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: localizePath("/san-pham", locale),
      // A page-level openGraph replaces the root one entirely, so restate the image.
      images: [
        {
          url: "/images/bracelet-108.jpg",
          width: 1024,
          height: 1024,
          alt: t.ogImageAlt,
        },
      ],
    },
  };
}

export default async function ProductsPage() {
  const [products, categories, locale] = await Promise.all([
    catalogRepository.getProducts(),
    catalogRepository.getCategories(),
    getLocale(),
  ]);

  const breadcrumbs = [
    {
      label: catalogMessages[locale].breadcrumbProducts,
      href: localizePath("/san-pham", locale),
    },
  ];

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <CatalogView
        products={products.map(toSummary)}
        categories={categories.map((c) => localizeCategory(c, locale))}
      />
    </div>
  );
}
