const path = require('path');

const { getDefaultConfig } = require('@expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
  ...defaultConfig.resolver.alias,
  '@tamagui/web': path.resolve(__dirname, 'node_modules/tamagui'),
};
defaultConfig.resolver.assetExts = [
  ...defaultConfig.resolver.assetExts,
  'ttf', 'otf', 'woff', 'woff2', 'eot'
];

module.exports = defaultConfig;