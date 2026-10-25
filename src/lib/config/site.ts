/**
 * Public origin of the site, used for metadataBase, sitemap, robots and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain is live; until then Vercel's
 * production domain (a system env var) is used, then localhost for dev.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

/** Absolute URL for a site path or an already-absolute URL. */
export function absoluteUrl(pathOrUrl: string = "/") {
  return new URL(pathOrUrl, `${siteUrl}/`).toString();
}
