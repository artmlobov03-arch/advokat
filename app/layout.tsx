import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { absoluteUrl, siteConfig } from "./data/site";

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Уголовный адвокат в Подольске | Дмитрий Рожновский",
      template: "%s | Рожновский",
    },
    description:
      "Уголовный адвокат Дмитрий Рожновский в Подольске и Москве. Защита при задержании, на следствии и в суде. Юридический стаж с 2009 года.",
    applicationName: "Адвокат Дмитрий Рожновский",
    authors: [{ name: "Дмитрий Рожновский", url: absoluteUrl("/ob-advokate") }],
    creator: "Дмитрий Рожновский",
    publisher: "ПКА «СЕД ЛЕКС»",
    category: "Юридические услуги",
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: "Адвокат Дмитрий Рожновский",
      title: "Уголовный адвокат в Подольске | Дмитрий Рожновский",
      description:
        "Защита по уголовным делам в Подольске, Москве и Московской области. Юридический стаж с 2009 года.",
      url: "/",
      images: [{ url: absoluteUrl("/og.jpg"), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Адвокат Дмитрий Рожновский",
      description: "Защита по уголовным делам в Подольске и Москве.",
      images: [absoluteUrl("/og.jpg")],
    },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
