const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false, // Mock 'fs' for frontend
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    util: require.resolve('util/')
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  );

  return config;
};
