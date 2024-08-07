import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {storage} from '@/config/storage';
import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('screen');
const smallScreen = height < 700;

export const OnboardingScreen = () => {
  const {styles} = useStyles(stylesheet);
  const {t} = useTranslation();

  const handleSetOnboarding = () => storage.set('isOnboardingComplete', true);

  return (
    <View style={styles.container}>
      <Image
        source={require('../resources/assets/images/onboarding-cat.png')}
        style={styles.image}
      />
      <Text style={styles.title}>{t('onboardingTitle')}</Text>
      <Text style={styles.description}>{t('onboardingDescription')}</Text>
      <TouchableOpacity onPress={handleSetOnboarding} style={styles.button}>
        <Text style={styles.buttonText}>{t('onboardingButton')}</Text>
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
    lineHeight: smallScreen ? 38 : 48,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  description: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
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
    width: width - (smallScreen ? 20 : 40),
    objectFit: 'contain',
  },
});
