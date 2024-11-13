import { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Skottie } from 'react-native-skottie';
import { storage } from '@config/storage';
import { stylesheet } from './styles';
import OnboardingCat1 from '@resources/assets/jsons/onboarding-cat-1.json';

const TOTAL_STEPS = 3;

export const OnboardingScreen = () => {
  const [step, setStep] = useState<number>(1);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const handleSetOnboarding = () => {
    if (step < TOTAL_STEPS) setStep(prevState => prevState + 1);
    else storage.set('isOnboardingComplete', true);
  };

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
        <Skottie
          style={styles.animation}
          source={OnboardingCat1}
          resizeMode="cover"
          autoPlay={true}
        />

        <Text style={styles.title}>{t('onboardingTitle')}</Text>
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
