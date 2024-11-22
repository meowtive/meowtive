import { TouchableOpacity, Text, ViewToken } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

import { stylesheet } from './styles';

type FavoritesItemProps = {
  item: string;
  viewableItems: Animated.SharedValue<ViewToken[]>;
  selectedQuote: string | null;
  toggleSheet: () => void;
  isScrolledToBottom: boolean;
};

export const FavoritesItem = ({
  item,
  toggleSheet,
  selectedQuote,
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
      <TouchableOpacity
        style={styles.quote}
        onPress={() => {
          selectedQuote = item;
          toggleSheet();
        }}>
        <Text style={styles.quoteText}>{t(item)}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
