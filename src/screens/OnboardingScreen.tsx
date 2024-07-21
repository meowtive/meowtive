import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const {height} = Dimensions.get('screen');
const smallScreen = height < 700;

export const OnboardingScreen = () => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/onboarding-cat.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Feel inspired, and keep meowtivated.</Text>
      <Text style={styles.description}>🐈 We're glad you're here</Text>
      <TouchableOpacity activeOpacity={0.7} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: smallScreen ? 20 : 40,
    paddingVertical: 20,
  },
  title: {
    color: 'black',
    fontSize: smallScreen ? 38 : 48,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  description: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'semibold',
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    height: height / 2,
    objectFit: 'contain',
  },
});
