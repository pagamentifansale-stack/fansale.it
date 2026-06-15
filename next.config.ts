import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/tablet on the same LAN to access the dev server
  allowedDevOrigins: ['192.168.43.86'],
  images: {
    // Allow direct loading from external sources without proxy timeout issues
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
