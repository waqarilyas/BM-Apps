import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME} from '../../shared/theme';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../assets';
import {RF} from '../../shared/theme/responsive';
import WalletStack from './Wallet/Wallet.routes';
import SettingsStack from './Settings/Settings.routes';
import POSStack from './POS/POS.routes';
import {useSelector} from 'react-redux';
import {RootState} from '../../shared/store';
import L from '../../shared/utils/LanguageHandler';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {language} = useSelector((state: RootState) => state.settings);

  useEffect(() => {}, [language]);
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: THEME.COLORS.primaryBackground}}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        tabStyle: {
          backgroundColor: THEME.COLORS.tabColor,
          paddingVertical: 6,
        },
        style: {elevation: 0, borderTopWidth: 0, height: RF(55)},
        keyboardHidesTabBar: true,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let imageName;
          if (route.name === L('Wallet')) {
            imageName = ICONS.WALLET;
          } else if (route.name === L('POS')) {
            imageName = ICONS.POS;
          } else if (route.name === L('Settings')) {
            imageName = ICONS.SETTINGS;
          }
          return (
            <FastImage
              source={imageName}
              style={{height: RF(20), width: RF(20)}}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={color}
            />
          );
        },
      })}>
      <Tab.Screen name={L('Wallet')} component={WalletStack} />
      <Tab.Screen name={L('POS')} component={POSStack} />
      <Tab.Screen name={L('Settings')} component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
