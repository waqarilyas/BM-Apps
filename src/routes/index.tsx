import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {THEME} from '../shared/theme';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../shared/services/nav.service';
import AuthStack from './Auth/Auth.routes';
import BottomTabs from './Tabs/Tabs.routes';
import blockConfig from '../../block.config';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../shared/store';
import {setIsWalletRendered} from '../shared/store/reducers/walletReducer';
import {renderWallet} from '../shared/store/actions/walletActions';

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const {
    walletRendered,
    wallet,
    change24H,
    best24H,
    walletDataLoaded,
    isRendered,
  } = useSelector((state: RootState) => state.wallet);

  const [totalCoins, setTotalCoins] = useState(1000);

  useEffect(() => {
    axios
      .get(`${blockConfig.API_URL}/coin-rates/list/coins`)
      .then(response => {
        setTotalCoins(response.data.length);
      })
      .catch(err => console.log('Error getting coins list:', err));
  }, []);

  useEffect(() => {
    if (!walletRendered) {
    }
  }, []);

  const renderWalletByRedux = () => {
    if (isRendered || wallet.length !== totalCoins) {
      dispatch(renderWallet());
      dispatch(setIsWalletRendered(true));
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleAuthenticate = (e: any) => {
    setAuthenticated(e.authenticate);
  };

  DeviceEventEmitter.addListener('authenticate', handleAuthenticate);
  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: THEME.COLORS.primaryBackground}}>
        <NavigationContainer ref={navigationRef}>
          {authenticated ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: THEME.COLORS.tabColor}} />
    </>
  );
};

export default Routes;
