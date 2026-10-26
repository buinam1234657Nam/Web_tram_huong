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
  const product = await catalogRepository.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
    };
  }

  const pageTitle =
    product.seo.title.replace(/\s*\|\s*VĨNH TRẦM.*$/i, "").trim() ||
    product.name;

  return {
    title: pageTitle,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: `/san-pham/${product.slug}`,
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `/san-pham/${product.slug}`,
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
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <Suspense fallback={<ProductDetailSkeleton />}>
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

  const [relatedProducts, reviews] = await Promise.all([
    catalogRepository.getRelatedProducts(product.id, product.categorySlug, 6),
    catalogRepository.getReviewsByProductId(product.id),
  ]);

  const faq = productFaq(product.categorySlug);

  const breadcrumbs = [
    { label: "Sản phẩm", href: "/san-pham" },
    { label: product.categoryName, href: `/danh-muc/${product.categorySlug}` },
    { label: product.name, href: `/san-pham/${product.slug}` },
  ];

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={faq} />
      <Breadcrumbs items={breadcrumbs} />

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
