const {getDefaultConfig} = require('metro-config');
const defaultConfig = getDefaultConfig.getDefaultValues(__dirname);

module.exports = {
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'pem'],
  },
};
