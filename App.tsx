import {useEffect} from 'react';
import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {HomeScreen} from '@/screens/HomeScreen';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {I18nextProvider} from 'react-i18next';
import i18next from '@/config/i18n';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 500);
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="default" />
        <HomeScreen />
      </SafeAreaView>
    </I18nextProvider>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 40 : 0,
  },
});

export default App;
