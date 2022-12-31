import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Popular from '../screens/Popular';
import News from '../screens/News';
import Movie from '../screens/Movie';
import {IconButton} from 'react-native-paper';
import {getActiveRouteState} from '../utils/RouteName';
import PreferencesContext from '../context/PreferencesContext';

const Stack = createNativeStackNavigator();

export default function StackNavigation(props) {
  const {setCurrentDrawerOption} = useContext(PreferencesContext);
  const {navigation} = props;
  const searchButton = () => {
    return (
      <IconButton icon="camera" onPress={() => navigation.navigate('search')} />
    );
  };
  return (
    <Stack.Navigator
      screenListeners={{
        state: e => {
          const activeRoute = getActiveRouteState(e.data.state);
          setCurrentDrawerOption(activeRoute.name);
        },
      }}>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: '',
          headerShown: true,
          headerLeft: () => searchButton(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
