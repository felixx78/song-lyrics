import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.genius.com"],
  },
  output: "standalone",
};

export default nextConfig;
