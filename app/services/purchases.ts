import Purchases from 'react-native-purchases';
import Config from 'react-native-config';

import { isIOS, isAndroid } from '@config/platform';

export const configurePurchases = () => {
  if (isIOS) {
    Purchases.configure({ apiKey: String(Config.PURCHASES_IOS_KEY) });
  } else if (isAndroid) {
    Purchases.configure({ apiKey: String(Config.PURCHASES_ANDROID_KEY) });
  }
};
