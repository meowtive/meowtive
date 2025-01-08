import { Alert, TouchableOpacity, ImageSourcePropType } from 'react-native';

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

  const handleSetTheme = () => {
    if (FREE_THEMES.includes(index + 1)) {
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
            onPress: () => {
              storage.set('theme', index + 1);
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
