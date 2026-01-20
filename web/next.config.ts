import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static export
  },
  // Trailing slash for better static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
