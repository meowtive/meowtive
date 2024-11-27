import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  image: {
    width: SCREEN_DIMENSIONS.width,
    height: SCREEN_DIMENSIONS.height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
});
