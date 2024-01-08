import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    // host: '10.1.1.12',
    name: 'PET - Mobile',
  })
  .useReactNative()
  .use(reactotronRedux())
  .connect();
