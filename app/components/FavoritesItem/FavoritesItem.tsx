import { View, Text, ViewToken, TouchableOpacity } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { stylesheet } from './styles';

type FavoritesItemProps = {
  item: string;
  viewableItems: SharedValue<ViewToken[]>;
  isScrolledToBottom: boolean;
  handleRemoveQuote: () => void;
};

export const FavoritesItem = ({
  item,
  viewableItems,
  isScrolledToBottom,
  handleRemoveQuote,
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

        <View style={styles.wrapper}>
          <Text style={styles.quoteDate}>{'12/12/2024'}</Text>

          <View style={styles.icons}>
            <TouchableOpacity>
              <Ionicons name="share-outline" color="black" size={22} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemoveQuote}>
              <Ionicons name="close-circle-outline" color="#E0474C" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
