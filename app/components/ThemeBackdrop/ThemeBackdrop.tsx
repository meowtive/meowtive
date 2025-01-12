import { ImageSourcePropType, StyleSheet } from 'react-native';

import { useStyles } from 'react-native-unistyles';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import { stylesheet } from './styles';

type ThemeBackdropProps = {
  image: ImageSourcePropType;
  index: number;
  scrollX: SharedValue<number>;
};

export const ThemeBackdrop = ({
  image,
  index,
  scrollX,
}: ThemeBackdropProps) => {
  const { styles } = useStyles(stylesheet);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
      ),
    };
  });

  return (
    <Animated.Image
      source={image}
      blurRadius={50}
      style={[
        StyleSheet.absoluteFillObject,
        animatedStyle,
        styles.themeBackdrop,
      ]}
    />
  );
};
