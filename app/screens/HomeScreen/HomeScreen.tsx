import { useState, useEffect, useRef, useCallback } from 'react';

import {
  View,
  SafeAreaView,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

import { storage } from '@config/storage';
import { handleShareQuote } from '@utils/social-share';
import { stylesheet } from './styles';

export const HomeScreen = () => {
  const [isQuoteFavorited, setIsQuoteFavorited] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const quotes: String[] = t('quotes', { returnObjects: true });
  const index = setInitalQuoteIndex();

  function setInitalQuoteIndex() {
    const dailyQuoteLastIndex = storage.getNumber('dailyQuoteLastIndex');
    if (dailyQuoteLastIndex) {
      return dailyQuoteLastIndex;
    } else {
      return Math.floor(Math.random() * 300);
    }
  }

  const getDailyQuote = () => {
    const dailyQuoteLastUpdate = storage.getNumber('dailyQuoteLastUpdate');
    const today = new Date().getDate();

    if (dailyQuoteLastUpdate === today) {
      return false;
    } else {
      updateDailyQuote();
    }
  };

  const updateDailyQuote = () => {
    storage.set('dailyQuoteLastUpdate', new Date().getDate());
    storage.set('dailyQuoteLastIndex', Math.floor(Math.random() * 300));
  };

  const setFavoriteState = () => {
    const favorites = storage.getString('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];

    if (favoritesArray.includes(quotes[index])) setIsQuoteFavorited(true);
    else setIsQuoteFavorited(false);
  };

  const handleFavoriteQuote = () => {
    const favorites = storage.getString('favorites');
    let favoritesArray = favorites ? JSON.parse(favorites) : [];

    if (isQuoteFavorited) {
      setIsQuoteFavorited(false);

      const updatedFavoritesArray = favoritesArray.filter(
        (item: string) => item !== quotes[index],
      );

      storage.set('favorites', JSON.stringify(updatedFavoritesArray));
    } else {
      setIsQuoteFavorited(true);

      const quoteExists = favoritesArray.some(
        (favorite: string) => favorite === quotes[index],
      );

      if (!quoteExists) {
        favoritesArray.push(quotes[index]);
        storage.set('favorites', JSON.stringify(favoritesArray));
      }
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getDailyQuote();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setFavoriteState();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.badge}>
          <Ionicons name="color-palette-outline" color="#000000" size={26} />
        </TouchableOpacity>
      </View>

      <Animated.View style={[{ opacity: fadeAnim }, styles.card]}>
        <Text style={styles.quote}>{quotes[index]}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity>
            <Ionicons name="share-outline" color="#000000" size={26} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavoriteQuote}>
            <Ionicons
              name={isQuoteFavorited ? 'heart' : 'heart-outline'}
              color="#000000"
              size={26}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
