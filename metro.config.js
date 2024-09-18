const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const jsoMetroPlugin = require("obfuscator-io-metro-plugin")(
    {
      // Obfuscation options
      compact: false,
      sourceMap: false,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1,
    },
    {
      // Plugin options (optional)
      runInDev: false,
      logObfuscatedFiles: true,
    }
  );
  module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    ...jsoMetroPlugin,
  };


  const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);



