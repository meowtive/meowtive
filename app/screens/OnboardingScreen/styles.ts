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
    backgroundColor: '#FFF8EB',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 36,
    color: '#000',
    lineHeight: 34,
  },
  button: {
    backgroundColor: '#EF7E06',
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
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
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
