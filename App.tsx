import { StatusBar } from 'react-native';
import MainNavigator from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  // return <AuthNavigator />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' />
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}
