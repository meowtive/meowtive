/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createMotionTabs } from 'react-native-motion-tabs';
import i18next from '@config/i18n';

import {
  HomeScreen,
  FavoritesScreen,
  ProfileScreen,
  ThemeScreen,
} from '@screens';

const Tabs = createMotionTabs({
  tabs: [
    {
      name: i18next.t('homeBottomTab'),
      component: HomeScreen,
      icon: 'quote',
      iconType: 'Entypo',
    },
    {
      name: i18next.t('favoritesBottomTab'),
      component: FavoritesScreen,
      icon: 'heart-outline',
      iconType: 'Ionicons',
    },
    {
      name: i18next.t('themeBottomTab'),
      component: ThemeScreen,
      icon: 'color-palette-outline',
      iconType: 'Ionicons',
    },
    {
      name: i18next.t('profileBottomTab'),
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
