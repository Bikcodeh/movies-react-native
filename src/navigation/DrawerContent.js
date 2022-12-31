import React, {useContext} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import {Drawer, Text, Switch, TouchableRipple} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';
import PreferencesContext from '../context/PreferencesContext';

export default function DrawerContent(props) {
  const {theme, toggleTheme} = usePreferences();
  const {navigation} = props;
  const {drawerOptionSelected, setCurrentDrawerOption} =
    useContext(PreferencesContext);

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Home"
          active={drawerOptionSelected === 'home'}
          onPress={() => {
            setCurrentDrawerOption('home');
            navigation.navigate('home');
          }}
        />
        <Drawer.Item
          label="Popular"
          active={drawerOptionSelected === 'popular'}
          onPress={() => {
            setCurrentDrawerOption('popular');
            navigation.navigate('popular');
          }}
        />
        <Drawer.Item
          label="News"
          active={drawerOptionSelected === 'news'}
          onPress={() => {
            setCurrentDrawerOption('news');
            navigation.navigate('news');
          }}
        />
      </Drawer.Section>
      <Drawer.Section title="Options">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Dark theme</Text>
            <Switch value={theme === 'dark'} onChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
