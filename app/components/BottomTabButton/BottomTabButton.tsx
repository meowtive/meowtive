import { ReactElement, useEffect } from 'react';
import { Pressable } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

type BottomTabButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: any;
};

type RouteNames = 'Home' | 'Theme' | 'Favorite' | 'Profile';

type IconProps = {
  color: string;
};

type IconMapping = {
  [key in RouteNames]: (props: IconProps) => ReactElement;
};

export const BottomTabButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: BottomTabButtonProps) => {
  const icon: IconMapping = {
    Home: (props: any) => <Entypo name="quote" size={24} {...props} />,
    Theme: (props: any) => (
      <Ionicons name="color-palette-outline" size={24} {...props} />
    ),
    Favorite: (props: any) => (
      <Ionicons name="heart-outline" size={24} {...props} />
    ),
    Profile: (props: any) => <Ionicons name="paw" size={24} {...props} />,
  };

  const scale = useSharedValue(0);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 },
    );
  }, [scale, isFocused]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
      }}>
      <Animated.View style={animatedIconStyle}>
        {icon[routeName as RouteNames]({ color })}
      </Animated.View>

      <Animated.Text style={[animatedTextStyle, { fontSize: 12 }]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};
