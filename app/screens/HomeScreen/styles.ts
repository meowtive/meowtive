import { createStyleSheet } from 'react-native-unistyles';

import { SMALL_SCREEN } from '@config/constants';
import { isAndroid } from '@config/platform';

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF2D9',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: isAndroid ? 40 : 20,
  },
  textWrapper: {
    rowGap: 6,
  },
  quote: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
