import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  quote: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    marginTop: 10,
  },
  quoteText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'light',
    textAlign: 'left',
    opacity: 0.8,
  },
  quoteDate: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'light',
    textAlign: 'left',
    opacity: 0.8,
    marginTop: 8,
  },
});
