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
