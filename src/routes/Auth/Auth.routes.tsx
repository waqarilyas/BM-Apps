import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import StartScreen from '../../screens/Generic/StartScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthStack;
