/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind',
    ],
  },
  images: {
    domains: ['cloudflare-ipfs.com', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
