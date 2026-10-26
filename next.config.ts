import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Temporary: product photos from the crawl (src/data/crawl) are served from
    // the source shop's uploads folder. Remove once the product API hosts images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thienmochuong.com",
        pathname: "/wp-content/uploads/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
