const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/123',   // 👈 repo name
  assetPrefix: isProd ? '/123/' : '',
};

module.exports = nextConfig;
