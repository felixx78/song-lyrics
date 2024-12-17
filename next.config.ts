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
  serverExternalPackages: ["puppeteer-extra", "puppeteer-extra-plugin-stealth"],
};

export default nextConfig;
