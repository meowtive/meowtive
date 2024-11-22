import { useEffect, useState } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { useStyles } from 'react-native-unistyles';

import { ONBOARDING_IMAGES } from '@config/constants';
import { stylesheet } from './styles';

type OnboardingImagesProps = {
  step: number;
};

export const OnboardingImages = ({ step }: OnboardingImagesProps) => {
  const { styles } = useStyles(stylesheet);
  const [currentStep, setCurrentStep] = useState(step);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (step === 1) return;

    opacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(setCurrentStep)(step);
      opacity.value = withTiming(1, { duration: 500 });
    });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.image, animatedStyle]}>
      <FastImage
        source={ONBOARDING_IMAGES[currentStep - 1].image}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
    </Animated.View>
  );
};
