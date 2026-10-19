import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
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

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: `/san-pham/${product.slug}`,
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `https://vinhtram.vn/san-pham/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await catalogRepository.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, reviews] = await Promise.all([
    catalogRepository.getRelatedProducts(product.id, product.categorySlug, 3),
    catalogRepository.getReviewsByProductId(product.id),
  ]);

  const breadcrumbs = [
    { label: "Sản phẩm", href: "/san-pham" },
    { label: product.categoryName, href: `/danh-muc/${product.categorySlug}` },
    { label: product.name, href: `/san-pham/${product.slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      <div className="pt-4">
        <ProductDetailView
          product={product}
          relatedProducts={relatedProducts}
          reviews={reviews}
        />
      </div>
    </div>
  );
}
