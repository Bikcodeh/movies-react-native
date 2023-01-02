import React, {useMemo, useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation/Navigation';
import {StatusBar} from 'react-native';

import MoviesTheme from './src/theme/Theme';
import {RootStackParamList} from './src/navigation/StackNavigation';
import PreferencesContext from './src/context/PreferencesContext';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [drawerOptionSelected, setDrawerOptionSelected] = useState('home');
  const navRef = useNavigationContainerRef<RootStackParamList>();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const setCurrentDrawerOption = (route: string) => {
    setDrawerOptionSelected(route);
  };

  const preference = useMemo(
    () => ({
      theme,
      toggleTheme,
      drawerOptionSelected,
      setCurrentDrawerOption,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, drawerOptionSelected],
  );
  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider
        theme={
          theme === 'dark'
            ? MoviesTheme.DarkThemePaper
            : MoviesTheme.DefaultThemePaper
        }>
        <NavigationContainer
          ref={navRef}
          theme={
            theme === 'dark'
              ? MoviesTheme.DarkThemeNavigation
              : MoviesTheme.DefaultThemeNavigation
          }>
          <StatusBar
            barStyle={theme === 'dark' ? 'dark-content' : 'light-content'}
          />
          <Navigation {...navRef} />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};
export default App;
