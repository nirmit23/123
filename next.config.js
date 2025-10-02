const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',   // enables static export
  basePath: '/123',   // your repo name
  assetPrefix: isProd ? '/123/' : '',
};
