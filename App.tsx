import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/shared/store/';
import Routes from './src/routes/';
import {Platform, StatusBar, LogBox, Text, Alert} from 'react-native';
import './shim';
import {setWalletLoading} from './src/shared/store/reducers/walletReducer';
import {CheckConnectivity} from './src/shared/services/helper.service';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabs from './src/routes/Tabs/Tabs.routes';

const App = () => {
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setBackgroundColor('black');
    StatusBar.setBarStyle('light-content');
    store.dispatch(setWalletLoading(false));
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
    // <BottomTabs />
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
