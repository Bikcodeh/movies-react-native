import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from './DrawerContent';
import {IconButton} from 'react-native-paper';

const Drawer = createDrawerNavigator();

export default function Navigation(myprops) {
  const [routeName, setRouteName] = useState('home');
  useEffect(() => {
    if (myprops.isReady()) {
      setRouteName(myprops.getCurrentRoute().name);
    }
    return () => {};
  }, [myprops]);
  const searchButton = () => {
    return (
      <IconButton icon="magnify" onPress={() => myprops.navigate('search')} />
    );
  };
  return (
    <Drawer.Navigator
      initialRouteName="Movies"
      backBehavior="order"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="movies"
        component={StackNavigation}
        options={{
          headerShown: true,
          headerRight: () => routeName !== 'search' && searchButton(),
          title: routeName.charAt(0).toUpperCase() + routeName.slice(1),
        }}
      />
    </Drawer.Navigator>
  );
}
