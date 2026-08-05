import type { NextConfig } from "next";

const isBegetStaticExport = process.env.BEGET_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: isBegetStaticExport ? "export" : undefined,
  trailingSlash: isBegetStaticExport,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Локальный Cloudflare-preview не предоставляет ASSETS/IMAGES bindings.
    // Все изображения проекта уже оптимизированы, поэтому отдаём их напрямую.
    unoptimized: true,
  },
};

export default nextConfig;
