import React, { Suspense } from "react";
import { Metadata } from "next";
import { CatalogSkeleton } from "@/components/product/Skeletons";
import { notFound } from "next/navigation";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { toSummary } from "@/data/catalog/products";
import { CatalogView } from "@/app/[lang]/san-pham/CatalogView";

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
  const category = await catalogRepository.getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Không tìm thấy danh mục",
    };
  }

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: `/danh-muc/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | VĨNH TRẦM`,
      description: category.description,
      url: `/danh-muc/${category.slug}`,
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
  const category = await catalogRepository.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    catalogRepository.getProducts({ categorySlug: category.slug }),
    catalogRepository.getCategories(),
  ]);

  const breadcrumbs = [
    { label: "Sản phẩm", href: "/san-pham" },
    { label: category.name, href: `/danh-muc/${category.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />
      <CatalogView
        products={products.map(toSummary)}
        categories={categories}
        activeCategory={category}
      />
    </>
  );
}
