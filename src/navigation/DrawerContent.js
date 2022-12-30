import React, {useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import {Drawer, Text, Switch, TouchableRipple} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {
  const {theme, toggleTheme} = usePreferences();
  const [isActive, setisActive] = useState('home');
  const {navigation} = props;
  const onChangeScreen = screen => {
    navigation.navigate(screen);
    setisActive(screen);
  };
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Home"
          active={isActive === 'home'}
          onPress={() => onChangeScreen('home')}
        />
        <Drawer.Item
          label="Popular"
          active={isActive === 'popular'}
          onPress={() => onChangeScreen('popular')}
        />
        <Drawer.Item
          label="News"
          active={isActive === 'news'}
          onPress={() => onChangeScreen('news')}
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
