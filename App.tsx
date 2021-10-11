import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {Alert, Platform, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import './shim';
import Routes from './src/routes/';
import {persistor, store} from './src/shared/store/';

const App = () => {
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('black');
    StatusBar.setBarStyle('light-content');
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert(
          'Failure!',
          'No or limited internet connectivity! Please check your internet and try again',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
