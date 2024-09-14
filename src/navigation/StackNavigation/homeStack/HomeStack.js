import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../../screens/Sale/create_sale/home/Home';
import CreateSale from '../../../screens/Sale/create_sale/CreateSale';
import InvoiceQR from '../../../screens/Sale/invoice_qr/InvoiceQR';
import Payment from '../../../screens/Sale/payment/Payment';
import Inventory from '../../../screens/inventory/main';
import StockIn from '../../../screens/inventory/stock_in';
import AddCategory from '../../../screens/inventory/INVConfig/category/AddCategory';
import AddProduct from '../../../screens/Products/add_product';

import Edit from '../../../screens/Setting/GeneralSetting/Edit';

import Premium from '../../../screens/Setting/Premium';
import Profile from '../../../screens/Setting/GeneralSetting/Profile';
import Setting from '../../../screens/Setting/Setting';
import Legacy from '../../../screens/Setting/Legal/Legacy';
import Feedback from '../../../screens/Setting/Others/Feedback';
import Help from '../../../screens/Setting/Help/Help';
import Network from '../../../screens/network';
import MessageDetail from '../../../screens/network/message/MessageDetail';
import ChangePin from '../../../screens/Setting/Importnant/ChangePin';
import InventoryConfig from '../../../screens/inventory/INVConfig';
import AllSales from '../../../screens/Sale/allSales/AllSales';
import Draft from '../../../screens/Sale/draft/Draft';
import B2BInvoice from '../../../screens/Sale/invoice_qr/Invoice/B2BInvoice';
import SelectProduct from '../../../screens/Sale/select_product/SelectProduct';
import AddCustomer from '../../../screens/Setting/AddCustomer';
import Analytics from '../../../screens/Setting/Analytics'
import InvoiceQrGenerated from '../../../screens/Sale/payment/InvoiceQRCode'
import NotificationScreen from '../../../screens/Setting/notification/Notification';
import ProductReport from '../../../screens/inventory/Report/ProductsReport';
import AboutUsScreen from '../../../screens/Setting/AboutUs/AboutUs';
import TermsAndConditionsScreen from '../../../screens/Setting/AboutUs/TermAndRegulation';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  // useEffect(()=>{
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();
  // console.log('firstffzz')
  //     // Do something manually
  //     // ...
  //   });

  //   return unsubscribe;
  // },[navigation])
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="network">
      <Stack.Screen name="network" component={Network} />
      <Stack.Screen name="main" component={Home} />
      <Stack.Screen name="create-sale" component={CreateSale} />
      <Stack.Screen name="invoice-screen" component={InvoiceQR} />
      <Stack.Screen name="payment-screen" component={Payment} />
      <Stack.Screen name="inventory" component={Inventory} />
      <Stack.Screen name="stock-in" component={StockIn} />
      <Stack.Screen name="add-product-category" component={AddCategory} />
      <Stack.Screen name="add-product" component={AddProduct} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="Premium" component={Premium} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen name="Legacy" component={Legacy} />
      <Stack.Screen name="send_feedback" component={Feedback} />
      <Stack.Screen name="help" component={Help} />
      {/* <Stack.Screen name="payment" component={Payment} /> */}
      <Stack.Screen name="payment-invoice" component={Payment} />
      <Stack.Screen name="Change-pin" component={ChangePin} />
      <Stack.Screen name="inventory-config" component={InventoryConfig} />
      <Stack.Screen name="all-sales" component={AllSales} />
      <Stack.Screen name="drafts" component={Draft} />
      <Stack.Screen name="b2b" component={B2BInvoice} />
      <Stack.Screen name="select-product" component={SelectProduct} />
      <Stack.Screen name="add-customer" component={AddCustomer} />
      <Stack.Screen name="analytics" component={Analytics} />
      <Stack.Screen name="invoice-qr" component={InvoiceQrGenerated} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="about-us" component={AboutUsScreen} />
          <Stack.Screen name="term-and-regulation" component={TermsAndConditionsScreen} />
          
      {/* <Stack.Screen name="main" component={HomeforRealm} /> */}
      {/* add your screens here following the rules listed bellow */}
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default HomeStack;
