import { createStyleSheet } from 'react-native-unistyles';
import { SMALL_SCREEN } from '@config/constants';

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF2D9',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minWidth: '100%',
    gap: 12,
    marginBottom: 12,
  },
  title: {
    color: '#000000',
    fontSize: SMALL_SCREEN ? 32 : 38,
    lineHeight: SMALL_SCREEN ? 32 : 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  quotes: {
    overflow: 'visible',
  },
});
