/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix for 404 errors with static assets
  experimental: {
    // This will force Next.js to use the SWC compiler for improved performance
    swcMinify: true,
  },
  // Disable static optimization for development
  reactStrictMode: false,
  poweredByHeader: false,
}

export default nextConfig
