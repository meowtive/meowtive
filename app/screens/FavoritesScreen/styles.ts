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
    width: '100%',
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
  bottomSheetWrapper: {
    width: '100%',
    gap: 10,
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
    backgroundColor: '#f87171',
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
