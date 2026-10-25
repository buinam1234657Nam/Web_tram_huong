import { MetadataRoute } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { siteUrl } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;

  const [products, categories, articles] = await Promise.all([
    catalogRepository.getProducts(),
    catalogRepository.getCategories(),
    catalogRepository.getArticles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ve-chung-toi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bai-viet`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/danh-muc/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/san-pham/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((art) => ({
    url: `${baseUrl}/bai-viet/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const policyRoutes: MetadataRoute.Sitemap = [
    "chinh-sach-bao-hanh",
    "chinh-sach-doi-tra",
    "chinh-sach-giao-hang",
    "chinh-sach-bao-mat",
  ].map((slug) => ({
    url: `${baseUrl}/chinh-sach/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...articleRoutes,
    ...policyRoutes,
  ];
}
