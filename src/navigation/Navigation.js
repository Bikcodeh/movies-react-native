import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';

const Drawer = createDrawerNavigator();

export default function Navigation() {
    return (
        <Drawer.Navigator initialRouteName="Movies">
            <Drawer.Screen name="Movies" component={StackNavigation}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

