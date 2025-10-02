/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // enables static export (creates "out" folder)
    images: {
      unoptimized: true, // needed since GitHub Pages doesn't support Next.js image optimizer
    },
    basePath: '/123', // replace "123" with your repo name
    assetPrefix: '/123/', // ensures assets load from correct path
  };
  
  export default nextConfig;
  