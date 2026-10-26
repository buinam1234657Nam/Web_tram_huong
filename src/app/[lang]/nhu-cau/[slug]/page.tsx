import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogSkeleton } from "@/components/product/Skeletons";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { toSummary } from "@/data/catalog/products";
import { RITUALS, ritualBySlug } from "@/data/content/rituals";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { CatalogView } from "@/app/san-pham/CatalogView";

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
  const ritual = ritualBySlug(slug);

  if (!ritual) {
    return { title: "Không tìm thấy nhu cầu" };
  }

  return {
    title: `${ritual.label} – Trầm hương theo nhu cầu`,
    description: ritual.description,
    alternates: { canonical: `/nhu-cau/${ritual.slug}` },
    openGraph: {
      title: `${ritual.label} | VĨNH TRẦM`,
      description: ritual.description,
      url: `/nhu-cau/${ritual.slug}`,
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
  const ritual = ritualBySlug(slug);

  if (!ritual) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    catalogRepository.getProductsByRitual(ritual.slug),
    catalogRepository.getCategories(),
  ]);

  const breadcrumbs = [
    { label: "Sản phẩm", href: "/san-pham" },
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
