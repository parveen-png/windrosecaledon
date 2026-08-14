import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/thank-you", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
