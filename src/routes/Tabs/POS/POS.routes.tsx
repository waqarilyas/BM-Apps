import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import POSMain from '../../../screens/POS/POSMain';
import ProductDetails from '../../../screens/POS/ProductDetails';
import Cart from '../../../screens/POS/Cart';
import AddProduct from '../../../screens/POS/AddProduct';
import Payment from '../../../screens/POS/Payment';
import SearchProduct from '../../../screens/POS/SearchProduct';
import DirectInvoice from '../../../screens/POS/DirectInvoice';
import SaleHistory from '../../../screens/POS/SaleHistory';
import CustomerInfo from '../../../screens/POS/CustomerInfo';
import CustomerPhoneDetails from '../../../screens/POS/CustomerPhoneDetails';

const Stack = createStackNavigator();

const POSStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="DirectInvoice" component={DirectInvoice} />
      <Stack.Screen name="POSMain" component={POSMain} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="SaleHistory" component={SaleHistory} />
      <Stack.Screen name="CustomerInfo" component={CustomerInfo} />
      <Stack.Screen
        name="CustomerPhoneDetails"
        component={CustomerPhoneDetails}
      />
      <Stack.Screen name="SearchProduct" component={SearchProduct} />
    </Stack.Navigator>
  );
};

export default POSStack;
