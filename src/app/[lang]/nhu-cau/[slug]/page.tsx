import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogSkeleton } from "@/components/product/Skeletons";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { toSummary } from "@/data/catalog/products";
import { RITUALS, ritualBySlugFor } from "@/data/content/rituals";
import { localeAlternates, localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { guideMessages } from "@/i18n/messages/guide";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CatalogView } from "@/app/[lang]/san-pham/CatalogView";

interface RitualPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RITUALS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: RitualPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = guideMessages[locale];
  const ritual = ritualBySlugFor(slug, locale);

  if (!ritual) {
    return { title: t.ritualNotFound };
  }

  const path = `/nhu-cau/${ritual.slug}`;
  return {
    title: t.ritualMetaTitle(ritual.label),
    description: ritual.description,
    alternates: localeAlternates(path, locale),
    openGraph: {
      title: `${ritual.label} | VĨNH TRẦM`,
      description: ritual.description,
      url: localizePath(path, locale),
      images: [{ url: ritual.image, alt: ritual.label }],
    },
  };
}

// The shell stays URL-independent; everything that reads `params` streams in
// inside Suspense (see "Move URL data behind Suspense" in the Next.js docs).
export default function RitualPage({ params }: RitualPageProps) {
  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Suspense fallback={<CatalogSkeleton />}>
        <RitualContent params={params} />
      </Suspense>
    </div>
  );
}

async function RitualContent({ params }: RitualPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const ritual = ritualBySlugFor(slug, locale);

  if (!ritual) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    catalogRepository.getProductsByRitual(ritual.slug),
    catalogRepository.getCategories(),
  ]);

  const breadcrumbs = [
    { label: guideMessages[locale].productsBreadcrumb, href: "/san-pham" },
    { label: ritual.label, href: `/nhu-cau/${ritual.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <p className="mt-4 max-w-2xl text-[15px] text-muted leading-relaxed">
        {ritual.description}
      </p>
      <CatalogView
        products={products.map(toSummary)}
        categories={categories}
        title={ritual.label}
        hideRitualFilter
      />
    </>
  );
}
