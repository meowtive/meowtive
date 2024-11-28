import { View } from 'react-native';

import { useStyles } from 'react-native-unistyles';

import { ONBOARDING_TOTAL_STEPS } from '@screens';
import { stylesheet } from './styles';

import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type OnboardingPaginationProps = {
  step: number;
};

export const OnboardingPagination = ({ step }: OnboardingPaginationProps) => {
  const { styles } = useStyles(stylesheet);

  const createPaginationStyle = (index: number) => {
    return useAnimatedStyle(() => {
      return {
        width: step === index ? withSpring(28) : withSpring(8),
      };
    });
  };

  return (
    <View style={styles.paginationView}>
      {Array.from({ length: ONBOARDING_TOTAL_STEPS }).map((_, index) => (
        <Animated.View
          key={index}
          style={[styles.pagination, createPaginationStyle(index + 1)]}
        />
      ))}
    </View>
  );
};
