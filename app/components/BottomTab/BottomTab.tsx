import { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { BottomTabButton } from '@components';
import { isAndroid } from '@config/platform';
import { stylesheet } from './styles';

type DimensionsProps = {
  height: number;
  width: number;
};

export const BottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [dimensions, setDimensions] = useState<DimensionsProps>({
    height: 20,
    width: 100,
  });

  const { styles } = useStyles(stylesheet);

  const buttonWidth = dimensions.width / state.routes.length;
  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPositionX.value,
        },
      ],
    };
  });

  const onBottomTabLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  return (
    <View onLayout={onBottomTabLayout} style={styles.container}>
      <Animated.View
        style={[
          animatedStyle,
          styles.bottomTabBackground,
          {
            height: dimensions.height - (isAndroid ? 20 : 10),
            width: buttonWidth - 25,
          },
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <BottomTabButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#FFFFFF' : 'black'}
            label={label}
          />
        );
      })}
    </View>
  );
};
