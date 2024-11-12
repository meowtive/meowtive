import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { I18nextProvider } from 'react-i18next';
import RNBootSplash from 'react-native-bootsplash';
import i18next from '@config/i18n';
import { isAndroid } from '@config/platform';
import { storage } from '@config/storage';
import Routes from '@routes/Routes';
import { OnboardingScreen } from '@screens';

const App = () => {
  const isOnboardingComplete = storage.getBoolean('isOnboardingComplete');
  const { styles } = useStyles(stylesheet);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 500);
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        {isOnboardingComplete ? <Routes /> : <OnboardingScreen />}
      </SafeAreaView>
    </I18nextProvider>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    paddingVertical: isAndroid ? 20 : 0,
    backgroundColor: '#FFF8EB',
  },
});

export default App;
