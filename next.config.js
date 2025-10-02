/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/123',      // use your repo name here
    assetPrefix: '/123/',  // prefix assets so CSS/JS load correctly
  };
  
  export default nextConfig;
  