import { useRef, useEffect } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { stylesheet } from './styles';

export const FavoritesScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Favorites')}</Text>
      </View>

      <Animated.View style={[styles.quote, { opacity: fadeAnim }]}>
        <Image
          source={require('../../resources/assets/images/favorites-cat.png')}
          style={styles.image}
        />
        <Text style={styles.quoteText}>
          "Even the longest and laziest naps end with a stretch and a renewed
          sense of adventure; make sure to rejuvenate and keep exploring."
        </Text>
      </Animated.View>
    </View>
  );
};
