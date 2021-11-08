import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {ICONS} from '../../assets';
import {RootState} from '../../shared/store';
import {THEME} from '../../shared/theme';
import {RF} from '../../shared/theme/responsive';
import L from '../../shared/utils/LanguageHandler';
import POSStack from './POS/POS.routes';
import SettingsStack from './Settings/Settings.routes';
import WalletStack from './Wallet/Wallet.routes';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {language} = useSelector((state: RootState) => state.settings);

  // const insets = useSafeAreaInsets();
  useEffect(() => {}, [language]);
  return (
    <>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: THEME.COLORS.tabColor,
        }}
        tabBarOptions={{
          activeTintColor: '#00A8FF',

          inactiveTintColor: '#707070',

          tabStyle: {
            backgroundColor: THEME.COLORS.tabColor,

            paddingVertical: 3,
          },
          style: {height: RF(55), borderTopWidth: 0},

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
              <>
                {focused ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: THEME.MARGIN.LOW,
                      height: RF(50),
                      width: RF(50),
                    }}>
                    <FastImage
                      source={imageName}
                      style={{
                        height: RF(30),
                        width: RF(30),
                        marginBottom: THEME.MARGIN.LOW,
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
                      marginTop: THEME.MARGIN.LOW,
                      height: RF(50),
                      width: RF(50),
                    }}>
                    <FastImage
                      source={imageName}
                      style={{
                        height: RF(30),
                        width: RF(30),
                        marginBottom: THEME.MARGIN.LOW,
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
    </>
  );
};

export default BottomTabs;
