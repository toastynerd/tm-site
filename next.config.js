/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['highlight.js'],
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 