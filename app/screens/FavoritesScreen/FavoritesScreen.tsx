import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FavoritesHeader, BottomSheet } from '@components';
import { storage } from '@config/storage';
import { stylesheet } from './styles';

export const FavoritesScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const fadeAnim = useSharedValue(0);
  const [quotes, setQuotes] = useState<string[]>([]);
  const isOpen = useSharedValue(false);
  let selectedQuote: string | null = null;

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
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

    fadeAnim.value = withTiming(1, { duration: 1000 });
  }, [fadeAnim]);

  useFocusEffect(useCallback(() => getFavoritesQuotes(), []));

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          data={quotes}
          keyExtractor={quote => quote}
          style={styles.quotes}
          ListHeaderComponent={FavoritesHeader}
          ListHeaderComponentStyle={styles.header}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quote}
              onPress={() => {
                selectedQuote = item;
                toggleSheet();
              }}>
              <Text style={styles.quoteText}>{t(item)}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
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
