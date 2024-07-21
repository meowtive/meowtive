import {SafeAreaView, StatusBar, Platform} from 'react-native';
import {OnboardingScreen} from '@/screens/OnboardingScreen';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

function App(): React.JSX.Element {
  const {styles} = useStyles(stylesheet);

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
    paddingVertical: Platform.OS === 'android' ? 40 : 0,
  },
});

export default App;
