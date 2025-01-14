/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createMotionTabs } from 'react-native-motion-tabs';
import { useTranslation } from 'react-i18next';

import {
  HomeScreen,
  FavoritesScreen,
  ProfileScreen,
  ThemeScreen,
} from '@screens';

const { t } = useTranslation();

const Tabs = createMotionTabs({
  tabs: [
    {
      name: t('homeBottomTab'),
      component: HomeScreen,
      icon: 'quote',
      iconType: 'Entypo',
    },
    {
      name: t('favoritesBottomTab'),
      component: FavoritesScreen,
      icon: 'heart-outline',
      iconType: 'Ionicons',
    },
    {
      name: t('themeBottomTab'),
      component: ThemeScreen,
      icon: 'color-palette-outline',
      iconType: 'Ionicons',
    },
    {
      name: t('profileBottomTab'),
      component: ProfileScreen,
      icon: 'paw',
      iconType: 'Ionicons',
    },
  ],
  style: {
    activeButton: '#EF7E06',
    activeText: '#FFFFFF',
    inactiveText: '#000000',
    backgroundColor: '#FFFFFF',
  },
});

export default function Routes() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
