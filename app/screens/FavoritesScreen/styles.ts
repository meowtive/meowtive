import { createStyleSheet } from 'react-native-unistyles';
import { SMALL_SCREEN } from '@config/constants';

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'black',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'right',
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    marginRight: 10,
  },
  quote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginTop: 10,
  },
  quoteText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'light',
    textAlign: 'center',
    opacity: 0.8,
  },
});
