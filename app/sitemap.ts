import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  advice,
  practiceCases,
  services,
  siteConfig,
} from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/praktika", "/ob-advokate", "/statyi", "/kontakty"];
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: siteConfig.contentUpdatedAt,
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/uslugi/${service.slug}`),
      lastModified: siteConfig.contentUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...practiceCases.map((item) => ({
      url: absoluteUrl(`/praktika/${item.slug}`),
      lastModified: siteConfig.contentUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...advice.map((article) => ({
      url: absoluteUrl(`/statyi/${article.slug}`),
      lastModified: siteConfig.contentUpdatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
