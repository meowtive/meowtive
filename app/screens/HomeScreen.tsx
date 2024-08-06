import {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const {width, height} = Dimensions.get('screen');
const smallScreen = height < 700;

export const HomeScreen = () => {
  const {styles} = useStyles(stylesheet);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../resources/assets/images/home-screen-cat.png')}
        style={styles.image}
      />

      <View style={styles.textWrapper}>
        <Text style={styles.title}>Meowtivation:</Text>

        <Animated.View style={{opacity: fadeAnim}}>
          <Text style={styles.description}>Start strong, finish inspired.</Text>
        </Animated.View>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondButton}>
          <Text style={styles.secondButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
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
  textWrapper: {
    rowGap: 6,
  },
  title: {
    color: 'black',
    fontSize: smallScreen ? 38 : 48,
    lineHeight: smallScreen ? 38 : 48,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  description: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
    alignSelf: 'center',
  },
  buttonsWrapper: {
    width: '100%',
    rowGap: 12,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondButton: {
    backgroundColor: '#64FCD9',
    borderRadius: 100,
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    height: height / 2.5,
    width: width - (smallScreen ? 20 : 40),
    objectFit: 'contain',
  },
});
