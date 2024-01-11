import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN } from './AppRoute';
import { COLORS, FONTS } from '../config';
import LocationScreen from '../screens/adoption/LocationScreen';
import AddPostScreen from '../screens/adoption/AddPostScreen';

const Stack = createNativeStackNavigator();

const PostStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: COLORS.blackContent,
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
      initialRouteName={SCREEN.ADD_POST}
    >
      <Stack.Screen
        name={SCREEN.ADD_POST}
        component={AddPostScreen}
        options={{ headerTitle: 'Add post' }}
      />
      <Stack.Screen
        name={SCREEN.LOCATION}
        component={LocationScreen}
        options={{ headerTitle: 'Location' }}
      />
    </Stack.Navigator>
  );
};

export default PostStackNavigator;
