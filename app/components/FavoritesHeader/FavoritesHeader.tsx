import { Text, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { stylesheet } from './styles';

export const FavoritesHeader = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  return (
    <>
      <Image
        source={require('../../resources/assets/images/favorites-cat.png')}
        style={styles.image}
      />

      <Text style={styles.title}>{t('favorites')}</Text>
    </>
  );
};
