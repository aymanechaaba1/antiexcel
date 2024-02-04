/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

module.exports = nextConfig;
