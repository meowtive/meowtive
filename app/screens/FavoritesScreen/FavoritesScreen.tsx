import { useEffect, useState, useCallback } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  ViewToken,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

type FilterOption = 'recent' | 'alphabetical';

interface ExtendedQuoteData extends QuoteData {
  timestamp: number;
}

export const FavoritesScreen = () => {
  const [quotes, setQuotes] = useState<ExtendedQuoteData[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<ExtendedQuoteData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isScrolledToBottom, setIsScrolledToBottom] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('recent');
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const handleRemoveQuote = (quote: ExtendedQuoteData) => {
    const favorites = storage.getString('favorites');
    const favoritesArray: ExtendedQuoteData[] = favorites
      ? JSON.parse(favorites)
      : [];

    const updatedFavoritesArray = favoritesArray.filter(
      item => item.text !== quote.text,
    );

    storage.set('favorites', JSON.stringify(updatedFavoritesArray));
    setQuotes(updatedFavoritesArray);
    setFilteredQuotes(updatedFavoritesArray);
  };

  const getFavoritesQuotes = useCallback(() => {
    const quotesData = storage.getString('favorites');
    const quotesArray: ExtendedQuoteData[] = quotesData
      ? JSON.parse(quotesData)
      : [];
    setQuotes(quotesArray);
    applyFilter(quotesArray, selectedFilter);
  }, [selectedFilter]);

  const applyFilter = (
    quotesArray: ExtendedQuoteData[],
    filter: FilterOption,
  ) => {
    let filteredArray = [...quotesArray];

    if (filter === 'recent') {
      filteredArray.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filter === 'alphabetical') {
      filteredArray.sort((a, b) => a.text.localeCompare(b.text));
    }

    setFilteredQuotes(filteredArray);
  };

  const handleFilterChange = (filter: FilterOption) => {
    setSelectedFilter(filter);
    applyFilter(quotes, filter);
    setShowFilterModal(false);
  };

  useEffect(() => {
    if (!searchText) {
      applyFilter(quotes, selectedFilter);
      return;
    }

    const newQuotesData = quotes.filter(quote =>
      quote.text.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredQuotes(newQuotesData);
  }, [searchText, quotes, selectedFilter]);

  useEffect(() => {
    getFavoritesQuotes();
  }, [getFavoritesQuotes]);

  useFocusEffect(
    useCallback(() => {
      getFavoritesQuotes();
    }, [getFavoritesQuotes]),
  );

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
            <View style={styles.header}>
              <Text style={styles.title}>{t('favorites')}</Text>

              <View style={styles.searchContainer}>
                <TextInput
                  onChangeText={setSearchText}
                  placeholder={t('search')}
                  placeholderTextColor={'rgba(0,0,0,0.5)'}
                  value={searchText}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => setShowFilterModal(true)}>
                  <Icon name="tune" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
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

        <Modal
          visible={showFilterModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowFilterModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{t('filter')}</Text>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setShowFilterModal(false)}>
                  <Icon name="close" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedFilter === 'recent' && styles.selectedFilter,
                ]}
                onPress={() => handleFilterChange('recent')}>
                <Icon
                  name="access-time"
                  size={24}
                  color="#000000"
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.filterOptionText}>{t('recent')}</Text>
                {selectedFilter === 'recent' && (
                  <Icon name="check" size={24} color="#FFD700" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedFilter === 'alphabetical' && styles.selectedFilter,
                ]}
                onPress={() => handleFilterChange('alphabetical')}>
                <Icon
                  name="sort-by-alpha"
                  size={24}
                  color="#000000"
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.filterOptionText}>{t('alphabetical')}</Text>
                {selectedFilter === 'alphabetical' && (
                  <Icon name="check" size={24} color="#FFD700" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
