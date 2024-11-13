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
  backgroundLight: {
    backgroundColor: '#FFF2D9',
  },
  backgroundStrong: {
    backgroundColor: '#F7B327',
  },
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    textAlign: 'left',
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
    paddingHorizontal: 16,
  },
  paginationView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 16,
  },
  pagination: {
    height: 6,
    backgroundColor: '#EF7E06',
    borderRadius: 3,
  },
});
