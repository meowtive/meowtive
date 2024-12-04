import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
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
