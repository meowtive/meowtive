import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import * as i18n from '@resources';

const resources = {
  en: i18n.en,
  es: i18n.es,
  pt: i18n.pt,
};

i18next.use(initReactI18next).init(
  {
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
  },
  () => i18next.changeLanguage(RNLocalize.getLocales()[0].languageCode),
);

export default i18next;
