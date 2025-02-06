import { Linking } from 'react-native';

import Share, { Social } from 'react-native-share';
import Config from 'react-native-config';

import { isIOS } from '@config/platform';

const INSTAGRAM_URL = 'instagram-stories://share';
const INSTAGRAM_PACKAGE = 'com.instagram.android';

const instagramShareConfig = (quote: string, imageUri?: string) => ({
  message: String(quote),
  social: Social.InstagramStories,
  appId: String(Config.INSTAGRAM_APP_ID),
  backgroundTopColor: '#FEB261',
  backgroundBottomColor: '#FFFFFF',
  backgroundImage: imageUri,
  failOnCancel: false,
});

const fallbackShare = (quote: string) => {
  Share.open({
    message: String(quote),
    title: 'Share Quote',
    failOnCancel: false,
  });
};

const canShareToInstagram = async () => {
  if (isIOS) {
    return await Linking.canOpenURL(INSTAGRAM_URL);
  }

  const result = await Share.isPackageInstalled(INSTAGRAM_PACKAGE);
  return result.isInstalled;
};

export const handleShareQuote = async (quote: string, imageUri?: string) => {
  try {
    const isInstagramAvailable = await canShareToInstagram();

    if (isInstagramAvailable && imageUri) {
      await Share.shareSingle(instagramShareConfig(quote, imageUri));
    } else {
      fallbackShare(quote);
    }
  } catch (error) {
    console.error('Error sharing quote:', error);
    fallbackShare(quote);
  }
};
