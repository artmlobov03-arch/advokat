import type { MetadataRoute } from "next";
import { services } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rozhnovskiy.ru";
  const pages = ["", "/praktika", "/ob-advokate", "/statyi", "/kontakty"];
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${base}/uslugi/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
