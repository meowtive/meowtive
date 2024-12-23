import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text } from 'react-native';

import FastImage from 'react-native-fast-image';
import ViewShot, { captureRef } from 'react-native-view-shot';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './styles';

type QuoteImageProps = {
  quote: string;
};

export type QuoteImageRef = {
  getCapture: () => Promise<string | null>;
};

export const QuoteShareImage = forwardRef<QuoteImageRef, QuoteImageProps>(
  ({ quote }, ref) => {
    const viewShotRef = useRef<ViewShot>(null);
    const { styles } = useStyles(stylesheet);

    useImperativeHandle(ref, () => ({
      getCapture: async () => {
        if (viewShotRef.current) {
          try {
            const uri = await captureRef(viewShotRef, {
              format: 'jpg',
              quality: 0.8,
            });
            return uri;
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }));

    return (
      <ViewShot ref={viewShotRef} style={styles.offScreenContainer}>
        <FastImage
          source={require('../../resources/assets/images/social-share-background.png')}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.backgroundImage}>
          <Text style={styles.quoteText}>{quote}</Text>
        </FastImage>
      </ViewShot>
    );
  },
);
