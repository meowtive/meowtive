import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import {en} from '@/resources/strings/en';
import {es} from '@/resources/strings/es';
import {pt} from '@/resources/strings/pt';

const resources = {en, es, pt};

i18next.use(initReactI18next).init(
  {
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
  },
  () => i18next.changeLanguage(RNLocalize.getLocales()[0].languageCode),
);

export default i18next;
