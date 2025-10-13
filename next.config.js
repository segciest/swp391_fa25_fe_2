/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Tắt auto CSS detection của Next.js 15
    optimizeCss: false,
  },
}

module.exports = nextConfig