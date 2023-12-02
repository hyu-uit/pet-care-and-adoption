import { StatusBar } from 'react-native';
import MainNavigator from './src/navigators/MainNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  // return <AuthNavigator />;
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' />
      <MainNavigator />
    </NavigationContainer>
  );
}
