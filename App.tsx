import React, {useMemo, useState, useEffect} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation/Navigation';
import {StatusBar} from 'react-native';

import './src/localization/i18n';
import MoviesTheme from './src/theme/Theme';
import {RootStackParamList} from './src/navigation/StackNavigation';
import PreferencesContext from './src/context/PreferencesContext';
import './src/utils/extension/StringExt';
//import * as RNLocalize from 'react-native-localize';
//import {useTranslation} from 'react-i18next';
import {STORAGE_KEYS, storeData} from './src/utils/Storage';
import {getLang, parseObject} from './src/utils/Util';
import {LANGUAGES} from './src/utils/constants';
import {Lang} from './src/interfaces/lang';
import {useTranslation} from 'react-i18next';

export default function App(): JSX.Element {
  const {i18n} = useTranslation();
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

  useEffect(() => {
    getLang().then(data => {
      if (data === null) {
        storeData(STORAGE_KEYS.LANG, LANGUAGES.en);
        i18n.changeLanguage('en');
      } else {
        const language = parseObject<Lang>(data);
        i18n.changeLanguage(language?.key || 'en');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  Work around to change language when devices change the language
  const handleLocalizationChange = () => {
    i18n.changeLanguage(RNLocalize.getLocales()[0].languageCode);
  };

  useEffect(() => {
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  return (
    <PreferencesContext.Provider value={preference}>
      <PaperProvider
        theme={
          theme === 'dark'
            ? MoviesTheme.DarkThemePaper
            : MoviesTheme.DefaultThemePaper
        }>
        <StatusBar
          animated
          barStyle={theme === 'dark' ? 'light-content' : undefined}
        />
        <NavigationContainer
          ref={navRef}
          theme={
            theme === 'dark'
              ? MoviesTheme.DarkThemeNavigation
              : MoviesTheme.DefaultThemeNavigation
          }>
          <Navigation {...navRef} />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
