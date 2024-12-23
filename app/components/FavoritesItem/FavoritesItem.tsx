import { useRef, MutableRefObject } from 'react';

import {
  View,
  Text,
  ViewToken,
  TouchableOpacity,
  Platform,
  UIManager,
  findNodeHandle,
  ActionSheetIOS,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

import { handleShareQuote } from '@utils/socialShare';
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
  const optionsRef = useRef(null);
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

  const showOptions = (ref: MutableRefObject<null>) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [t('delete'), t('cancel')],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        buttonIndex => {
          if (buttonIndex === 0) handleRemoveQuote();
        },
      );
    } else if (UIManager.showPopupMenu) {
      const handle = findNodeHandle(ref.current);
      if (!handle) return;

      UIManager.setLayoutAnimationEnabledExperimental?.(true);

      UIManager?.showPopupMenu(
        handle,
        [t('delete')],
        () => {},
        (_, buttonIndex) => {
          if (buttonIndex === 0) handleRemoveQuote();
        },
      );
    }
  };

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
            <TouchableOpacity onPress={() => handleShareQuote(item.text)}>
              <Ionicons name="share-outline" color="#000000" size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              ref={optionsRef}
              onPress={() => showOptions(optionsRef)}>
              <MaterialCommunityIcons
                name="dots-vertical"
                color="#000000"
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
