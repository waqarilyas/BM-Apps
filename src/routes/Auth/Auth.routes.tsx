import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import ImportWallet from '../../screens/Auth/ImportWallet';
import StartScreen from '../../screens/Generic/StartScreen';
import {THEME} from '../../shared/theme';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    // <SafeAreaView
    //   style={{flex: 1, backgroundColor: THEME.COLORS.primaryBackground}}>
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="ImportWallet" component={ImportWallet} />
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default AuthStack;
