/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for multi-workspace monorepo setup
  outputFileTracingRoot: __dirname,

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  swcMinify: true,

  // Use standalone mode for smaller Docker images
  output: 'standalone',

  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
