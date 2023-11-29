import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import { COLORS } from '../config';
import { scaleSize } from '../utils/DeviceUtils';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AdoptionStack from './AdoptionStackNavigator';
import AddPostScreen from '../screens/adoption/AddPostScreen';

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

const MainNavigator = () => {
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
          headerShown: true,
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
        component={AddPostScreen}
        options={{
          headerShown: true,
          headerTitle: 'Post',
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
        name='Pet Care'
        component={HomeStackNavigator}
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
        component={HomeStackNavigator}
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
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerTintColor: COLORS.blackContent,
    //       headerStyle: { backgroundColor: COLORS.background },
    //       headerShadowVisible: false,
    //       headerShown: false,
    //       gestureEnabled: true,
    //     }}
    //     initialRouteName={SCREEN.HOME}
    //   >
    //     <Stack.Screen name={SCREEN.HOME} component={HomeScreen} />
    //     <Stack.Screen
    //       name={SCREEN.SEARCH}
    //       component={SearchScreen}
    //       options={{
    //         headerShown: true,
    //         headerTitle: 'Search',
    //         headerTitleStyle: {
    //           ...FONTS.body2,
    //           fontWeight: 'bold',
    //           color: COLORS.blackTitle,
    //         },
    //       }}
    //     />
    //     <Stack.Screen
    //       name={SCREEN.PET_CARE_VIDEOS}
    //       component={PetCareVideosScreen}
    //       options={{
    //         headerShown: true,
    //         headerTitle: 'Pet care videos',
    //         headerTitleStyle: {
    //           ...FONTS.body2,
    //           fontWeight: 'bold',
    //           color: COLORS.blackTitle,
    //         },
    //       }}
    //     />
    //     <Stack.Screen
    //       name={SCREEN.NEARBY_CLINIC}
    //       component={NearbyClinicScreen}
    //       options={{
    //         headerShown: true,
    //         headerTitle: 'Nearby verterinary clinic',
    //         headerTitleStyle: {
    //           ...FONTS.body2,
    //           fontWeight: 'bold',
    //           color: COLORS.blackTitle,
    //         },
    //       }}
    //     />
    //     <Stack.Screen
    //       name={SCREEN.LOST_PETS}
    //       component={LostPetsScreen}
    //       options={{
    //         headerShown: true,
    //         headerTitle: 'Lost Pets',
    //         headerTitleStyle: {
    //           ...FONTS.body2,
    //           fontWeight: 'bold',
    //           color: COLORS.blackTitle,
    //         },
    //       }}
    //     />
    //     <Stack.Screen
    //       name={SCREEN.PET_DETAIL}
    //       component={PetDetailScreen}
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name={SCREEN.NOTIFICATION}
    //       component={NotificationScreen}
    //       options={{
    //         headerShown: true,
    //         headerTitle: 'Notification',
    //         headerTitleStyle: {
    //           ...FONTS.body2,
    //           fontWeight: 'bold',
    //           color: COLORS.blackTitle,
    //         },
    //       }}
    //     />
    //     <Stack.Screen
    //       name={SCREEN.MENU}
    //       component={MenuScreen}
    //       options={{
    //         headerShown: true,
    //         headerTitle: 'Menu',
    //         headerTitleStyle: {
    //           ...FONTS.body2,
    //           fontWeight: 'bold',
    //           color: COLORS.blackTitle,
    //         },
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default MainNavigator;
