import {View, Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export const OnboardingScreen = () => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meowtivation</Text>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
