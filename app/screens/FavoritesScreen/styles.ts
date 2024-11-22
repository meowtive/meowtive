import { createStyleSheet } from 'react-native-unistyles';
import { SMALL_SCREEN } from '@config/constants';

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF2D9',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  quotes: {
    overflow: 'visible',
  },
  bottomSheetWrapper: {
    width: '100%',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#FEB261',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
