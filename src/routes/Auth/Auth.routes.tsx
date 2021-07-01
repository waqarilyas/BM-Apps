import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ImportWallet from '../../screens/Auth/ImportWallet';
import StartScreen from '../../screens/Generic/StartScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="ImportWallet" component={ImportWallet} />
    </Stack.Navigator>
  );
};

export default AuthStack;
