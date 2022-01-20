import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsMain from '../../../screens/Settings/SettingsMain';
import CoinAcceptance from '../../../screens/Settings/CoinAcceptance';
import PurchaseHistory from '../../../screens/Settings/PurchaseHistory';
import AddPlace from '../../../screens/Settings/AddPlace';
import ChangePin from '../../../screens/Generic/ChangePin';
import PurchaseDetail from '../../../screens/Settings/PurchaseDetail';
import SelectionScreen from '../../../screens/Settings/SelectionScreen';
import BackupPhrase from '../../../screens/Settings/BackupPhrase';
import EnableMerchant from '../../../screens/Settings/EnableMerchant';
import AddressBook from '../../../screens/Settings/AddressBook';
import AddContact from '../../../screens/Settings/AddContact';
import LanguageSelection from '../../../screens/Settings/LanguageSelection';
import ForwardAdd from '../../../screens/Settings/ForwardAdd';
import ForwardAddDetails from '../../../screens/Settings/ForwardAddDetails';

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
      <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
      <Stack.Screen name="BackupPhrase" component={BackupPhrase} />
      <Stack.Screen name="EnableMerchant" component={EnableMerchant} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
      <Stack.Screen name="ForwardAdd" component={ForwardAdd} />
      <Stack.Screen name="ForwardAddDetails" component={ForwardAddDetails} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
