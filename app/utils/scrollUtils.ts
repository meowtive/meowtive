import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const getScrollPosition = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => {
  const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  return layoutMeasurement.height + contentOffset.y < contentSize.height;
};
