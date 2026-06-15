import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator ("N" button)
  devIndicators: false,
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
  async rewrites() {
    return [
      // /cerca → /search
      { source: '/cerca', destination: '/search' },
      // /evento/:slug → /event/:slug
      { source: '/evento/:slug', destination: '/event/:slug' },
      // /evento/:slug/biglietti → /event/:slug/tickets
      { source: '/evento/:slug/biglietti', destination: '/event/:slug/tickets' },
      // /biglietto/:id → /ticket/:id
      { source: '/biglietto/:id', destination: '/ticket/:id' },
      // /acquisto/:id → /checkout/:id
      { source: '/acquisto/:id', destination: '/checkout/:id' },
    ]
  },
  async redirects() {
    return [
      // Redirect old English URLs to Italian ones (301 permanent)
      { source: '/search', destination: '/cerca', permanent: true },
      { source: '/event/:slug', destination: '/evento/:slug', permanent: true },
      { source: '/event/:slug/tickets', destination: '/evento/:slug/biglietti', permanent: true },
      { source: '/ticket/:id', destination: '/biglietto/:id', permanent: true },
      { source: '/checkout/:id', destination: '/acquisto/:id', permanent: true },
    ]
  },
};

export default nextConfig;
