import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    // allowedDevOrigins: ['localhost'],
  },
}

export default nextConfig
