import { useRef, useEffect } from 'react';
import { View, Text, Animated, FlatList, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { stylesheet } from './styles';
import { storage } from '@config/storage';
import { FavoritesHeader } from '@components/FavoritesHeader/FavoritesHeader';

export const FavoritesScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const quotesData = storage.getString('favorites');
  const quotes = quotesData ? JSON.parse(quotesData) : [];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          data={quotes}
          keyExtractor={quote => quote}
          style={styles.quotes}
          ListHeaderComponent={FavoritesHeader}
          ListHeaderComponentStyle={styles.header}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.quote}>
              <Text style={styles.quoteText}>{t(item)}</Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
};
