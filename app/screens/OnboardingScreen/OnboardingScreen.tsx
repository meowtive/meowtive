import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { trigger } from 'react-native-haptic-feedback';
import { Canvas, Mask, Group, Circle, Rect } from '@shopify/react-native-skia';
import { storage } from '@config/storage';
import { stylesheet } from './styles';
import { HAPTIC_FEEDBACK_OPTIONS, SCREEN_DIMENSIONS } from '@config/constants';

const TOTAL_STEPS = 3;
const TITLES = ['onboardingTitle1', 'onboardingTitle2', 'onboardingTitle3'];
const TRANSITION_COLORS = ['#FFF2D9', '#FFF2D9', '#F7B327'];
const BACKGROUND_COLORS: ViewStyle[] = [
  stylesheet.backgroundLight,
  stylesheet.backgroundStrong,
  stylesheet.backgroundLight,
];
const IMAGES = [
  { image: require('../../resources/assets/images/onboarding-cat-1.png') },
  { image: require('../../resources/assets/images/onboarding-cat-2.png') },
  { image: require('../../resources/assets/images/onboarding-cat-3.png') },
];

export const OnboardingScreen = () => {
  const [step, setStep] = useState<number>(1);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const mask = useSharedValue(0);

  const handleSetOnboarding = async () => {
    trigger('impactLight', HAPTIC_FEEDBACK_OPTIONS);

    if (step < TOTAL_STEPS) {
      setStep(prevState => prevState + 1);

      if (step === 2) mask.value = 0;
      mask.value = withTiming(SCREEN_DIMENSIONS.height, { duration: 500 });
    } else {
      storage.set('isOnboardingComplete', true);
    }
  };

  const getTitle = () => TITLES[step - 1];
  const getImages = () => IMAGES[step - 1];
  const getBackgroundColor = () => BACKGROUND_COLORS[step - 1];
  const getTransitionColor = () => TRANSITION_COLORS[step - 1];

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width: step === TOTAL_STEPS ? withSpring(278) : withSpring(128),
      height: step === TOTAL_STEPS ? withSpring(64) : withSpring(128),
    };
  });

  const createPaginationStyle = (index: number) => {
    return useAnimatedStyle(() => {
      return {
        width: step === index ? withSpring(28) : withSpring(8),
      };
    });
  };

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor()]}>
      <Canvas style={styles.absoluteFillObject} pointerEvents="none">
        <Mask
          mode="luminance"
          mask={
            <Group>
              <Circle
                cx={SCREEN_DIMENSIONS.width / 2}
                cy={SCREEN_DIMENSIONS.height - 200}
                r={SCREEN_DIMENSIONS.height}
                color="white"
              />
              <Circle
                cx={SCREEN_DIMENSIONS.width / 2}
                cy={SCREEN_DIMENSIONS.height - 200}
                r={mask}
                color="black"
              />
            </Group>
          }>
          <Rect
            x={0}
            y={0}
            width={SCREEN_DIMENSIONS.width}
            height={SCREEN_DIMENSIONS.height}
            color={getTransitionColor()}
          />
        </Mask>
      </Canvas>

      <Image
        source={require('../../resources/assets/images/logo.png')}
        style={styles.logo}
      />

      <Image source={getImages().image} style={styles.image} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>{t(getTitle())}</Text>
      </View>

      <View style={styles.wrapper}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleSetOnboarding}>
          <Animated.View style={[styles.button, buttonAnimationStyle]}>
            {step < TOTAL_STEPS ? (
              <AntDesign name="arrowright" size={42} color="white" />
            ) : (
              <Text style={styles.buttonText}>{t('onboardingButton')}</Text>
            )}
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.paginationView}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.pagination, createPaginationStyle(index + 1)]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
