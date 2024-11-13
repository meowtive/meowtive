import { createStyleSheet } from 'react-native-unistyles';
import { SMALL_SCREEN, SCREEN_DIMENSIONS } from '@config/constants';

export const stylesheet = createStyleSheet({
  logo: {
    width: 200,
    height: 45,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF2D9',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: 20,
  },
  image: {
    height: SCREEN_DIMENSIONS.height / 2,
    width: SCREEN_DIMENSIONS.width - (SMALL_SCREEN ? 20 : 40),
    objectFit: 'contain',
  },
  title: {
    color: '#000',
    fontSize: SMALL_SCREEN ? 32 : 38,
    lineHeight: SMALL_SCREEN ? 32 : 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 42,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#EF7E06',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paginationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 26,
    height: 24,
  },
  pagination: {
    height: 6,
    backgroundColor: '#EF7E06',
    borderRadius: 3,
  },
});
