import { useCallback, useRef } from 'react';
import { View, ImageSourcePropType, StyleSheet } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useFocusEffect } from '@react-navigation/native';

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

const THEMES: ThemeProps[] = [
  { id: 1, image: require('../../resources/assets/images/theme-1.png') },
  { id: 2, image: require('../../resources/assets/images/theme-2.png') },
  { id: 3, image: require('../../resources/assets/images/theme-3.png') },
  { id: 4, image: require('../../resources/assets/images/theme-4.png') },
  { id: 5, image: require('../../resources/assets/images/theme-5.png') },
  { id: 6, image: require('../../resources/assets/images/theme-6.png') },
];

const IMAGE_WIDTH = SCREEN_DIMENSIONS.width * 0.7;
const SPACING = 12;
const SNAP_INTERVAL = IMAGE_WIDTH + SPACING;

export const ThemeScreen = () => {
  const flatListRef = useRef<Animated.FlatList<ThemeProps>>(null);
  const { styles } = useStyles(stylesheet);
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / SNAP_INTERVAL;
  });

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, []),
  );

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
        ref={flatListRef}
        data={THEMES}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <View style={styles.shadowWrapper}>
            <ThemeImage image={item.image} index={index} scrollX={scrollX} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate={'fast'}
        style={styles.flatList}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60}
      />
    </View>
  );
};
