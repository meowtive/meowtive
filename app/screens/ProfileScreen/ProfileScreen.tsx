import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';

import { useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { storage } from '@config/storage';
import { stylesheet } from './styles';
import { isAndroid } from '@config/platform';

export const ProfileScreen = () => {
  const { styles } = useStyles(stylesheet);
  const { t, i18n } = useTranslation();

  const openSystemLanguageSettings = async () => {
    try {
      if (isAndroid) {
        await Linking.openURL('android-settings://');
      } else {
        await Linking.openURL('App-prefs:root=General&path=INTERNATIONAL');
      }
    } catch {
      await Linking.openSettings();
    }
  };

  const handleClearData = () => {
    Alert.alert(t('clearData'), t('clearDataConfirm'), [
      {
        text: t('cancel'),
        style: 'cancel',
      },
      {
        text: t('confirm'),
        style: 'destructive',
        onPress: () => {
          storage.clearAll();
          Alert.alert(t('success'), t('dataCleared'));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>{t('settings')}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('appearance')}</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.option}
                onPress={openSystemLanguageSettings}>
                <View style={styles.optionContent}>
                  <Ionicons name="language" size={26} color="#000000" />
                  <Text style={styles.optionText}>{t('language')}</Text>
                </View>
                <Text style={styles.optionValue}>
                  {i18n.language === 'en' ? 'English' : 'Português'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.option, styles.lastOption]}>
                <View style={styles.optionContent}>
                  <Ionicons
                    name="color-palette-outline"
                    size={26}
                    color="#000000"
                  />
                  <Text style={styles.optionText}>{t('theme')}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t('soon')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('data')}</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={[styles.option, styles.lastOption]}
                onPress={handleClearData}>
                <View style={styles.optionContent}>
                  <Ionicons name="trash-outline" size={26} color="#000000" />
                  <Text style={styles.optionText}>{t('clearData')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('about')}</Text>
            <View style={styles.card}>
              <View style={styles.option}>
                <View style={styles.optionContent}>
                  <Ionicons
                    name="information-circle-outline"
                    size={26}
                    color="#000000"
                  />
                  <Text style={styles.optionText}>{t('version')}</Text>
                </View>
                <Text style={styles.optionValue}>1.0.0</Text>
              </View>

              <TouchableOpacity style={styles.option}>
                <View style={styles.optionContent}>
                  <Ionicons name="star-outline" size={26} color="#000000" />
                  <Text style={styles.optionText}>{t('rateApp')}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{t('soon')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
