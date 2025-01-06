import { createStyleSheet } from 'react-native-unistyles';

import { SMALL_SCREEN } from '@config/constants';
import { isAndroid } from '@config/platform';

export const stylesheet = createStyleSheet({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF2D9',
  },
  container: {
    flex: 1,
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: isAndroid ? 40 : 20,
  },
});
