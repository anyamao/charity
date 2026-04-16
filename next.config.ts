import type { NextConfig } from "next";

const nextConfig: NextConfig = {
output: 'standalone', // ✅ Критично для Docker
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
