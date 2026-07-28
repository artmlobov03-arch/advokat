import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "rozhnovskiy.ru";
  const protocol = incoming.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: {
      default: "Уголовный адвокат в Подольске — Дмитрий Рожновский",
      template: "%s — Адвокат Дмитрий Рожновский",
    },
    description:
      "Адвокат Дмитрий Рожновский. Защита по уголовным делам в Подольске, Москве и Московской области.",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "Адвокат Дмитрий Рожновский",
      title: "Уголовный адвокат в Подольске — Дмитрий Рожновский",
      description: "Профессиональная защита по уголовным делам.",
      images: [{ url: new URL("/og.jpg", base).toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Адвокат Дмитрий Рожновский",
      description: "Профессиональная защита по уголовным делам.",
      images: [new URL("/og.jpg", base).toString()],
    },
  };
}

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
      </body>
    </html>
  );
}
