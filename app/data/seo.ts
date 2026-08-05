import { absoluteUrl, siteConfig } from "./site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export const attorneySchema = {
  "@type": "Person",
  "@id": `${absoluteUrl("/ob-advokate")}#person`,
  name: siteConfig.legalName,
  jobTitle: "Адвокат",
  url: absoluteUrl("/ob-advokate"),
};

export const legalServiceSchema = {
  "@type": "LegalService",
  "@id": `${siteConfig.url}/#legal-service`,
  name: siteConfig.name,
  url: siteConfig.url,
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
