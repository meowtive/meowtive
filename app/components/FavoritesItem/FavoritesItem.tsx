import { useRef } from 'react';
import {
  View,
  Text,
  ViewToken,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
} from 'react-native';
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
import { QuoteShareImage, QuoteImageRef } from '@components';
import { handleShareQuote } from '@utils/socialShare';
import { QuoteData } from '@config/constants';
import { stylesheet } from './styles';
import { FavoritesOptionsMenu } from '@components';

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
  const quoteImageRef = useRef<QuoteImageRef>(null);
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const handleShare = async () => {
    const imageUri = await quoteImageRef.current?.getCapture();
    if (imageUri) {
      handleShareQuote(item.text, imageUri);
    } else {
      handleShareQuote(item.text);
    }
  };

  const showOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [t('delete'), t('cancel')],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            handleRemoveQuote();
          }
        },
      );
    }
  };

  const listItemStyle = useAnimatedStyle(() => {
    if (!isScrolledToBottom) {
      return {};
    }
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item === item),
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
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
            <TouchableOpacity onPress={handleShare}>
              <Ionicons name="share-outline" color="#000000" size={22} />
            </TouchableOpacity>
            {Platform.OS === 'android' ? (
              <FavoritesOptionsMenu onDelete={handleRemoveQuote} />
            ) : (
              <TouchableOpacity onPress={showOptions}>
                <Ionicons name="ellipsis-vertical" color="#000000" size={22} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <QuoteShareImage ref={quoteImageRef} quote={item.text} />
    </Animated.View>
  );
};
