import { createStyleSheet } from 'react-native-unistyles';

import { SMALL_SCREEN } from '@config/constants';
import { isAndroid } from '@config/platform';

export const stylesheet = createStyleSheet({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF2D9',
  },
  container: {
    flex: 1,
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: isAndroid ? 40 : 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  title: {
    color: '#000000',
    fontSize: SMALL_SCREEN ? 32 : 38,
    lineHeight: SMALL_SCREEN ? 32 : 38,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FEB26180',
    borderRadius: 30,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  optionValue: {
    fontSize: 14,
    color: '#666666',
  },
  badge: {
    backgroundColor: '#FFFFFF80',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#000000',
  },
});
