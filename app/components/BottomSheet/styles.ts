import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';
import { SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  sheet: {
    paddingVertical: 22,
    paddingHorizontal: 16,
    width: SCREEN_DIMENSIONS.width,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  flex: {
    flex: 1,
  },
});
