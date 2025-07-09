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
  // Disable static optimization for development
  reactStrictMode: false,
  poweredByHeader: false,
}

export default nextConfig
