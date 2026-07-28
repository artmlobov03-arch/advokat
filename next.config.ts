import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Локальный Cloudflare-preview не предоставляет ASSETS/IMAGES bindings.
    // Все изображения проекта уже оптимизированы, поэтому отдаём их напрямую.
    unoptimized: true,
  },
};

export default nextConfig;
