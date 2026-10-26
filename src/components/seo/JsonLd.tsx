import React from "react";
import { Product } from "@/types/product";
import { Article } from "@/types/article";
import { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { brandConfig } from "@/lib/config/brand";
import { absoluteUrl, siteUrl } from "@/lib/config/site";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandConfig.name,
    url: siteUrl,
    logo: absoluteUrl("/images/hero-agarwood.jpg"),
    description: brandConfig.storySummary,
    telephone: brandConfig.contact.hotline,
    email: brandConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: brandConfig.contact.address,
      addressLocality: "Nha Trang",
      addressRegion: "Khánh Hòa",
      addressCountry: "VN",
    },
    sameAs: [
      brandConfig.social.facebook,
      brandConfig.social.instagram,
      brandConfig.social.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : absoluteUrl(img),
    ),
    description: product.shortDescription,
    sku: product.variants[0]?.sku || product.id,
    brand: {
      "@type": "Brand",
      name: brandConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "VND",
      lowPrice: Math.min(product.price, ...product.variants.map((v) => v.price)),
      highPrice: Math.max(product.price, ...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability:
        product.inventoryStatus === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: absoluteUrl(`/san-pham/${product.slug}`),
    },
    // Google rejects an AggregateRating with zero reviews.
    ...(product.ratingCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.ratingAverage,
        reviewCount: product.ratingCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: item.href
      ? item.href.startsWith("http")
        ? item.href
        : absoluteUrl(item.href)
      : siteUrl,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: Article }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage.startsWith("http")
      ? article.coverImage
      : absoluteUrl(article.coverImage),
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: brandConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/hero-agarwood.jpg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/bai-viet/${article.slug}`),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
