import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../../../screens/Auth/WelcomeScreen';
import LogIn from '../../../screens/Auth/LogIn';
import SignUp from '../../../screens/Auth/SignUp';
import ForgotPassword from '../../../screens/Auth/ForgotPassword';
import OTP from '../../../screens/Auth/OTP';
import ResetPassword from '../../../screens/Auth/ResetPassword';
import ChangePasswordScreen from '../../../screens/Setting/Importnant/ChangePasswordScreen';
import RestoreAccount from '../../../screens/Auth/RestoreAccount';
const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="RestoreAccount" component={RestoreAccount} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />

      {/* add your screens here following the rules listed bellow */}
    </Stack.Navigator>
  );
};

/* Rules */
// screen path names should be in The Same As The File Name,
// Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
// You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.

export default LoginStack;
