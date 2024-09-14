import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../../../screens/Setting/Main';
import Profile from '../../../screens/Setting/GeneralSetting/Profile';
import Edit from '../../../screens/Setting/GeneralSetting/Edit';
import LockScreen from '../../../screens/Setting/LockScreen';
import PINScreen from '../../../screens/Setting/PINScreen';
import ChangePasswordScreen from '../../../screens/Setting/Importnant/ChangePasswordScreen';
import Language from '../../../screens/Setting/GeneralSetting/Language';
import PrinterSettingScreen from '../../../screens/Setting/Importnant/PrinterSettingScreen';
import Currency from '../../../screens/Setting/Importnant/Currency';
import Customer from '../../../screens/Setting/Customer';
import AddCustomer from '../../../screens/Setting/AddCustomer';
import Payment from '../../../screens/Payment/Payment';
import ChooseBank from '../../../screens/Setting/ChooseBank';
import Analytics from '../../../screens/Setting/Analytics';
import ActiveSessionsScreen from '../../../screens/Setting/ActiveSessionsScreen';
import Notification from '../../../screens/Setting/notification/Notification';
import AccountNumber from '../../../screens/Setting/AccountNumber';
import PhoneNumber from '../../../screens/Setting/PhoneNumber';
import ActivationCode from '../../../screens/Setting/ActivationCode';
import SyncScreen from '../../../screens/Setting/SyncScreen';
import SyncHistory from '../../../screens/Setting/SyncHistory';
import More from '../../../screens/Setting/More';
import Content from '../../../screens/Setting/Content';
import Security from '../../../screens/Setting/Importnant/Security';
import Setting from '../../../screens/Setting/Setting';
import Premium from '../../../screens/Setting/Premium';
import AddProduct from '../../../screens/Products/add_product';
import SettingProduct from '../../../screens/Setting/SettingProduct';
import UserPackages from '../../../screens/Setting/userPackage';
import Finance from '../../../screens/Setting/Finance';
import Legacy from '../../../screens/Setting/Legal/Legacy';
import LegacyContent from '../../../components/Legacy/LegacyContent';
import Feedback from '../../../screens/Setting/Others/Feedback';
import Help from '../../../screens/Setting/Help/Help';
import Draft from '../../../screens/Sale/draft/Draft';
import AddCategory from '../../../screens/inventory/INVConfig/category/AddCategory';
import CategoryList from '../../../screens/inventory/INVConfig/category/CategoryList';
import Inventory from '../../../screens/inventory/main';
import StockIn from '../../../screens/inventory/stock_in';
import ChangePin from '../../../screens/Setting/Importnant/ChangePin';
import InventoryConfig from '../../../screens/inventory/INVConfig';
import SelectProduct from '../../../screens/Sale/select_product/SelectProduct';

const Stack = createNativeStackNavigator();

const Settingtack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="More-Part" component={More} />
      <Stack.Screen name="Premium" component={Premium} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="LockScreen" component={LockScreen} />
      <Stack.Screen name="PINScreen" component={PINScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen
        name="PrinterSettingcreen"
        component={PrinterSettingScreen}
      />
      <Stack.Screen name="Currency" component={Currency} />
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ChooseBank" component={ChooseBank} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen
        name="ActiveSessionScreen"
        component={ActiveSessionsScreen}
      />
      {/* <Stack.Screen name="Notification" component={Notification} /> */}
      <Stack.Screen name="AccountNumber" component={AccountNumber} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
      <Stack.Screen name="ActivationCode" component={ActivationCode} />
      <Stack.Screen name="SyncScreen" component={SyncScreen} />
      <Stack.Screen name="SyncHistory" component={SyncHistory} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen name="Product" component={SettingProduct} />
      <Stack.Screen name="add-product" component={AddProduct} />
      <Stack.Screen name="user-package" component={UserPackages} />
      <Stack.Screen name="Finance" component={Finance} />
      <Stack.Screen name="Legacy" component={Legacy} />
      <Stack.Screen name="Draft" component={Draft} />
      <Stack.Screen name="legacy_content" component={LegacyContent} />
      <Stack.Screen name="send_feedback" component={Feedback} />
      <Stack.Screen name="help" component={Help} />
      <Stack.Screen name="add-item" component={AddProduct} />
      <Stack.Screen name="add-category" component={AddCategory} />
      <Stack.Screen name="category-list" component={CategoryList} />
      <Stack.Screen name="inventory" component={Inventory} />
      <Stack.Screen name="stock-in" component={StockIn} />
      <Stack.Screen name="add-customer" component={AddCustomer} />
      <Stack.Screen name="Change-pin" component={ChangePin} />
      <Stack.Screen name="inventory-config" component={InventoryConfig} />
      <Stack.Screen name="select-product" component={SelectProduct} />
      <Stack.Screen name="notification" component={Notification} />

    </Stack.Navigator>
  );
};

export default Settingtack;
