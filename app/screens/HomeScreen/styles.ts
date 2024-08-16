import { createStyleSheet } from 'react-native-unistyles';
import { SMALL_SCREEN, SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: 20,
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
  buttonsWrapper: {
    width: '100%',
    rowGap: 12,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondButton: {
    backgroundColor: '#64FCD9',
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
  image: {
    height: SCREEN_DIMENSIONS.height / 2.5,
    width: SCREEN_DIMENSIONS.width - (SMALL_SCREEN ? 20 : 40),
    objectFit: 'contain',
  },
});
