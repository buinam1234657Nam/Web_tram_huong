import { MetadataRoute } from "next";
import { catalogRepository } from "@/data/repositories/catalog-repository";
import { siteUrl } from "@/lib/config/site";
import { RITUALS } from "@/data/content/rituals";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, localizePath } from "@/i18n/config";

type Entry = MetadataRoute.Sitemap[number];
type Route = Omit<Entry, "url" | "alternates"> & { path: string };

const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/**
 * One sitemap entry per locale (vi unprefixed, en under /en), each listing
 * every language version as an hreflang alternate.
 */
function withLocales({ path, ...rest }: Route): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(
      LOCALES.map((l) => [LOCALE_TAGS[l], absolute(localizePath(path, l))]),
    ),
    "x-default": absolute(localizePath(path, DEFAULT_LOCALE)),
  };
  return LOCALES.map((locale) => ({
    ...rest,
    url: absolute(localizePath(path, locale)),
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, articles] = await Promise.all([
    catalogRepository.getProducts(),
    catalogRepository.getCategories(),
    catalogRepository.getArticles(),
  ]);

  const staticRoutes: Route[] = [
    { path: "/", lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { path: "/san-pham", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { path: "/ve-chung-toi", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { path: "/bai-viet", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { path: "/hieu-ve-tram", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...RITUALS.map((r) => ({
      path: `/nhu-cau/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  const categoryRoutes: Route[] = categories.map((cat) => ({
    path: `/danh-muc/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const productRoutes: Route[] = products.map((prod) => ({
    path: `/san-pham/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleRoutes: Route[] = articles.map((art) => ({
    path: `/bai-viet/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const policyRoutes: Route[] = [
    "chinh-sach-bao-hanh",
    "chinh-sach-doi-tra",
    "chinh-sach-giao-hang",
    "chinh-sach-bao-mat",
  ].map((slug) => ({
    path: `/chinh-sach/${slug}`,
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
  ].flatMap(withLocales);
}
