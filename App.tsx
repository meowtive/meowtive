import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {OnboardingScreen} from '@/screens/OnboardingScreen';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {I18nextProvider} from 'react-i18next';
import i18next from '@/config/i18n';

function App(): React.JSX.Element {
  const {styles} = useStyles(stylesheet);

  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        <OnboardingScreen />
      </SafeAreaView>
    </I18nextProvider>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 40 : 0,
  },
});

export default App;
