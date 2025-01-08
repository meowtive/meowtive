import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_DIMENSIONS } from '@config/constants';

import { isAndroid } from '@config/platform';

const IMAGE_WIDTH = SCREEN_DIMENSIONS.width * 0.7;

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: '#FFF2D9',
    paddingVertical: isAndroid ? 40 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 0,
  },
  contentContainer: {
    gap: 12,
    paddingHorizontal: (SCREEN_DIMENSIONS.width - IMAGE_WIDTH) / 2,
    paddingVertical: 32,
  },
  shadowWrapper: {
    backgroundColor: '#FFF2D9',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 30,
  },
});
