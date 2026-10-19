import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/gio-hang",
          "/thanh-toan",
          "/dat-hang/",
          "/tim-kiem",
        ],
      },
    ],
    sitemap: "https://vinhtram.vn/sitemap.xml",
  };
}
