module.exports = {
  env: {
    WS_ORIGIN: process.env.WS_ORIGIN,
    HTTP_ORIGIN: process.env.HTTP_ORIGIN,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
  
    return config;
  }
};
