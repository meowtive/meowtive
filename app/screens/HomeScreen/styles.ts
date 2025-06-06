import { createStyleSheet } from 'react-native-unistyles';

import { SMALL_SCREEN } from '@config/constants';
import { isAndroid } from '@config/platform';

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: isAndroid ? 40 : 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    marginTop: isAndroid ? 32 : 12,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FEB261',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FEB261',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginTop: 32,
  },
  quote: {
    color: '#000000',
    fontSize: SMALL_SCREEN ? 32 : 38,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 12,
  },
});
