import { createStyleSheet } from 'react-native-unistyles';

import { SMALL_SCREEN, SCREEN_DIMENSIONS } from '@config/constants';
import { isAndroid } from '@config/platform';

export const stylesheet = createStyleSheet({
  logo: {
    width: 200,
    height: 45,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: isAndroid ? 40 : 20,
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
  },
  image: {
    height: SCREEN_DIMENSIONS.height / 3,
    width: SCREEN_DIMENSIONS.width - 40,
    objectFit: 'contain',
  },
  title: {
    color: '#000',
    fontSize: SMALL_SCREEN ? 32 : 38,
    lineHeight: SMALL_SCREEN ? 32 : 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
});
