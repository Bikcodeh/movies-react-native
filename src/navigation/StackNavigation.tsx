import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationProp, DrawerActions, NavigationHelpers } from "@react-navigation/native";
import Home from '../screens/Home';
import Search from '../screens/Search';
import Popular from '../screens/Popular';
import News from '../screens/News';
import Movie from '../screens/Movie';
import {IconButton} from 'react-native-paper';
import {getActiveRouteState} from '../utils/RouteName';
import PreferencesContext from '../context/PreferencesContext';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootStackParamList = {
  home: undefined,
  search: undefined,
  news: undefined,
  popular: undefined,
  movie: undefined
}

interface Props extends DrawerScreenProps<any>{}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation(props: Props) {
  const {setCurrentDrawerOption} = useContext(PreferencesContext);
  const {navigation} = props;
  const searchButton = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };
  const burgerMenu = () => {
    return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
  };
  return (
    <Stack.Navigator
      screenListeners={{
        state: e => {
          const data = e.data as any
          const activeRoute = getActiveRouteState(data.state);
          setCurrentDrawerOption(activeRoute.name);
        },
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
          headerRight: () => searchButton(),
          headerLeft: () => burgerMenu(),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: 'Search',
          headerShown: false,
          headerLeft: () => burgerMenu(),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'Popular',
          headerShown: false,
          headerRight: () => searchButton(),
          headerLeft: () => burgerMenu(),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'News',
          headerShown: false,
          headerRight: () => searchButton(),
          headerLeft: () => burgerMenu(),
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: 'Movie',
          headerShown: false,
          headerLeft: () => burgerMenu(),
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
