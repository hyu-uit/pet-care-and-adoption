import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../config';
import { scaleSize } from '../utils/DeviceUtils';
import HomeStackNavigator from './HomeStackNavigator';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import AdoptionStack from './AdoptionStackNavigator';
import PostStackNavigator from './PostStackNavigator';
import PetCareHandBookScreen from '../screens/pet-care/PetCareHandBookScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SCREEN } from './AppRoute';

const Tab = createBottomTabNavigator();

const CustomPostButton = ({ props }) => (
  <TouchableOpacity
    style={{
      top: -scaleSize(45 / 2),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      width: scaleSize(45),
      borderRadius: 45 / 2,
    }}
    onPress={props.onPress}
  >
    {props.children}
  </TouchableOpacity>
);

const BottomTabs = () => {
  const navigation = useNavigation();

  // const navigateToHomeWithReset = () => {
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: SCREEN.HOME }],
  //     })
  //   );
  //   navigation.navigate('Home');
  // };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLORS.purpleF1EFFF,
          borderTopRightRadius: scaleSize(22.52),
          borderTopLeftRadius: scaleSize(22.52),
          height: scaleSize(75),
        },
        headerTintColor: COLORS.blackContent,
        headerStyle: { backgroundColor: COLORS.background },
        headerShadowVisible: false,
        headerShown: false,
        tabBarLabelStyle: {
          color: COLORS.primary,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name='home'
              size={scaleSize(24)}
              color={focused ? COLORS.primary : COLORS.grayA8A8B7}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Adoption'
        component={AdoptionStack}
        options={{
          headerShown: false,
          headerTitle: 'Pet Adoption',
          headerTintColor: COLORS.blackContent,
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name='shopping-bag'
              size={scaleSize(24)}
              color={focused ? COLORS.primary : COLORS.grayA8A8B7}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Post'
        component={PostStackNavigator}
        options={{
          headerShown: false,
          headerTintColor: COLORS.blackContent,
          headerStyle: { backgroundColor: COLORS.background },
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name='plus'
              size={scaleSize(24)}
              color={COLORS.whitePrimary}
            />
          ),
          tabBarButton: (props) => <CustomPostButton props={props} />,
          tabBarShowLabel: false,
          tabBarLabelStyle: { height: 0 },
        }}
      />
      <Tab.Screen
        name={'Pet care'}
        component={PetCareHandBookScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name='heart'
              size={scaleSize(24)}
              color={focused ? COLORS.primary : COLORS.grayA8A8B7}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name='user'
              size={scaleSize(24)}
              color={focused ? COLORS.primary : COLORS.grayA8A8B7}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
