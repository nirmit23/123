/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/123',       // must match your repo name
    assetPrefix: '/123/',   // ensures assets load from the right path
    trailingSlash: true,    // <-- important for GitHub Pages
  };
  
  export default nextConfig;
  