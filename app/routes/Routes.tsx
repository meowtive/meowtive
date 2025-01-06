/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createMotionTabs } from 'react-native-motion-tabs';

import {
  HomeScreen,
  FavoritesScreen,
  ProfileScreen,
  ThemeScreen,
} from '@screens';

const Tabs = createMotionTabs({
  tabs: [
    {
      name: 'Home',
      component: HomeScreen,
      icon: 'quote',
      iconType: 'Entypo',
    },
    {
      name: 'Theme',
      component: ThemeScreen,
      icon: 'color-palette-outline',
      iconType: 'Ionicons',
    },
    {
      name: 'Favorite',
      component: FavoritesScreen,
      icon: 'heart-outline',
      iconType: 'Ionicons',
    },
    {
      name: 'Profile',
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
