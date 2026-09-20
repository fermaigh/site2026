import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/work/hiring-app",
        destination: "/work/ai-powered-hiring-platform",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
