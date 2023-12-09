import { StatusBar, Text } from 'react-native';
import MainNavigator from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { LogBox } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'CercoDEMO-Regular': require('./src/assets/fonts/CercoDEMO-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  // return <AuthNavigator />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' />
        {/* <AuthNavigator /> */}
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
