import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  offScreenContainer: {
    position: 'absolute',
    left: -9999,
    width: 720,
    height: 1280,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  quoteText: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
