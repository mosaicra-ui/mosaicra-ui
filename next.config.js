const path = require('path');
const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    removeConsole: true,
  },
};

module.exports = withContentlayer(nextConfig);
