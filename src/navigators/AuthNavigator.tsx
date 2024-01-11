import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { SCREEN } from './AppRoute';
import { COLORS } from '../config';
import VerifyScreen from '../screens/auth/VerifyScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.blackContent,
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={SCREEN.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN.SIGN_UP}
        component={SignupScreen}
        options={{
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: ' ',
        }}
      />
      <Stack.Screen
        name={SCREEN.VERIFY}
        component={VerifyScreen}
        options={{
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: ' ',
        }}
      />
      <Stack.Screen
        name={SCREEN.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: ' ',
        }}
      />
      <Stack.Screen
        name={SCREEN.NEW_PASSWORD}
        component={NewPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: ' ',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
