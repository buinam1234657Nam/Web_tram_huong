import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ProductGrid } from "@/components/product/ProductGrid";

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
      url: `https://vinhtram.vn/danh-muc/${category.slug}`,
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await catalogRepository.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await catalogRepository.getProducts({ categorySlug: slug });

  const breadcrumbs = [
    { label: "Sản phẩm", href: "/san-pham" },
    { label: category.name, href: `/danh-muc/${category.slug}` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Category Banner */}
      <div className="relative rounded-sm overflow-hidden bg-forest-dark text-ivory p-8 sm:p-12 lg:p-16 border border-forest">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs uppercase font-semibold text-champagne tracking-widest block">
            Danh Mục Chế Tác
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
            {category.description}
          </p>
          <p className="text-xs text-champagne-light pt-2 font-medium">
            Có sẵn {products.length} tác phẩm tuyển chọn
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="pt-4">
        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
