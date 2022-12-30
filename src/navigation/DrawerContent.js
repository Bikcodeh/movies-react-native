import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { Drawer, Text, Switch, TouchableRipple } from 'react-native-paper';

export default function DrawerContent(props) {
    const { navigation } = props;
    console.log(navigation);
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label='Home'
                    onPress={() => navigation.navigate('news')}
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({})