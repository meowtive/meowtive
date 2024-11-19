import { useState } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useSharedValue } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import {
  OnboardingMask,
  OnboardingPagination,
  OnboardingButton,
} from '@components';
import {
  ONBOARDING_BACKGROUND_COLORS,
  ONBOARDING_IMAGES,
  ONBOARDING_TITLES,
} from '@config/constants';
import { stylesheet } from './styles';

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

      <Image
        source={require('../../resources/assets/images/logo.png')}
        style={styles.logo}
      />

      <Image source={ONBOARDING_IMAGES[step - 1].image} style={styles.image} />

      <View style={styles.wrapper}>
        <Text style={styles.title}>{t(ONBOARDING_TITLES[step - 1])}</Text>
      </View>

      <OnboardingButton step={step} setStep={setStep} mask={mask} />
      
      <OnboardingPagination step={step} />
    </SafeAreaView>
  );
};
