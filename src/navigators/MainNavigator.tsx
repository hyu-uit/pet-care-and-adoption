import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN } from './AppRoute';
import BottomTabs from './BottomTabs';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AuthNavigator from './AuthNavigator';
import ChatHistoryScreen from '../screens/chats/ChatHistoryScreen';
import ChatDetailScreen from '../screens/chats/ChatDetailScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.shared.isLogined);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoggedIn && (
        <Stack.Screen name={SCREEN.AUTH_STACK} component={AuthNavigator} />
      )}
      <Stack.Screen name={SCREEN.BOTTOM_TABS} component={BottomTabs} />
      {/* <Stack.Screen name={SCREEN.CHAT_HISTORY} component={ChatHistoryScreen} />
      <Stack.Screen name={SCREEN.CHAT_DETAIL} component={ChatDetailScreen} /> */}
    </Stack.Navigator>
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
