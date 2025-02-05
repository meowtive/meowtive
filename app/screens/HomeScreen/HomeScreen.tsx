import { useState, useEffect, useRef, useCallback, Fragment } from 'react';

import {
  View,
  SafeAreaView,
  Text,
  Animated,
  TouchableOpacity,
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
  const quotes = t('quotes', { returnObjects: true }) as string[];

  const updateDailyQuote = useCallback(() => {
    const newIndex = Math.floor(Math.random() * 300);
    storage.set('dailyQuoteLastUpdate', new Date().getDate());
    storage.set('dailyQuoteLastIndex', newIndex);
    return newIndex;
  }, []);

  const setInitialQuoteIndex = useCallback(() => {
    const dailyQuoteLastIndex = storage.getNumber('dailyQuoteLastIndex');
    const dailyQuoteLastUpdate = storage.getNumber('dailyQuoteLastUpdate');
    const today = new Date().getDate();

    if (dailyQuoteLastUpdate === today) {
      return dailyQuoteLastIndex || updateDailyQuote();
    } else {
      return updateDailyQuote();
    }
  }, [updateDailyQuote]);

  const index = setInitialQuoteIndex();
  const quote = quotes[index];

  const handleGetTheme = () => setTheme(storage.getNumber('theme') || 1);

  const handleShare = async () => {
    const imageUri = await quoteImageRef.current?.getCapture();

    if (imageUri) {
      handleShareQuote(quote, imageUri);
    } else {
      handleShareQuote(quote);
    }
  };

  const getDailyQuote = () => {
    const dailyQuoteLastUpdate = storage.getNumber('dailyQuoteLastUpdate');
    const today = new Date().getDate();

    if (dailyQuoteLastUpdate === today) {
      return false;
    } else {
      updateDailyQuote();
    }
  };

  const setFavoriteState = () => {
    const favorites = storage.getString('favorites') ?? '[]';
    const favoritesArray: QuoteData[] = JSON.parse(favorites);

    setIsQuoteFavorited(favoritesArray.some(fav => fav.text === quote));
  };

  const handleFavoriteQuote = () => {
    try {
      const favorites = storage.getString('favorites') ?? '[]';
      let favoritesArray: QuoteData[] = JSON.parse(favorites);

      const isFavorited = favoritesArray.some(fav => fav.text === quote);

      favoritesArray = isFavorited
        ? favoritesArray.filter(item => item.text !== quote)
        : [
            ...favoritesArray,
            { text: quote, savedAt: new Date().toISOString() },
          ];

      storage.set('favorites', JSON.stringify(favoritesArray));
      setIsQuoteFavorited(!isFavorited);
    } catch (error) {
      console.error('Error handling favorites:', error);
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
      handleGetTheme();
    }, []),
  );

  return (
    <Fragment>
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
          <Text style={styles.quote}>{quote}</Text>

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

        <QuoteShareImage ref={quoteImageRef} quote={quote} />
      </SafeAreaView>
    </Fragment>
  );
};
