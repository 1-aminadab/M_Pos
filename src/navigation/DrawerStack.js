import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Order  from '../screens/Order/Home/Home';
import TopLevelStack from './TopLevelStack';
import DrawerContent from '../components/DrawerContent';
const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
      <Drawer.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown:false
      }}
      drawerContent={props => <DrawerContent/>}
      >
        <Drawer.Screen name="Home" component={TopLevelStack} />
      </Drawer.Navigator>
    
  );
}