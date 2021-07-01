import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers, compose} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import posReducer from './reducers/posReducer';
import walletReducer from './reducers/walletReducer';
import userReducer from './reducers/userReducer';
import settingsReducer from './reducers/settingsReducer';
import ReduxThunk from 'redux-thunk';

declare var window: any;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'wallet'],
};

const reducers = combineReducers({
  pos: posReducer,
  wallet: walletReducer,
  user: userReducer,
  settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware: any = getDefaultMiddleware({serializableCheck: false}).concat(
  ReduxThunk,
);

let enhancedCompose = compose;

if (__DEV__) {
  enhancedCompose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancedCompose(middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
