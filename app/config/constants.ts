import { Dimensions } from 'react-native';

/**
 * Screen dimensions (width and height in pixels).
 */
export const SCREEN_DIMENSIONS = Dimensions.get('screen');

/**
 * Boolean indicating if the screen height is less than 700 pixels.
 */
export const SMALL_SCREEN = SCREEN_DIMENSIONS.height < 700;

/**
 * Configuration options for haptic feedback settings.
 */
export const HAPTIC_FEEDBACK_OPTIONS = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Total number of steps in the onboarding process.
 */
export const ONBOARDING_TOTAL_STEPS = 3;

/**
 * Array of translation keys for onboarding screen titles.
 */
export const ONBOARDING_TITLES = [
  'onboardingTitle1',
  'onboardingTitle2',
  'onboardingTitle3',
];

/**
 * Array of colors used for transitions between onboarding screens.
 */
export const ONBOARDING_TRANSITION_COLORS = ['#FFF2D9', '#FFF2D9', '#F7B327'];

/**
 * Array of background colors used for each onboarding screen.
 */
export const ONBOARDING_BACKGROUND_COLORS = ['#FFF2D9', '#F7B327', '#FFF2D9'];

/**
 * Array of images used on each onboarding screen.
 */
export const ONBOARDING_IMAGES = [
  { image: require('../resources/assets/images/onboarding-cat-1.png') },
  { image: require('../resources/assets/images/onboarding-cat-2.png') },
  { image: require('../resources/assets/images/onboarding-cat-3.png') },
];
