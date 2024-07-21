import {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {OnboardingScreen} from '@/screens/OnboardingScreen';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <OnboardingScreen />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
  },
});

export default App;
