import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddCategory from '../screens/inventory/INVConfig/category/AddCategory';
import AddCustomer from '../screens/Setting/AddCustomer';
import AddItem from '../screens/Products/add_product';
import AddProduct from '../screens/Products/add_product';
import AllProducts from '../screens/Products/allProduct/AllProducts';
import Analytics from '../screens/Setting/Analytics';
import AppLock from '../screens/Setting/Importnant/AppLock';
import CategoryList from '../screens/inventory/INVConfig/category/CategoryList';
import ChangePasswordScreen from '../screens/Setting/Importnant/ChangePasswordScreen';
import CreateSale from '../screens/Sale/create_sale/CreateSale';
import Currency from '../screens/Setting/Importnant/Currency';
import Customer from '../screens/Setting/Customer';
import CustomerList from '../screens/Sale/customerList/CustomerList';
import Devices from '../screens/Setting/Importnant/Devices';
import DrawerExample from '../screens/drawer/Drawer';
import DrawerStack from './DrawerStack';
import Feedback from '../screens/Setting/Others/Feedback';
import Finance from '../screens/Setting/Finance';
import FilterOrder from '../screens/Order/filterOrders/FilterOrders';
import GeneratedInvoice from '../screens/Sale/invoice_qr/GeneratedInvoice';
import InvoiceQR from '../screens/Sale/invoice_qr/InvoiceQR';
import InvoiceSetting from '../screens/Setting/Importnant/InvoiceSetting';
import Language from '../screens/Setting/GeneralSetting/Language';
import LoginLoading from '../screens/Auth/LoginLoading';
import LoginStack from './StackNavigation/authStack/LoginStack';
import MainTabNavigation from './TabNavigation/mainNavigation/MainTabNavigation';
import MessageDetail from '../screens/network/message/MessageDetail';
// import Notification from '../screens/Setting/notification/Notification';
import NotificationDetail from '../screens/Setting/notification/notificationDetail';
import NotificationSetting from '../screens/Setting/Importnant/NotificationSetting';
import Order from '../screens/Order/Home/Home';
import Payment from '../screens/Sale/payment/Payment';
import PremiumForm from '../screens/Setting/premium/paymentForm';
import PrinterSettingScreen from '../screens/Setting/Importnant/PrinterSettingScreen';
import Profile from '../screens/Setting/GeneralSetting/Profile';
import Product from '../screens/Products/productHome';
import SalesPerson from '../screens/salesPerson/Home';
import Security from '../screens/Setting/Importnant/Security';
import SelectProduct from '../screens/Sale/select_product/SelectProduct';
import Setting from '../screens/Setting/Setting';
import SettingProduct from '../screens/Setting/SettingProduct';
import StockIn from '../screens/inventory/stock_in';
import TwoStep from '../screens/Setting/Importnant/TwoStep';
import UserPackages from '../screens/Setting/userPackage';
import { AuthContext } from '../hooks/useContext/AuthContext';
import ProductReport from '../screens/inventory/Report/ProductsReport';
import AboutUsScreen from '../screens/Setting/AboutUs/AboutUs';
import TermsAndConditionsScreen from '../screens/Setting/AboutUs/TermAndRegulation';
import LockScreen from '../screens/Setting/LockScreen';
const Stack = createNativeStackNavigator();

const TopLevelStack = () => {
  const {isloading, userToken, userInfo} = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isloading ? (
        <Stack.Screen name="login-loading" component={LoginLoading} />
      ) : isloading == false && userToken === null ? (
        <Stack.Screen name="LoginStack" component={LoginStack} />
      ) : (
        // <Stack.Screen name="home-screen" component={MainTabNavigation} />
        <>
          <Stack.Screen name="home-screen" component={MainTabNavigation} />
          <Stack.Screen name="allproducts" component={Product} />
          <Stack.Screen name="filter-order" component={FilterOrder} />
          <Stack.Screen name="order" component={Order} />
          <Stack.Screen name="generated-invoice" component={GeneratedInvoice} />
          <Stack.Screen name="sales-person" component={SalesPerson} />
          <Stack.Screen name="premium-form" component={PremiumForm} />
         
          <Stack.Screen
            name="user-package"
            options={() => ({animation: 'slide_from_right'})}
            component={UserPackages}
          />
          <Stack.Screen name="setting" component={Setting} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="language" component={Language} />
          <Stack.Screen
            name="notificationSetting"
            component={NotificationSetting}
          />
          <Stack.Screen name="security" component={Security} />
          <Stack.Screen name="two-step" component={TwoStep} />
          <Stack.Screen name="appLock" component={AppLock} />
          <Stack.Screen name="lock-screen" component={LockScreen} />
          <Stack.Screen name="devices" component={Devices} />
          <Stack.Screen
            name="changePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="invoiceSetting" component={InvoiceSetting} />
          <Stack.Screen
            name="printerSettingScreen"
            component={PrinterSettingScreen}
          />
          <Stack.Screen name="currency" component={Currency} />
          <Stack.Screen name="feedback" component={Feedback} />
          <Stack.Screen
            name="add-product-category"
            component={SettingProduct}
          />
          <Stack.Screen
            name={'create-sale'}
            options={() => ({animation: 'slide_from_bottom'})}
            component={CreateSale}
          />
          {/* <Stack.Screen name="inventory" component={Inventory} /> */}
      <Stack.Screen name="stock-in" component={StockIn} />

          <Stack.Screen name="select-product" component={SelectProduct} />
          <Stack.Screen name="invoice-screen" component={InvoiceQR} />
          <Stack.Screen name="payment-screen" component={Payment} />

          <Stack.Screen name="add-item" component={AddItem} />
          <Stack.Screen name="add-category" component={AddCategory} />
          <Stack.Screen name="add-product" component={AddProduct} />
          {/* Customer list for Sale */}
          <Stack.Screen name="customer-list" component={CustomerList} />
          {/* Customer List in Setting */}
          <Stack.Screen name="Customer" component={Customer} />
          <Stack.Screen name="category-list" component={CategoryList} />
          <Stack.Screen name="change-vat" component={Finance} />
          <Stack.Screen
            name="notification-detail"
            component={NotificationDetail}
          />
          <Stack.Screen name="message-detail" component={MessageDetail} />
          {/* <Stack.Screen name="select-product" component={SelectProduct} /> */}
        </>
      )}
    </Stack.Navigator>
  );
};

/* Rules */
// If neccessary we will add Top Level Stack here.
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default TopLevelStack;
