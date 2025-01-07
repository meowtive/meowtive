import { ImageSourcePropType, StyleSheet } from 'react-native';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

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
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
      blurRadius={50}
    />
  );
};
