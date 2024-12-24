import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  offScreenContainer: {
    position: 'absolute',
    left: -9999,
    minWidth: SCREEN_DIMENSIONS.width,
    minHeight: SCREEN_DIMENSIONS.height,
    resizeMode: 'cover',
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
});
