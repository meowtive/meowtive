import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  themeBackdrop: {
    width: SCREEN_DIMENSIONS.width,
    height: SCREEN_DIMENSIONS.height,
  },
});
