module.exports = function (api) {
  api.cache(true);

  const presets = [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    '@babel/preset-react',
    // 'react-native'
  ];
  const plugins = [
    ['module-resolver', {
      alias: {
        '^react-native$': 'react-native-web'
      }
    }]
  ];

  return {
    presets,
    plugins
  };
};
