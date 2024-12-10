import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import Share, { Social } from 'react-native-share';

import { storage } from '@config/storage';
import { stylesheet } from './styles';

export const HomeScreen = () => {
  const { styles } = useStyles(stylesheet);
  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const handleSaveQuote = (quote: string) => {
    const favorites = storage.getString('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];

    const quoteExists = favoritesArray.some(
      (favorite: string) => favorite === quote,
    );

    if (!quoteExists) {
      favoritesArray.push(quote);
      storage.set('favorites', JSON.stringify(favoritesArray));
    }
  };

  const updateDailyQuote = () => {
    storage.set('dailyQuoteLastUpdate', new Date().getDate());
    storage.set('dailyQuoteLastIndex', Math.floor(Math.random() * 300));
  };

  const handleShareQuote = async () => {
    try {
      await Share.shareSingle({
        message: String(quotes[index]),
        title: 'Share Quote',
        social: Social.InstagramStories,
        appId: 'meowtive',
        backgroundTopColor: '#FEB261',
        backgroundBottomColor: '#FFFFFF',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    getDailyQuote();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.quote}>{quotes[index]}</Text>
        </Animated.View>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => handleSaveQuote(String(quotes[index]))}>
          <Text style={styles.buttonText}>{t('save')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondButton}
          onPress={handleShareQuote}>
          <Text style={styles.buttonText}>{t('share')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
