module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './app/components',
          '@screens': './app/screens',
          '@config': './app/config',
          '@resources': './app/resources',
          '@types': './app/types',
        },
      },
    ],
  ],
};
