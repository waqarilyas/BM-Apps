import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NearBy from '../../../screens/POS/NearBy';
import SearchProduct from '../../../screens/POS/SearchProduct';
import ShopDetails from '../../../screens/POS/ShopDetails';

const Stack = createStackNavigator();

const MAPStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="NearBy" component={NearBy} />
      <Stack.Screen name="ShopDetails" component={ShopDetails} />

      <Stack.Screen name="SearchProduct" component={SearchProduct} />
    </Stack.Navigator>
  );
};

export default MAPStack;
