import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All images are self-hosted in /public/images.
  // No external image hosts are required at runtime.
  poweredByHeader: false,
};

export default nextConfig;
