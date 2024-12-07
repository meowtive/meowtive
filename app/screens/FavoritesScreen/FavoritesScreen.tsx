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
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import Animated, {
  useSharedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

import { FavoritesItem } from '@components';
import { storage } from '@config/storage';
import { QuoteData } from '@config/constants';
import { getScrollPosition } from '@utils/scrollUtils';
import { stylesheet } from './styles';

export const FavoritesScreen = () => {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const handleRemoveQuote = (quote: QuoteData) => {
    const favorites = storage.getString('favorites');
    const favoritesArray: QuoteData[] = favorites ? JSON.parse(favorites) : [];

    const updatedFavoritesArray = favoritesArray.filter(
      item => item.text !== quote.text,
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
      quote.text.toLowerCase().includes(searchText.toLowerCase()),
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
          keyExtractor={quote => quote.text}
          style={styles.quotes}
          ListEmptyComponent={
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(300)}>
              <FastImage
                source={require('../../resources/assets/images/favorites-empty-list.png')}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />

              <Text style={styles.emptyListDescription}>
                {t('favoritesEmptyListDescription')}
              </Text>
            </Animated.View>
          }
          ListHeaderComponent={
            <>
              <Text style={styles.title}>{t('favorites')}</Text>

              <TextInput
                onChangeText={setSearchText}
                placeholder={t('search')}
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
