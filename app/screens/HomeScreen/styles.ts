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
  card: {
    backgroundColor: '#FEB26180',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 15,
    marginHorizontal: isAndroid ? 60 : 30,
  },
  quote: {
    color: '#000000',
    fontSize: SMALL_SCREEN ? 32 : 38,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
