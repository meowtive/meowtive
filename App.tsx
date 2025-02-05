import { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { I18nextProvider } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';

import i18next from '@config/i18n';
import { storage } from '@config/storage';
import { OnboardingContext } from '@config/contexts';
import Routes from '@routes/Routes';
import { OnboardingScreen } from '@screens';
import { configurePurchases } from '@services';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => {
    return storage.getBoolean('isOnboardingComplete') ?? false;
  });

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 500);

    configurePurchases();
  }, []);

  return (
    <PaperProvider>
      <OnboardingContext.Provider
        value={{ isOnboardingComplete, setIsOnboardingComplete }}>
        <I18nextProvider i18n={i18next}>
          <StatusBar barStyle="default" />
          {isOnboardingComplete ? <Routes /> : <OnboardingScreen />}
        </I18nextProvider>
      </OnboardingContext.Provider>
    </PaperProvider>
  );
};

export default App;
