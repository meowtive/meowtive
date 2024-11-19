import { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { trigger } from 'react-native-haptic-feedback';

import {
  ONBOARDING_TOTAL_STEPS,
  HAPTIC_FEEDBACK_OPTIONS,
  SCREEN_DIMENSIONS,
} from '@config/constants';
import { storage } from '@config/storage';
import { stylesheet } from './styles';

type OnboardingButtonProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  mask: SharedValue<number>;
};

export const OnboardingButton = ({
  step,
  setStep,
  mask,
}: OnboardingButtonProps) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

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
  );
};
