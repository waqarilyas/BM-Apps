import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../shared/services/nav.service';
import {RootState} from '../shared/store';
import {renderWallet} from '../shared/store/actions/walletActions';
import {THEME} from '../shared/theme';
import AuthStack from './Auth/Auth.routes';
import BottomTabs from './Tabs/Tabs.routes';

const Routes = () => {
  const {isRendered} = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (isRendered) {
      dispatch(renderWallet());
    }
  }, [isRendered, dispatch]);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isRendered
            ? THEME.COLORS.secondaryBackground
            : THEME.COLORS.primaryBackground,
        }}>
        <NavigationContainer ref={navigationRef}>
          {isRendered ? <BottomTabs /> : <AuthStack />}
          <Toast ref={ref => Toast.setRef(ref)} position="bottom" />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default Routes;
