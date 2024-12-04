import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  image: {
    height: SCREEN_DIMENSIONS.height / 3,
    width: SCREEN_DIMENSIONS.width - 40,
    objectFit: 'contain',
  },
});
