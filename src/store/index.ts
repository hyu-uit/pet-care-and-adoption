import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './auth/auth.api';
import Reactotron from '../ReactotronConfig';
import sharedReducer from './shared/shared.slice';

const rootReducer = combineReducers({
  shared: sharedReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['shared'],
};
const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }).concat(authApi.middleware),
  enhancers: [Reactotron.createEnhancer!()],
  devTools: true,
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
