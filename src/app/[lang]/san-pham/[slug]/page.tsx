import React, { Suspense } from "react";
import { Metadata } from "next";
import { ProductDetailSkeleton } from "@/components/product/Skeletons";
import { notFound } from "next/navigation";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  ProductJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/JsonLd";
import { toSummary } from "@/data/catalog/products";
import { productFaq } from "@/data/content/product-guides";
import { getLocale } from "@/i18n/server";
import { localeAlternates, localizePath } from "@/i18n/config";
import { productMessages } from "@/i18n/messages/product";
import { categoryNameFor } from "@/i18n/messages/categories";
import { ProductDetailView } from "./ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await catalogRepository.getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [product, locale] = await Promise.all([
    catalogRepository.getProductBySlug(slug),
    getLocale(),
  ]);

  if (!product) {
    return {
      title: productMessages[locale].notFoundTitle,
    };
  }
  const path = `/san-pham/${product.slug}`;

  const pageTitle =
    product.seo.title.replace(/\s*\|\s*VĨNH TRẦM.*$/i, "").trim() ||
    product.name;

  return {
    title: pageTitle,
    description: product.seo.description,
    keywords: product.seo.keywords,
    // Product copy is Vietnamese-only for now, so the English page shares it.
    alternates: localeAlternates(path, locale),
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: localizePath(path, locale),
      images: [
        {
          url: product.images[0],
          width: 1024,
          height: 1024,
          alt: product.name,
        },
      ],
    },
  };
}

// The shell stays URL-independent; everything that reads `params` streams in
// inside Suspense (see "Move URL data behind Suspense" in the Next.js docs).
export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <div className="pt-6 pb-24">
      <Suspense
        fallback={
          <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
            <ProductDetailSkeleton />
          </div>
        }
      >
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await catalogRepository.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, reviews, locale] = await Promise.all([
    catalogRepository.getRelatedProducts(product.id, product.categorySlug, 6),
    catalogRepository.getReviewsByProductId(product.id),
    getLocale(),
  ]);

  const t = productMessages[locale];
  const faq = productFaq(product.categorySlug, locale);

  // Localized hrefs so the BreadcrumbList JSON-LD points at this language's pages too.
  const breadcrumbs = [
    { label: t.breadcrumbProducts, href: localizePath("/san-pham", locale) },
    {
      label: categoryNameFor(product.categorySlug, product.categoryName, locale),
      href: localizePath(`/danh-muc/${product.categorySlug}`, locale),
    },
    { label: product.name, href: localizePath(`/san-pham/${product.slug}`, locale) },
  ];

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={faq} />
      {/* The view lays out its own containers so the details band can run full width */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="pt-4">
        <ProductDetailView
          product={product}
          relatedProducts={relatedProducts.map(toSummary)}
          reviews={reviews}
          faq={faq}
        />
      </div>
    </>
  );
}
