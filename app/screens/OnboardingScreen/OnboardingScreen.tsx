import { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useSharedValue } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';

import {
  OnboardingMask,
  OnboardingPagination,
  OnboardingButton,
  OnboardingImages,
} from '@components';

import { stylesheet } from './styles';

export const ONBOARDING_TOTAL_STEPS = 3;

export const ONBOARDING_TITLES = [
  'onboardingTitle1',
  'onboardingTitle2',
  'onboardingTitle3',
];

export const ONBOARDING_TRANSITION_COLORS = ['#FFF2D9', '#FFF2D9', '#F7B327'];

export const ONBOARDING_BACKGROUND_COLORS = ['#FFF2D9', '#F7B327', '#FFF2D9'];

export const ONBOARDING_IMAGES = [
  { image: require('../../resources/assets/images/onboarding-cat-1.png') },
  { image: require('../../resources/assets/images/onboarding-cat-2.png') },
  { image: require('../../resources/assets/images/onboarding-cat-3.png') },
];

export const OnboardingScreen = () => {
  const [step, setStep] = useState<number>(1);
  const { styles } = useStyles(stylesheet);
  const mask = useSharedValue(0);
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: ONBOARDING_BACKGROUND_COLORS[step - 1] },
      ]}>
      <OnboardingMask mask={mask} step={step} />

      <FastImage
        source={require('../../resources/assets/images/logo.png')}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />

      <OnboardingImages step={step} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>{t(ONBOARDING_TITLES[step - 1])}</Text>
      </View>

      <OnboardingButton step={step} setStep={setStep} mask={mask} />
      <OnboardingPagination step={step} />
    </SafeAreaView>
  );
};
