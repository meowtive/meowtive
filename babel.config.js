module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    ['react-native-paper/babel'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './app/components',
          '@screens': './app/screens',
          '@config': './app/config',
          '@resources': './app/resources',
          '@types': './app/types',
          '@routes': './app/routes',
          '@utils': './app/utils',
          '@services': './app/services',
          '@libs': './app/libs',
          '@contexts': './app/contexts',
        },
      },
    ],
  ],
};
