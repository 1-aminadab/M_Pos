import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SaleAnalytics from '../../../screens/Sale/saleAnalytics/saleAnalytics';
import Payment from '../../../screens/Payment/Payment';
import QRCode from '../../../screens/Payment/QRCode/QRCode';
import NFC from '../../../screens/Payment/NFC/NFC';
import PaymentLink from '../../../screens/Payment/PaymentLink/PaymentLink';
import Cash from '../../../screens/Payment/Cash/Cash';
const Stack = createNativeStackNavigator();

function PaymentStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="payment">
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="qr-code" component={QRCode} />
      <Stack.Screen name="nfc" component={NFC} />
      <Stack.Screen name="payment-link" component={PaymentLink} />
      <Stack.Screen name="cash" component={Cash} />
      
    </Stack.Navigator>
  )
}

export default PaymentStack