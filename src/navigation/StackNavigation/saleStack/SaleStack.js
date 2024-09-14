import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectProduct from '../../../screens/Sale/select_product/SelectProduct';
import CustomerList from '../../../screens/Sale/customerList/CustomerList';
import SaleHome from '../../../screens/Sale/saleAnalytics/saleAnalytics';
import AllOrders from '../../../screens/Sale/allOrders/AllOrders';
import AllSales from '../../../screens/Sale/allSales/AllSales';
import Draft from '../../../screens/Sale/draft/Draft';
import InvoiceQR from '../../../screens/Sale/invoice_qr/InvoiceQR';
import Payment from '../../../screens/Sale/payment/Payment';
const Stack = createNativeStackNavigator();

const SaleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="create-sale">
      <Stack.Screen name="sale-home" component={SaleHome} />
      <Stack.Screen name="all-sales" component={AllSales} />
      <Stack.Screen name="all-orders" component={AllOrders} />
      <Stack.Screen name="draft" component={Draft} />
      <Stack.Screen name="select-product" component={SelectProduct} />
      <Stack.Screen name="customer-list" component={CustomerList} />
      <Stack.Screen name="invoice-qr" component={InvoiceQR} />
      <Stack.Screen name="payment-invoice" component={Payment} />
      <Stack.Screen name="invoice-screen" component={InvoiceQR} />
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default SaleStack;
