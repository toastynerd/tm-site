/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['highlight.js'],
  experimental: {
    optimizeCss: true,
  },
  output: 'standalone',
}

module.exports = nextConfig 