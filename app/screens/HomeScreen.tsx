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
import {useTranslation} from 'react-i18next';
import {storage} from '@/config/storage';

const {width, height} = Dimensions.get('screen');
const smallScreen = height < 700;

export const HomeScreen = () => {
  const {styles} = useStyles(stylesheet);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {t} = useTranslation();
  const quotes: String[] = t('quotes', {returnObjects: true});
  const index = setInitalQuoteIndex();

  function setInitalQuoteIndex() {
    const dailyQuoteLastIndex = storage.getNumber('dailyQuoteLastIndex');
    if (dailyQuoteLastIndex) return dailyQuoteLastIndex;
    else return Math.floor(Math.random() * 300);
  }

  const getDailyQuote = () => {
    const dailyQuoteLastUpdate = storage.getNumber('dailyQuoteLastUpdate');
    const today = new Date().getDate();

    if (dailyQuoteLastUpdate === today) return false;
    else updateDailyQuote();
  };

  const updateDailyQuote = () => {
    storage.set('dailyQuoteLastUpdate', new Date().getDate());
    storage.set('dailyQuoteLastIndex', Math.floor(Math.random() * 300));
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    getDailyQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../resources/assets/images/home-screen-cat.png')}
        style={styles.image}
      />

      <View style={styles.textWrapper}>
        <Animated.View style={{opacity: fadeAnim}}>
          <Text style={styles.quote}>{quotes[index]}</Text>
        </Animated.View>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{t('save')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondButton}>
          <Text style={styles.secondButtonText}>{t('share')}</Text>
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
  quote: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'normal',
    textAlign: 'center',
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
