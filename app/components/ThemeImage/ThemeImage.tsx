import { View, ImageSourcePropType } from 'react-native';

import { useStyles } from 'react-native-unistyles';

import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import { stylesheet } from './styles';

type ThemeImageProps = {
  image: ImageSourcePropType;
  index: number;
  scrollX: SharedValue<number>;
};

export const ThemeImage = ({ image, index, scrollX }: ThemeImageProps) => {
  const { styles } = useStyles(stylesheet);

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
    <View style={styles.container}>
      <Animated.Image source={image} style={[styles.image, animatedStyle]} />
    </View>
  );
};
