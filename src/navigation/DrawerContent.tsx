import React, {useContext} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Drawer, Text, Switch, TouchableRipple} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';
import PreferencesContext from '../context/PreferencesContext';

interface Props extends DrawerContentComponentProps {}

export default function DrawerContent(props: Props) {
  const {t} = useTranslation();
  const {theme, toggleTheme} = usePreferences();
  const {navigation} = props;
  const {drawerOptionSelected, setCurrentDrawerOption} =
    useContext(PreferencesContext);

  const navigate = (screen: string) => {
    setCurrentDrawerOption(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label={t('screens.home')}
          active={drawerOptionSelected === 'home'}
          onPress={() => navigate('home')}
        />
        <Drawer.Item
          label={t('screens.popular')}
          active={drawerOptionSelected === 'popular'}
          onPress={() => navigate('popular')}
        />
        <Drawer.Item
          label={t('screens.news')}
          active={drawerOptionSelected === 'news'}
          onPress={() => navigate('news')}
        />
      </Drawer.Section>
      <Drawer.Section title={t('drawer.options') || 'Options'}>
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>{t('drawer.darkMode')}</Text>
            <Switch value={theme === 'dark'} onChange={toggleTheme} />
          </View>
        </TouchableRipple>
        <Drawer.Item
          label={t('drawer.settings')}
          active={drawerOptionSelected === 'settings'}
          onPress={() => navigate('settings')}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    paddingStart: 28,
    paddingEnd: 16,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
