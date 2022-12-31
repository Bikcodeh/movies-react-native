import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Movies"
      backBehavior="order"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Movies" component={StackNavigation} />
    </Drawer.Navigator>
  );
}
