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
import {View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {language} = useSelector((state: RootState) => state.settings);

  // const insets = useSafeAreaInsets();
  useEffect(() => {}, [language]);
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: THEME.COLORS.primaryBackground,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}>
        <Tab.Navigator
          sceneContainerStyle={{backgroundColor: THEME.COLORS.tabColor}}
          tabBarOptions={{
            activeTintColor: '#00A8FF',

            inactiveTintColor: 'white',

            tabStyle: {
              backgroundColor: THEME.COLORS.tabColor,
              paddingVertical: 6,
            },
            style: {height: RF(55)},
            // keyboardHidesTabBar: true,
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
                <>
                  {focused ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopWidth: 4,

                        borderTopColor: '#00A8FF',
                        marginTop: RF(5),
                        height: RF(50),
                        width: RF(50),
                      }}>
                      <FastImage
                        source={imageName}
                        style={{
                          height: RF(20),
                          width: RF(20),
                          marginBottom: THEME.MARGIN.VERYLOW,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        tintColor={color}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: RF(5),
                        height: RF(50),
                        width: RF(50),
                      }}>
                      <FastImage
                        source={imageName}
                        style={{
                          height: RF(20),
                          width: RF(20),
                          marginBottom: THEME.MARGIN.SUPERLOW,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                        tintColor={color}
                      />
                    </View>
                  )}
                </>
              );
            },
          })}>
          <Tab.Screen name={L('Wallet')} component={WalletStack} />
          <Tab.Screen name={L('POS')} component={POSStack} />
          <Tab.Screen name={L('Settings')} component={SettingsStack} />
        </Tab.Navigator>
        <SafeAreaView
          style={{
            backgroundColor: THEME.COLORS.tabColor,
          }}
        />
      </View>
    </>
  );
};

export default BottomTabs;
