import { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  ViewToken,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useSharedValue } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { FavoritesItem } from '@components';
import { storage } from '@config/storage';
import { getScrollPosition } from '@utils/scrollUtils';
import { stylesheet } from './styles';

export const FavoritesScreen = () => {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const handleRemoveQuote = (quote: string) => {
    const favorites = storage.getString('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];

    const updatedFavoritesArray = favoritesArray.filter(
      (item: string) => item !== quote,
    );

    storage.set('favorites', JSON.stringify(updatedFavoritesArray));
    setQuotes(updatedFavoritesArray);
    setFilteredQuotes(updatedFavoritesArray);
  };

  const getFavoritesQuotes = () => {
    const quotesData = storage.getString('favorites');
    setQuotes(quotesData ? JSON.parse(quotesData) : []);
    setFilteredQuotes(quotesData ? JSON.parse(quotesData) : []);
  };

  useEffect(() => {
    if (!searchText) {
      getFavoritesQuotes();
      return;
    }

    const newQuotesData = quotes.filter(quote =>
      quote.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredQuotes(newQuotesData);
  }, [searchText]);

  useEffect(() => {
    getFavoritesQuotes();
  }, []);

  useFocusEffect(useCallback(() => getFavoritesQuotes(), []));

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <FlatList
          data={filteredQuotes}
          keyExtractor={quote => quote}
          style={styles.quotes}
          ListEmptyComponent={() => <></>}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>{t('favorites')}</Text>

              <TextInput
                onChangeText={setSearchText}
                placeholder="Search"
                value={searchText}
                style={styles.input}
              />
            </>
          }
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
              isScrolledToBottom={isScrolledToBottom}
              handleRemoveQuote={() => handleRemoveQuote(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
