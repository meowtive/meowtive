import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView, StatusBar} from 'react-native';
import {OnboardingScreen} from '@/screens/OnboardingScreen';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <OnboardingScreen />
    </SafeAreaView>
  );
}

export default App;
