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
  title: {
    color: 'black',
    fontSize: SMALL_SCREEN ? 38 : 48,
    lineHeight: SMALL_SCREEN ? 38 : 48,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  description: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
  },
  button: {
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
  image: {
    height: SCREEN_DIMENSIONS.height / 2,
    width: SCREEN_DIMENSIONS.width - (SMALL_SCREEN ? 20 : 40),
    objectFit: 'contain',
  },
});
