import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

const IMAGE_WIDTH = SCREEN_DIMENSIONS.width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.76;

export const stylesheet = createStyleSheet({
  container: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    flex: 1,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
});
