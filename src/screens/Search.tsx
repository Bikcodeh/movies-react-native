import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {Movie} from '../interfaces/movieinterfaces';
import {searchMovies} from '../api/moviesApi';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/Navigation';
import {IconButton, Searchbar} from 'react-native-paper';
import MovieItem from '../components/MovieItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigation';
import usePreferences from '../hooks/usePreferences';

export default function Search() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const navigationStack =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'search'>>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [text, setText] = useState('');
  const {theme} = usePreferences();

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
      const response = await searchMovies(text);
      setMovies(response.results);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(movies);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        <View style={{flex: 1}}>
          <Searchbar
            value={text}
            placeholder="Search your movie"
            placeholderTextColor="#8997a5"
            inputStyle={[
              styles.input,
              {color: theme === 'dark' ? '#292d31' : undefined},
            ]}
            elevation={0}
            iconColor="#8997a5"
            onChangeText={value => setText(value)}
            style={styles.search}
            onSubmitEditing={_ => searchMoviesByQuery()}
            returnKeyType="search"
            keyboardType="default"
          />
        </View>
      </View>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MovieItem
            movie={item}
            onClickMovie={movie => navigationStack.navigate('movie', {movie})}
          />
        )}
        maxToRenderPerBatch={15}
        initialNumToRender={15}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{marginBottom: 16}}
      />
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
