import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {THEME} from '../shared/theme';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../shared/services/nav.service';
import AuthStack from './Auth/Auth.routes';
import BottomTabs from './Tabs/Tabs.routes';

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);
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
