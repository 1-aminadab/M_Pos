import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Order from '../../../screens/Order/Home/Home';
import CreateOrder from '../../../screens/Order/CreateOrder/CreateOrder';
import  Products  from '../../../screens/Order/Products/Products';
import FilterOrder from '../../../screens/Order/filterOrders/FilterOrders';
const Stack = createNativeStackNavigator();

function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="order">
      <Stack.Screen name="order" component={Order} />
      <Stack.Screen name="create-order" component={CreateOrder} />
      <Stack.Screen name="order-products" component={Products} />
      <Stack.Screen name="filter-order" component={FilterOrder} />
      
     
    </Stack.Navigator>
  )
}

export default OrderStack