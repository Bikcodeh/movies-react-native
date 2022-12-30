import React, {useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import {Drawer, Text, Switch, TouchableRipple} from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

export default function DrawerContent(props) {
  const {theme, ToggleTheme} = usePreferences();
  console.log(theme, ToggleTheme);
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
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({});
