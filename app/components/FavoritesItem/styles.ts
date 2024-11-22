import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  quote: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    marginTop: 10,
  },
  quoteText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'light',
    textAlign: 'center',
    opacity: 0.8,
  },
});
