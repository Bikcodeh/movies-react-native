import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Movie} from '../interfaces/movieinterfaces';
import {searchMovies} from '../api/moviesApi';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/Navigation';
import {IconButton, Searchbar, TextInput} from 'react-native-paper';

export default function Search() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    return () => {
      navigation.getParent()?.setOptions({
        headerShown: true,
        headerTransparent: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchMoviesByQuery = async () => {
    try {
      const response = await searchMovies('batman');
      setMovies(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchMoviesByQuery();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <View style={{flex: 1}}>
          <Searchbar
            value={text}
            placeholder="Search your movie"
            placeholderTextColor="#8997a5"
            inputStyle={styles.input}
            elevation={0}
            onChangeText={value => setText(value)}
            style={styles.search}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    marginStart: -16,
  },
  search: {
    backgroundColor: '#D9D9D9',
    borderRadius: 60,
    marginEnd: 16,
    height: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
