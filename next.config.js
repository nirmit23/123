const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: '/123',   // repo name
  assetPrefix: isProd ? '/123/' : '',
};
