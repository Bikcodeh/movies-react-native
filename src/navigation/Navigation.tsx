import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from './DrawerContent';
import {
  DrawerActions,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import {RootStackParamList} from './StackNavigation';
import {IconButton} from 'react-native-paper';

const Drawer = createDrawerNavigator();

interface Props extends NavigationContainerRefWithCurrent<RootStackParamList> {}

export default function Navigation(myprops: Props) {
  const [routeName, setRouteName] = useState<string>('home');
  useEffect(() => {
    if (myprops.isReady()) {
      setRouteName(myprops?.getCurrentRoute()?.name || 'home');
    }
    return () => {};
  }, [myprops]);
  const searchButton = () => {
    return (
      <IconButton icon="magnify" onPress={() => myprops.navigate('search')} />
    );
  };
  const burgerMenu = () => {
    return (
      <IconButton
        icon="menu"
        onPress={() => myprops.dispatch(DrawerActions.openDrawer())}
      />
    );
  };
  const backButton = () => {
    return <IconButton icon="arrow-left" onPress={() => myprops.goBack()} />;
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
          headerLeft: () =>
            routeName !== 'movie' && routeName !== 'search'
              ? burgerMenu()
              : backButton(),
          headerRight: () =>
            routeName !== 'search' && routeName !== 'movie' && searchButton(),
          title: routeName.charAt(0).toUpperCase() + routeName.slice(1),
        }}
      />
    </Drawer.Navigator>
  );
}
