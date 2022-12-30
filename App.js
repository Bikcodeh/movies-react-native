import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation/Navigation';
import {StatusBar} from 'react-native';

import MoviesTheme from './src/theme/Theme';

const App = () => {
  return (
    <PaperProvider theme={MoviesTheme.DarkThemePaper}>
      <NavigationContainer theme={MoviesTheme.DarkThemeNavigation}>
        <StatusBar barStyle={'dark-content'} />
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
