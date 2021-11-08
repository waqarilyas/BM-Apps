import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import ImportWallet from '../../screens/Auth/ImportWallet';
import StartScreen from '../../screens/Generic/StartScreen';
import {RootState} from '../../shared/store';
import {THEME} from '../../shared/theme';

const Stack = createStackNavigator();

const AuthStack = () => {
  const {isRendered} = useSelector((state: RootState) => state.wallet);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isRendered
          ? THEME.COLORS.secondaryBackground
          : THEME.COLORS.primaryBackground,
      }}>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerShown: false,
        })}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ImportWallet" component={ImportWallet} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStack;
