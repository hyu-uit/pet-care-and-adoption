import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SCREEN } from './AppRoute';
import { COLORS, FONTS } from '../config';
import SearchScreen from '../screens/home/SearchScreen';
import LocationScreen from '../screens/adoption/LocationScreen';

const Stack = createNativeStackNavigator();

const AdoptionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.blackContent,
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={SCREEN.SEARCH}
    >
      <Stack.Screen name={SCREEN.SEARCH} component={SearchScreen} />
      <Stack.Screen name={SCREEN.LOCATION} component={LocationScreen} />
    </Stack.Navigator>
  );
};

export default AdoptionStack;
