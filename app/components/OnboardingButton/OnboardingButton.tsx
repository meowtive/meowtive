import { Dispatch, SetStateAction, useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { trigger } from 'react-native-haptic-feedback';

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

import { HAPTIC_FEEDBACK_OPTIONS, SCREEN_DIMENSIONS } from '@config/constants';

import { ONBOARDING_TOTAL_STEPS } from '@screens';
import { storage } from '@config/storage';
import { OnboardingContext } from '@contexts/onboardingContext';
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
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsOnboardingComplete } = useContext(OnboardingContext);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const handleSetOnboarding = async () => {
    if (loading) {
      return;
    }

    if (step < ONBOARDING_TOTAL_STEPS) {
      setLoading(true);
      setStep(prevState => prevState + 1);

      if (step === 2) {
        mask.value = 0;
      }
      mask.value = withTiming(SCREEN_DIMENSIONS.height, { duration: 1500 });
      setTimeout(() => setLoading(false), 1000);
    } else {
      storage.set('isOnboardingComplete', true);
      setIsOnboardingComplete(true);
      trigger('impactLight', HAPTIC_FEEDBACK_OPTIONS);
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
