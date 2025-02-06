import { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { I18nextProvider, useTranslation } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';

import i18next from '@config/i18n';
import { storage } from '@config/storage';
import { OnboardingContext } from '@contexts/onboardingContext';
import Routes from '@routes/Routes';
import { OnboardingScreen } from '@screens';
import { ErrorBoundary } from '@components';
import { configurePurchases } from '@services';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(() => {
    return storage.getBoolean('isOnboardingComplete') ?? false;
  });

  const { t: translateText } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 500);

    configurePurchases();
  }, []);

  return (
    <ErrorBoundary t={translateText}>
      {' '}
      {/* Alteração aqui */}
      <PaperProvider>
        <OnboardingContext.Provider
          value={{ isOnboardingComplete, setIsOnboardingComplete }}>
          <I18nextProvider i18n={i18next}>
            <StatusBar barStyle="default" />
            {isOnboardingComplete ? <Routes /> : <OnboardingScreen />}
          </I18nextProvider>
        </OnboardingContext.Provider>
      </PaperProvider>
    </ErrorBoundary>
  );
};

export default App;
