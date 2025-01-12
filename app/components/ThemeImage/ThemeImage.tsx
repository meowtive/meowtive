import { Alert, TouchableOpacity, ImageSourcePropType } from 'react-native';

import Purchases from 'react-native-purchases';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import { storage } from '@config/storage';
import { stylesheet } from './styles';

type ThemeImageProps = {
  image: ImageSourcePropType;
  index: number;
  scrollX: SharedValue<number>;
};

/**
 * Array of free themes
 */
const FREE_THEMES = [1];

export const ThemeImage = ({ image, index, scrollX }: ThemeImageProps) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const isThemePurchased = (themeId: number): boolean => {
    const purchasedThemes = storage.getString('purchased_themes');
    const themesArray: string[] = purchasedThemes
      ? JSON.parse(purchasedThemes)
      : [];

    return themesArray.includes(themeId.toString());
  };

  const savePurchasedTheme = (themeId: string) => {
    const purchasedThemes = storage.getString('purchased_themes');
    const themesArray: string[] = purchasedThemes
      ? JSON.parse(purchasedThemes)
      : [];

    if (!themesArray.includes(themeId)) {
      themesArray.push(themeId);
      storage.set('purchased_themes', JSON.stringify(themesArray));
    }
  };

  const handlePurchaseTheme = async (themeId: number) => {
    try {
      const offerings = await Purchases.getOfferings();

      const packageToPurchase = offerings?.current?.availablePackages.find(
        pkg => pkg.product.identifier === `theme_${themeId}`,
      );

      if (packageToPurchase) {
        await Purchases.purchasePackage(packageToPurchase);

        savePurchasedTheme(themeId.toString());

        return true;
      }
    } catch (error) {
      console.error('Purchase failed: ', error);

      Alert.alert(t('purchaseFailedTitle'), t('purchaseFailedMessage'), [
        { text: t('ok') },
      ]);

      return false;
    }
  };

  const handleSetTheme = () => {
    if (FREE_THEMES.includes(index + 1) || isThemePurchased(index + 1)) {
      Alert.alert(
        t('applyThemeTitle'),
        t('applyThemeMessage'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('confirm'),
            onPress: () => {
              storage.set('theme', index + 1);
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        t('buyThemeTitle'),
        t('buyThemeMessage'),
        [
          {
            text: t('cancel'),
            style: 'cancel',
          },
          {
            text: t('confirm'),
            onPress: async () => {
              await handlePurchaseTheme(index + 1);
            },
          },
        ],
        { cancelable: false },
      );
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6],
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15],
          )}deg`,
        },
      ],
    };
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleSetTheme}>
      <Animated.Image source={image} style={[styles.image, animatedStyle]} />
    </TouchableOpacity>
  );
};
