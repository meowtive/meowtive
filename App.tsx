import { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';

import i18next from '@config/i18n';
import { storage } from '@config/storage';
import Routes from '@routes/Routes';
import { OnboardingScreen } from '@screens';

const App = () => {
  const isOnboardingComplete = storage.getBoolean('isOnboardingComplete');

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 500);
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <StatusBar barStyle="default" />
      {isOnboardingComplete ? <Routes /> : <OnboardingScreen />}
    </I18nextProvider>
  );
};

export default App;
