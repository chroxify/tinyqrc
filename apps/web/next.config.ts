import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.tinyqrc.com",
      },
    ],
  },
};

export default nextConfig;
