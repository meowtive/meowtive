import FastImage from 'react-native-fast-image';
import { useStyles } from 'react-native-unistyles';

import { ONBOARDING_IMAGES } from '@config/constants';
import { stylesheet } from './styles';

type OnboardingImagesProps = {
  step: number;
};

export const OnboardingImages = ({ step }: OnboardingImagesProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <FastImage
      source={ONBOARDING_IMAGES[step - 1].image}
      style={styles.image}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};
