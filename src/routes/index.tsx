import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {THEME} from '../shared/theme';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../shared/services/nav.service';
import AuthStack from './Auth/Auth.routes';
import BottomTabs from './Tabs/Tabs.routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../shared/store';
import axios from 'axios';
import blockConfig from '../../block.config';
import {renderWallet} from '../shared/store/actions/walletActions';
import {AppShowToast} from '../shared/services/helper.service';

const Routes = () => {
  const {isRendered, wallet} = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [totalCoins, setTotalCoins] = useState(0);

  useEffect(() => {
    axios
      .get(`${blockConfig.API_URL}/coin-rates/list/coins`)
      .then(response => {
        setTotalCoins(response.data.length);
      })
      .catch(err => console.log('Error getting coins list:', err));
  }, []);

  useEffect(() => {
    if (isRendered) {
      console.log('DIPATCHED');
      dispatch(renderWallet());
    }
  }, [isRendered]);

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: THEME.COLORS.primaryBackground}}>
        <NavigationContainer ref={navigationRef}>
          {isRendered ? <BottomTabs /> : <AuthStack />}
        </NavigationContainer>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: THEME.COLORS.tabColor}} />
    </>
  );
};

export default Routes;
