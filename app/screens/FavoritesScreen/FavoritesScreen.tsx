import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ViewToken,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useSharedValue } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { BottomSheet, FavoritesItem } from '@components';
import { storage } from '@config/storage';
import { getScrollPosition } from '@utils/scrollUtils';
import { stylesheet } from './styles';

export const FavoritesScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);
  const isBottomSheetOpen = useSharedValue(false);
  const viewableItems = useSharedValue<ViewToken[]>([]);
  let selectedQuote: string | null = null;

  const toggleSheet = () => {
    isBottomSheetOpen.value = !isBottomSheetOpen.value;
  };

  const handleRemoveQuote = () => {
    const favorites = storage.getString('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];

    const updatedFavoritesArray = favoritesArray.filter(
      (item: string) => item !== selectedQuote,
    );

    storage.set('favorites', JSON.stringify(updatedFavoritesArray));
    setQuotes(updatedFavoritesArray);

    toggleSheet();
  };

  const getFavoritesQuotes = () => {
    const quotesData = storage.getString('favorites');
    setQuotes(quotesData ? JSON.parse(quotesData) : []);
  };

  useEffect(() => {
    getFavoritesQuotes();
  }, []);

  useFocusEffect(useCallback(() => getFavoritesQuotes(), []));

  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        keyExtractor={quote => quote}
        style={styles.quotes}
        ListHeaderComponentStyle={styles.header}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: items }) => {
          viewableItems.value = items;
        }}
        onScroll={event => setIsScrolledToBottom(getScrollPosition(event))}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <FavoritesItem
            item={item}
            viewableItems={viewableItems}
            selectedQuote={selectedQuote}
            toggleSheet={toggleSheet}
            isScrolledToBottom={isScrolledToBottom}
          />
        )}
      />

      <BottomSheet isOpen={isBottomSheetOpen} toggleSheet={toggleSheet}>
        <View style={styles.bottomSheetWrapper}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.buttonText}>{t('share')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondButton}
            onPress={handleRemoveQuote}>
            <Text style={styles.buttonText}>{t('remove')}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};
