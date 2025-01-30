import { useState, useEffect, useRef, useCallback } from 'react';

import {
  View,
  SafeAreaView,
  Text,
  Animated,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import { QuoteShareImage, QuoteImageRef } from '@components';
import { storage } from '@config/storage';
import { QuoteData, SCREEN_DIMENSIONS } from '@config/constants';
import { handleShareQuote } from '@utils/socialShare';
import { stylesheet } from './styles';

/**
 * Array of theme images.
 */
const THEME_IMAGES = {
  1: require('../../resources/assets/images/theme-1.png'),
  2: require('../../resources/assets/images/theme-2.png'),
  3: require('../../resources/assets/images/theme-3.png'),
  4: require('../../resources/assets/images/theme-4.png'),
  5: require('../../resources/assets/images/theme-5.png'),
  6: require('../../resources/assets/images/theme-6.png'),
};

export const HomeScreen = () => {
  const [isQuoteFavorited, setIsQuoteFavorited] = useState<boolean>(false);
  const [theme, setTheme] = useState(storage.getNumber('theme') || 1);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const quoteImageRef = useRef<QuoteImageRef>(null);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const quotes: string[] = t('quotes', { returnObjects: true });

  const [quoteIndex] = useState(() => {
    const lastUpdate = storage.getNumber('dailyQuoteLastUpdate');
    const today = new Date().getDate();

    if (lastUpdate === today) {
      return storage.getNumber('dailyQuoteLastIndex') || 0;
    }

    const newIndex = Math.floor(Math.random() * quotes.length);
    storage.set('dailyQuoteLastIndex', newIndex);
    storage.set('dailyQuoteLastUpdate', today);
    return newIndex;
  });

  const handleGetTheme = () => setTheme(storage.getNumber('theme') || 1);

  const handleShare = async () => {
    const imageUri = await quoteImageRef.current?.getCapture();

    if (imageUri) handleShareQuote(quotes[quoteIndex], imageUri);
    else handleShareQuote(quotes[quoteIndex]);
  };

  const setFavoriteState = () => {
    const favorites = storage.getString('favorites');
    const favoritesArray: QuoteData[] = favorites ? JSON.parse(favorites) : [];

    const isQuoteFavorited = favoritesArray.some(
      favorite => favorite.text === quotes[quoteIndex],
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
        item => item.text !== quotes[quoteIndex],
      );

      storage.set('favorites', JSON.stringify(updatedFavoritesArray));
    } else {
      setIsQuoteFavorited(true);

      const quoteExists = favoritesArray.some(
        favorite => favorite.text === quotes[quoteIndex],
      );

      if (!quoteExists) {
        const newQuote: QuoteData = {
          text: quotes[quoteIndex],
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

  useEffect(() => {
    const lastUpdate = storage.getNumber('dailyQuoteLastUpdate');
    const today = new Date().getDate();

    if (lastUpdate !== today) {
      const newIndex = Math.floor(Math.random() * quotes.length);
      storage.set('dailyQuoteLastIndex', newIndex);
      storage.set('dailyQuoteLastUpdate', today);
    }
  }, [quotes.length]);

  useFocusEffect(
    useCallback(() => {
      setFavoriteState();
      handleGetTheme();
    }, []),
  );

  return (
    <>
      <View style={StyleSheet.absoluteFillObject}>
        <FastImage
          source={THEME_IMAGES[theme as keyof typeof THEME_IMAGES]}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: SCREEN_DIMENSIONS.width,
            height: SCREEN_DIMENSIONS.height,
          }}
        />
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.badge}>
            <Ionicons name="color-palette-outline" color="#000000" size={26} />
          </TouchableOpacity>
        </View>

        <Animated.View style={[{ opacity: fadeAnim }, styles.card]}>
          <Text style={styles.quote}>{quotes[quoteIndex]}</Text>

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

        <QuoteShareImage ref={quoteImageRef} quote={quotes[quoteIndex]} />
      </SafeAreaView>
    </>
  );
};
