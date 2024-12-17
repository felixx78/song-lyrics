import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.genius.com",
      },
    ],
  },
  serverExternalPackages: ["cloudflare-scraper"],
};

export default nextConfig;
