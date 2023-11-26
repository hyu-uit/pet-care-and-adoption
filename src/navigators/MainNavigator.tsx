import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREEN } from './AppRoute';
import { COLORS, FONTS } from '../config';
import SearchScreen from '../screens/home/SearchScreen';
import HomeScreen from '../screens/home/HomeScreen';
import PetCareVideosScreen from '../screens/home/PetCareVideosScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.blackContent,
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          headerShown: false,
          gestureEnabled: true,
        }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
