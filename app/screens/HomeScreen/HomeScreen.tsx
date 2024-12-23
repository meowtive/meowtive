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

import { QuoteShareImage, QuoteImageRef } from '@components';
import { storage } from '@config/storage';
import { QuoteData } from '@config/constants';
import { handleShareQuote } from '@utils/socialShare';
import { stylesheet } from './styles';

export const HomeScreen = () => {
  const [isQuoteFavorited, setIsQuoteFavorited] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const quoteImageRef = useRef<QuoteImageRef>(null);
  const index = setInitalQuoteIndex();
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const quotes: string[] = t('quotes', { returnObjects: true });

  const handleShare = async () => {
    const imageUri = await quoteImageRef.current?.getCapture();

    if (imageUri) handleShareQuote(quotes[index], imageUri);
    else handleShareQuote(quotes[index]);
  };

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
    const favoritesArray: QuoteData[] = favorites ? JSON.parse(favorites) : [];

    const isQuoteFavorited = favoritesArray.some(
      favorite => favorite.text === quotes[index],
    );

    if (isQuoteFavorited) setIsQuoteFavorited(true);
    else setIsQuoteFavorited(false);
  };

  const handleFavoriteQuote = () => {
    const favorites = storage.getString('favorites');
    let favoritesArray: QuoteData[] = favorites ? JSON.parse(favorites) : [];

    if (isQuoteFavorited) {
      setIsQuoteFavorited(false);

      const updatedFavoritesArray = favoritesArray.filter(
        item => item.text !== quotes[index],
      );

      storage.set('favorites', JSON.stringify(updatedFavoritesArray));
    } else {
      setIsQuoteFavorited(true);

      const quoteExists = favoritesArray.some(
        favorite => favorite.text === quotes[index],
      );

      if (!quoteExists) {
        const newQuote: QuoteData = {
          text: quotes[index],
          savedAt: new Date().toISOString(),
        };

        favoritesArray.push(newQuote);
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
          <TouchableOpacity onPress={handleShare}>
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

      <QuoteShareImage ref={quoteImageRef} quote={quotes[index]} />
    </SafeAreaView>
  );
};
