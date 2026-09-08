import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    dangerouslyAllowLocalIP: true,

    remotePatterns: [
      // Browser / local development
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },

      // Docker internal network
      {
        protocol: "http",
        hostname: "backend",
        port: "8000",
        pathname: "/uploads/**",
      },

      // Production API
      {
        protocol: "https",
        hostname: "api.thehrrealty.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;