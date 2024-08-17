import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import SoundPlayer from 'react-native-sound-player';
import { useTranslation } from 'react-i18next';
import { storage } from '@config/storage';
import { stylesheet } from './styles';

export const OnboardingScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const handlePlayMeowSound = () => {
    SoundPlayer.playAsset(require('../../resources/assets/audios/meow-2.mp3'));
  };

  const handleSetOnboarding = () => {
    storage.set('isOnboardingComplete', true);
    handlePlayMeowSound();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../resources/assets/images/onboarding-cat.png')}
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
