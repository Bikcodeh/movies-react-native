import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Popular from '../screens/Popular';
import News from '../screens/News';
import Movie from '../screens/Movie';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={{ title: '', headerShown: false }} />
            <Stack.Screen name='search' component={Search} options={{ title: '', headerShown: false }} />
            <Stack.Screen name='popular' component={Popular} options={{ title: '', headerShown: false }} />
            <Stack.Screen name='news' component={News} options={{ title: '', headerShown: false }} />
            <Stack.Screen name='movie' component={Movie} options={{ title: '', headerShown: false }} />
        </Stack.Navigator>
    );
}