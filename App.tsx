import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/shared/store/';
import Routes from './src/routes/';
import {Platform, StatusBar, LogBox, Text} from 'react-native';
import './shim';
import {setWalletLoading} from './src/shared/store/reducers/walletReducer';

LogBox.ignoreAllLogs(true);
const App = () => {
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('black');
    StatusBar.setBarStyle('light-content');
    store.dispatch(setWalletLoading(false));
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
