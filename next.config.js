/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['cloudflare-ipfs.com', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
