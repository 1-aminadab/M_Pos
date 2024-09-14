import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllOrders from '../../../screens/Sale/allOrders/AllOrders';
import AllSales from '../../../screens/Sale/allSales/AllSales';
import Draft from '../../../screens/Sale/draft/Draft';
import SaleAnalytics from '../../../screens/Sale/saleAnalytics/saleAnalytics';
import Analytics from '../../../screens/Setting/Analytics';


const Stack = createNativeStackNavigator();

const AnalyticsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="analytics">
      <Stack.Screen name="analytics" component={Analytics} />

      {/* <Stack.Screen name="sale-analytics" component={SaleAnalytics} /> */}
      <Stack.Screen name="all-sales" component={AllSales} />
      <Stack.Screen name="all-orders" component={AllOrders} />
      <Stack.Screen name="draft" component={Draft} />
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default AnalyticsStack;
