const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 🚫 Block framer-motion on native
config.resolver.alias = {
  ...(config.resolver.alias || {}),
  'framer-motion': false,
};

module.exports = config;
