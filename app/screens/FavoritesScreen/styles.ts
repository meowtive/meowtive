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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quotes: {
    overflow: 'visible',
  },
  quote: {
    alignItems: 'center',
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
