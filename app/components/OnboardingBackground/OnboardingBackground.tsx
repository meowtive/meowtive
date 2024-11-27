import { useStyles } from 'react-native-unistyles';
import FastImage from 'react-native-fast-image';

import { ONBOARDING_BACKGROUND_IMAGES } from '@config/constants';
import { stylesheet } from './styles';

type OnboardingBackgroundProps = {
  step: number;
};

export const OnboardingBackground = ({ step }: OnboardingBackgroundProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <FastImage
      source={ONBOARDING_BACKGROUND_IMAGES[step - 1].image}
      style={styles.image}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
