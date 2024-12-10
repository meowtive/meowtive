/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { HomeScreen, FavoritesScreen } from '@screens';
import { BottomTab } from '@components';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={props => <BottomTab {...props} />}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Theme"
          component={FavoritesScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="favorite" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoritesScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="favorite" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={FavoritesScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="favorite" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
