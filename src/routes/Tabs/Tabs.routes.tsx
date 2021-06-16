import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME} from '../../shared/theme';
import FastImage from 'react-native-fast-image';
import {ICONS} from '../../assets';
import {RF} from '../../shared/theme/responsive';
import WalletStack from './Wallet/Wallet.routes';
import SettingsStack from './Settings/Settings.routes';
import POSStack from './POS/POS.routes';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: THEME.COLORS.primaryBackground}}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        tabStyle: {
          backgroundColor: THEME.COLORS.tabColor,
          paddingVertical: 5,
        },
        style: {elevation: 0, borderTopWidth: 0},
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let imageName;
          if (route.name === 'Wallet') {
            imageName = ICONS.WALLET;
          } else if (route.name === 'POS') {
            imageName = ICONS.POS;
          } else if (route.name === 'Settings') {
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
      <Tab.Screen name="Wallet" component={WalletStack} />
      <Tab.Screen name="POS" component={POSStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
