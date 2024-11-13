import { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { trigger } from 'react-native-haptic-feedback';
import { storage } from '@config/storage';
import { stylesheet } from './styles';
import { HAPTIC_FEEDBACK_OPTIONS } from '@config/constants';

const TOTAL_STEPS = 3;
const ONBOARDING_IMAGES = [
  { image: require('../../resources/assets/images/onboarding-cat-1.png') },
  { image: require('../../resources/assets/images/onboarding-cat-2.png') },
  { image: require('../../resources/assets/images/onboarding-cat-3.png') },
];
const ONBOARDING_TITLES = [
  'onboardingTitle1',
  'onboardingTitle2',
  'onboardingTitle3',
];

export const OnboardingScreen = () => {
  const [step, setStep] = useState<number>(1);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const handleSetOnboarding = () => {
    trigger('impactLight', HAPTIC_FEEDBACK_OPTIONS);

    if (step < TOTAL_STEPS) setStep(prevState => prevState + 1);
    else storage.set('isOnboardingComplete', true);
  };

  const getOnboardingTitle = () => ONBOARDING_TITLES[step - 1];
  const getOnboardingImages = () => ONBOARDING_IMAGES[step - 1];

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
    <View style={styles.container}>
      <Image
        source={require('../../resources/assets/images/logo.png')}
        style={styles.logo}
      />

      <View style={styles.wrapper}>
        <Image source={getOnboardingImages().image} style={styles.image} />

        <Text style={styles.title}>{t(getOnboardingTitle())}</Text>
      </View>

      <View style={styles.wrapper}>
        <Pressable onPress={handleSetOnboarding}>
          <Animated.View style={[styles.button, buttonAnimationStyle]}>
            {step < TOTAL_STEPS ? (
              <AntDesign name="arrowright" size={42} color="white" />
            ) : (
              <Text style={styles.buttonText}>{t('onboardingButton')}</Text>
            )}
          </Animated.View>
        </Pressable>

        <View style={styles.paginationView}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.pagination, createPaginationStyle(index + 1)]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
