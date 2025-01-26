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

  /**
   * Theme index
   */
  const THEME_INDEX = index + 1;

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
      if (
        error instanceof Error &&
        error.message.includes('Purchase was cancelled')
      )
        return false;

      console.error('Purchase failed: ', error);

      Alert.alert(t('purchaseFailedTitle'), t('purchaseFailedMessage'), [
        { text: t('ok') },
      ]);

      return false;
    }
  };

  const handleSetTheme = async () => {
    if (FREE_THEMES.includes(THEME_INDEX) || isThemePurchased(THEME_INDEX)) {
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
              storage.set('theme', THEME_INDEX);
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      await handlePurchaseTheme(THEME_INDEX);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, THEME_INDEX],
            [1.6, 1, 1.6],
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, THEME_INDEX],
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
