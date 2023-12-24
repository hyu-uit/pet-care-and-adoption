import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREEN } from './AppRoute';
import { COLORS, FONTS } from '../config';
import SearchScreen from '../screens/home/SearchScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PetCareVideosScreen from '../screens/home/PetCareVideosScreen';
import NearbyClinicScreen from '../screens/home/NearbyClinicScreen';
import LostPetsScreen from '../screens/home/LostPetsScreen';
import PetDetailScreen from '../screens/home/PetDetailScreen';
import NotificationScreen from '../screens/home/NotificationScreen';
import MenuScreen from '../screens/home/MenuScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.blackContent,
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={SCREEN.HOME}
    >
      <Stack.Screen name={SCREEN.HOME} component={HomeScreen} />
      <Stack.Screen
        name={SCREEN.SEARCH}
        component={SearchScreen}
        options={{
          headerShown: true,
          headerTitle: 'Search',
          headerTitleStyle: {
            ...FONTS.body2,
            fontWeight: 'bold',
            color: COLORS.blackTitle,
          },
        }}
      />
      <Stack.Screen
        name={SCREEN.PET_CARE_VIDEOS}
        component={PetCareVideosScreen}
        options={{
          headerShown: true,
          headerTitle: 'Pet care videos',
          headerTitleStyle: {
            ...FONTS.body2,
            fontWeight: 'bold',
            color: COLORS.blackTitle,
          },
        }}
      />
      <Stack.Screen
        name={SCREEN.NEARBY_CLINIC}
        component={NearbyClinicScreen}
        options={{
          headerShown: true,
          headerTitle: 'Nearby verterinary clinic',
          headerTitleStyle: {
            ...FONTS.body2,
            fontWeight: 'bold',
            color: COLORS.blackTitle,
          },
        }}
      />

      <Stack.Screen
        name={SCREEN.NOTIFICATION}
        component={NotificationScreen}
        options={{
          headerShown: true,
          headerTitle: 'Notification',
          headerTitleStyle: {
            ...FONTS.body2,
            fontWeight: 'bold',
            color: COLORS.blackTitle,
          },
        }}
      />
      <Stack.Screen
        name={SCREEN.MENU}
        component={MenuScreen}
        options={{
          headerShown: true,
          headerTitle: 'Menu',
          headerTitleStyle: {
            ...FONTS.body2,
            fontWeight: 'bold',
            color: COLORS.blackTitle,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
