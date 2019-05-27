module.exports = function (api) {
  api.cache(true);

  const presets = [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    '@babel/preset-react',
  ];
  const plugins = [
    ['module-resolver', {
      alias: {
        '^react-native$': 'react-native-web'
      }
    }],
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
    'transform-class-properties',
  ];

  return {
    presets,
    plugins
  };
};
