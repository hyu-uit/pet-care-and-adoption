import { StatusBar } from 'react-native';
import MainNavigator from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { LogBox } from 'react-native';

export default function App() {
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
