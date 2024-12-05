import { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { BottomTabButton } from '@components';
import { isAndroid } from '@config/platform';

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
    <View
      onLayout={onBottomTabLayout}
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 5,
      }}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: '#EF7E06',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - (isAndroid ? 20 : 10),
            width: buttonWidth - 25,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 10,
            shadowOpacity: 0.15,
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
