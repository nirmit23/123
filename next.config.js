/** @type {import('next').NextConfig} */
const nextConfig = {
    // Tell Next.js we want static HTML export
    output: 'export',
  
    // Required for GitHub Pages (repo name is 123)
    basePath: '/123',
    assetPrefix: '/123/',
  
    images: {
      unoptimized: true, // GitHub Pages doesn’t support Next.js image optimization
    },
  };
  
  module.exports = nextConfig;
  