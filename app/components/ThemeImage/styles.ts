import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

const IMAGE_WIDTH = SCREEN_DIMENSIONS.width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.76;

export const stylesheet = createStyleSheet({
  container: {
    maxWidth: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
});
