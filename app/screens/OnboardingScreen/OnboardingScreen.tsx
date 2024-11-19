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
import { storage } from '@config/storage';
import { stylesheet } from './styles';
import {
  HAPTIC_FEEDBACK_OPTIONS,
  SCREEN_DIMENSIONS,
  ONBOARDING_BACKGROUND_COLORS,
  ONBOARDING_IMAGES,
  ONBOARDING_TITLES,
  ONBOARDING_TOTAL_STEPS,
} from '@config/constants';
import { OnboardingMask, OnboardingPagination } from '@components';

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

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: ONBOARDING_BACKGROUND_COLORS[step - 1] },
      ]}>
      <OnboardingMask mask={mask} step={step} />

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
      </View>

      <OnboardingPagination step={step} />
    </SafeAreaView>
  );
};
