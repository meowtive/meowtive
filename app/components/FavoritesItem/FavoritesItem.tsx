import { View, Text, ViewToken } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { stylesheet } from './styles';

type FavoritesItemProps = {
  item: string;
  viewableItems: SharedValue<ViewToken[]>;
  isScrolledToBottom: boolean;
};

export const FavoritesItem = ({
  item,
  viewableItems,
  isScrolledToBottom,
}: FavoritesItemProps) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const listItemStyle = useAnimatedStyle(() => {
    if (!isScrolledToBottom) return {};

    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item === item),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  });

  return (
    <Animated.View style={listItemStyle}>
      <View style={styles.quote}>
        <Text style={styles.quoteText}>{t(item)}</Text>
      </View>
    </Animated.View>
  );
};
