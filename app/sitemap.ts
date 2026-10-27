import type { MetadataRoute } from "next";

const siteUrl = "https://priyanka-learning-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPaths = [
    "",
    "/about",
    "/classes",
    "/contact",
    "/gallery",
    "/learning",
    "/notes",
    "/results",
  ];

  return publicPaths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
