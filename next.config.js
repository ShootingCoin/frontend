module.exports = {
  env: {
    BE_ORIGIN: process.env.BE_ORIGIN,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
  
    return config;
  }
};
