import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StockIn from '../../../screens/inventory/stock_in';
import Inventory from '../../../screens/inventory/main';
import AddProduct from '../../../screens/Products/add_product';
import InventoryConfig from '../../../screens/inventory/INVConfig';
import AllProducts from '../../../screens/Products/allProduct/AllProducts';
import Product from '../../../screens/Products/productHome';
import ProductReport from '../../../screens/inventory/Report/ProductsReport';
const Stack = createNativeStackNavigator();

const InventoryStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="inventory">
      <Stack.Screen name="inventory" component={Inventory} />
      <Stack.Screen name="stock-in" component={StockIn} />
      <Stack.Screen name="add-item" component={AddProduct} />
      <Stack.Screen name='inventory-config' component={InventoryConfig} />
      <Stack.Screen name='allproducts' component={Product} />
      <Stack.Screen name="product-report" component={ProductReport} />

      {/* add your screens here following the rules listed bellow */}
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in all lower case except for main Tab Navigations. (Home, Setting, Sale, Products) it is already done.
// for example if you want to use "product list" as a screen name use like (product-list) without parenthesis.
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default InventoryStack;
