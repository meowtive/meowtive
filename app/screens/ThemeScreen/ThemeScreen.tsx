import { View, ImageSourcePropType, StyleSheet } from 'react-native';

import { useStyles } from 'react-native-unistyles';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { ThemeImage, ThemeBackdrop } from '@components';
import { SCREEN_DIMENSIONS } from '@config/constants';
import { stylesheet } from './styles';

type ThemeProps = {
  id: number;
  image: ImageSourcePropType;
};

/**
 * Array of the theme items.
 */
const THEMES: ThemeProps[] = [
  { id: 1, image: require('../../resources/assets/images/theme-1.png') },
  { id: 2, image: require('../../resources/assets/images/theme-2.png') },
  { id: 3, image: require('../../resources/assets/images/theme-3.png') },
  { id: 4, image: require('../../resources/assets/images/theme-4.png') },
  { id: 5, image: require('../../resources/assets/images/theme-5.png') },
  { id: 6, image: require('../../resources/assets/images/theme-6.png') },
];

/**
 * Constants to use on some FlatList params.
 */
const IMAGE_WIDTH = SCREEN_DIMENSIONS.width * 0.7;
const SPACING = 12;

export const ThemeScreen = () => {
  const { styles } = useStyles(stylesheet);

  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / (IMAGE_WIDTH + SPACING);
  });

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {THEMES.map((item, index) => (
          <ThemeBackdrop
            image={item.image}
            index={index}
            scrollX={scrollX}
            key={index}
          />
        ))}
      </View>

      <Animated.FlatList
        data={THEMES}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <ThemeImage image={item.image} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        snapToInterval={IMAGE_WIDTH + SPACING}
        decelerationRate={'fast'}
        style={styles.flatList}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />
    </View>
  );
};
