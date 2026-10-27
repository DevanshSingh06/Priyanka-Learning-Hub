import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/teacher/", "/auth/", "/api/"],
    },
    sitemap: "https://priyanka-learning-hub.vercel.app/sitemap.xml",
  };
}
