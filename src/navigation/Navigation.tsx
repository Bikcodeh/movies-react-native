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
import {capitalize, isValidScreen} from '../utils/Util';

export type DrawerParamList = {
  movies: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

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
  const backButton = (screen: string) => {
    return (
      <IconButton
        icon="arrow-left"
        onPress={() => myprops.goBack()}
        iconColor={screen === 'movie' ? 'white' : undefined}
      />
    );
  };
  return (
    <Drawer.Navigator
      initialRouteName="movies"
      backBehavior="order"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="movies"
        component={StackNavigation}
        options={{
          headerShown: true,
          headerLeft: () =>
            isValidScreen(routeName) ? burgerMenu() : backButton(routeName),
          headerRight: () => isValidScreen(routeName) && searchButton(),
          title: routeName !== 'movie' ? capitalize(routeName) : '',
          headerTransparent: routeName !== 'movie' ? false : true,
        }}
      />
    </Drawer.Navigator>
  );
}
