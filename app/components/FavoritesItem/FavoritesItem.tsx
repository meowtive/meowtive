import { View, Text, ViewToken, TouchableOpacity } from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

import { QuoteData } from '@config/constants';
import { stylesheet } from './styles';

type FavoritesItemProps = {
  item: QuoteData;
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
    <Animated.View
      style={listItemStyle}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}>
      <View style={styles.quote}>
        <Text style={styles.quoteText}>{t(item.text)}</Text>

        <View style={styles.wrapper}>
          <Text style={styles.quoteDate}>
            {new Date(item.savedAt).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })}
          </Text>

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
