import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WalletMain from '../../../screens/Wallet/WalletMain';
import CoinDetails from '../../../screens/Wallet/CoinDetails';
import SendCoin from '../../../screens/Wallet/SendCoin';
import ReceiveCoin from '../../../screens/Wallet/ReceiveCoin';
import {SafeAreaView} from 'react-native';
import {THEME} from '../../../shared/theme';

const Stack = createStackNavigator();

const WalletStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerShown: false,
        })}>
        <Stack.Screen name="WalletMain" component={WalletMain} />
        <Stack.Screen name="CoinDetails" component={CoinDetails} />
        <Stack.Screen name="SendCoin" component={SendCoin} />
        <Stack.Screen name="ReceiveCoin" component={ReceiveCoin} />
      </Stack.Navigator>
    </>
  );
};

export default WalletStack;
