import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsMain from '../../../screens/Settings/SettingsMain';
import CoinAcceptance from '../../../screens/Settings/CoinAcceptance';
import PurchaseHistory from '../../../screens/Settings/PurchaseHistory';
import AddPlace from '../../../screens/Settings/AddPlace';
import ChangePin from '../../../screens/Generic/ChangePin';
import PurchaseDetail from '../../../screens/Settings/PurchaseDetail';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SettingsMain" component={SettingsMain} />
      <Stack.Screen name="CoinAcceptance" component={CoinAcceptance} />
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
      <Stack.Screen name="AddPlace" component={AddPlace} />
      <Stack.Screen name="ChangePIN" component={ChangePin} />
      <Stack.Screen name="PurchaseDetail" component={PurchaseDetail} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
