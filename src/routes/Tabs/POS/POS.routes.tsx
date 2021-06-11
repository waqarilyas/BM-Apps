import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import POSMain from '../../../screens/POS/POSMain';
import NearBy from '../../../screens/POS/NearBy';
import ProductDetails from '../../../screens/POS/ProductDetails';
import Cart from '../../../screens/POS/Cart';
import AddProduct from '../../../screens/POS/AddProduct';
import AddTip from '../../../screens/POS/AddTip';
import Payment from '../../../screens/POS/Payment';
import SearchProduct from '../../../screens/POS/SearchProduct';

const Stack = createStackNavigator();

const POSStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="POSMain" component={POSMain} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="NearBy" component={NearBy} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="AddTip" component={AddTip} />
      <Stack.Screen name="SearchProduct" component={SearchProduct} />
    </Stack.Navigator>
  );
};

export default POSStack;
