import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView, StatusBar} from 'react-native';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
    </SafeAreaView>
  );
}

export default App;
