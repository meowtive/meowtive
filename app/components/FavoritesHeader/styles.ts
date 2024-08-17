import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  title: {
    color: 'black',
    fontSize: 48,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'cover',
  },
});
