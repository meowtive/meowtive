import { createStyleSheet } from 'react-native-unistyles';

import { SMALL_SCREEN, SCREEN_DIMENSIONS } from '@config/constants';
import { isAndroid } from '@config/platform';

export const stylesheet = createStyleSheet({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF2D9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: SMALL_SCREEN ? 20 : 40,
    paddingVertical: isAndroid ? 40 : 20,
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
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  input: {
    flex: 1,
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
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  quotes: {
    overflow: 'visible',
  },
  image: {
    width: '100%',
    height: SCREEN_DIMENSIONS.height / 2.5,
    marginTop: 12,
  },
  emptyListDescription: {
    color: '#000000',
    fontSize: SMALL_SCREEN ? 18 : 24,
    lineHeight: SMALL_SCREEN ? 18 : 24,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.5,
  },
  modalCloseButton: {
    padding: 4,
  },
  filterOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedFilter: {
    backgroundColor: '#FFF2D9',
    borderColor: '#FFD700',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
});
