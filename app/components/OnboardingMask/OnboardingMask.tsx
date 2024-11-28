import { Canvas, Mask, Group, Circle, Rect } from '@shopify/react-native-skia';
import { useStyles } from 'react-native-unistyles';
import { SharedValue } from 'react-native-reanimated';

import {
  ONBOARDING_TRANSITION_COLORS,
  SCREEN_DIMENSIONS,
} from '@config/constants';

import { stylesheet } from './styles';

type OnboardingMask = {
  mask: SharedValue<number>;
  step: number;
};

export const OnboardingMask = ({ mask, step }: OnboardingMask) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Canvas style={styles.absoluteFillObject} pointerEvents="none">
      <Mask
        mode="luminance"
        mask={
          <Group>
            <Circle
              cx={SCREEN_DIMENSIONS.width / 2}
              cy={SCREEN_DIMENSIONS.height - 200}
              r={SCREEN_DIMENSIONS.height}
              color="white"
            />
            <Circle
              cx={SCREEN_DIMENSIONS.width / 2}
              cy={SCREEN_DIMENSIONS.height - 200}
              r={mask}
              color="black"
            />
          </Group>
        }>
        <Rect
          x={0}
          y={0}
          width={SCREEN_DIMENSIONS.width}
          height={SCREEN_DIMENSIONS.height}
          color={ONBOARDING_TRANSITION_COLORS[step - 1]}
        />
      </Mask>
    </Canvas>
  );
};
