import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
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
import {
  HAPTIC_FEEDBACK_OPTIONS,
  SCREEN_DIMENSIONS,
  ONBOARDING_BACKGROUND_COLORS,
  ONBOARDING_IMAGES,
  ONBOARDING_TITLES,
  ONBOARDING_TOTAL_STEPS,
  ONBOARDING_TRANSITION_COLORS,
} from '@config/constants';

export const OnboardingScreen = () => {
  const [step, setStep] = useState<number>(1);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const mask = useSharedValue(0);

  const handleSetOnboarding = async () => {
    trigger('impactLight', HAPTIC_FEEDBACK_OPTIONS);

    if (step < ONBOARDING_TOTAL_STEPS) {
      setStep(prevState => prevState + 1);

      if (step === 2) mask.value = 0;
      mask.value = withTiming(SCREEN_DIMENSIONS.height, { duration: 1000 });
    } else {
      storage.set('isOnboardingComplete', true);
    }
  };

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        step === ONBOARDING_TOTAL_STEPS ? withSpring(278) : withSpring(128),
      height:
        step === ONBOARDING_TOTAL_STEPS ? withSpring(64) : withSpring(128),
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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: ONBOARDING_BACKGROUND_COLORS[step - 1] },
      ]}>
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
            color={ONBOARDING_TRANSITION_COLORS[step - 1]}
          />
        </Mask>
      </Canvas>

      <Image
        source={require('../../resources/assets/images/logo.png')}
        style={styles.logo}
      />

      <Image source={ONBOARDING_IMAGES[step - 1].image} style={styles.image} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>{t(ONBOARDING_TITLES[step - 1])}</Text>
      </View>

      <View style={styles.wrapper}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleSetOnboarding}>
          <Animated.View style={[styles.button, buttonAnimationStyle]}>
            {step < ONBOARDING_TOTAL_STEPS ? (
              <AntDesign name="arrowright" size={42} color="white" />
            ) : (
              <Text style={styles.buttonText}>{t('onboardingButton')}</Text>
            )}
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.paginationView}>
          {Array.from({ length: ONBOARDING_TOTAL_STEPS }).map((_, index) => (
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
