import {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {OnboardingScreen} from '@/screens/OnboardingScreen';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

function App(): React.JSX.Element {
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <OnboardingScreen />
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
  },
});

export default App;
