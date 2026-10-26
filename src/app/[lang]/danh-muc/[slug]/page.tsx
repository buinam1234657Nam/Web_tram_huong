import React, { Suspense } from "react";
import { Metadata } from "next";
import { CatalogSkeleton } from "@/components/product/Skeletons";
import { notFound } from "next/navigation";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { toSummary } from "@/data/catalog/products";
import { CatalogView } from "@/app/[lang]/san-pham/CatalogView";
import { getLocale } from "@/i18n/server";
import { localeAlternates, localizePath } from "@/i18n/config";
import { catalogMessages } from "@/i18n/messages/catalog";
import { localizeCategory } from "@/i18n/messages/categories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await catalogRepository.getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [found, locale] = await Promise.all([
    catalogRepository.getCategoryBySlug(slug),
    getLocale(),
  ]);

  if (!found) {
    return {
      title: catalogMessages[locale].categoryNotFound,
    };
  }

  const category = localizeCategory(found, locale);
  const path = `/danh-muc/${category.slug}`;
  return {
    title: category.name,
    description: category.description,
    alternates: localeAlternates(path, locale),
    openGraph: {
      title: `${category.name} | VĨNH TRẦM`,
      description: category.description,
      url: localizePath(path, locale),
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

// The shell stays URL-independent; everything that reads `params` streams in
// inside Suspense (see "Move URL data behind Suspense" in the Next.js docs).
export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Suspense fallback={<CatalogSkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [found, locale] = await Promise.all([
    catalogRepository.getCategoryBySlug(slug),
    getLocale(),
  ]);

  if (!found) {
    notFound();
  }

  const category = localizeCategory(found, locale);
  const [products, categories] = await Promise.all([
    catalogRepository.getProducts({ categorySlug: category.slug }),
    catalogRepository.getCategories(),
  ]);

  const breadcrumbs = [
    {
      label: catalogMessages[locale].breadcrumbProducts,
      href: localizePath("/san-pham", locale),
    },
    { label: category.name, href: localizePath(`/danh-muc/${category.slug}`, locale) },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <CatalogView
        products={products.map(toSummary)}
        categories={categories.map((c) => localizeCategory(c, locale))}
        activeCategory={category}
      />
    </>
  );
}
