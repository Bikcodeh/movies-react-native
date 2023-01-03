import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import useNewMovies from '../hooks/useNewMovies';
import {ActivityIndicator, Text, Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigation';
import {Genre, Movie} from '../interfaces/movieinterfaces';
import {getGenres, getMoviesByGenre} from '../api/moviesApi';
import PreferencesContext from '../context/PreferencesContext';
import axios, {AxiosError} from 'axios';

const ACTION_GENRE_ID: number = 28;

interface Props extends NativeStackScreenProps<RootStackParamList> {}

export default function Home(props: Props) {
  const {navigation} = props;
  const {isLoading, newMovies} = useNewMovies();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [genreSelected, setGenreSelected] = useState<number>(ACTION_GENRE_ID);
  console.log(moviesByGenre);
  const onGenreSelected = (genreId: number) => {
    setGenreSelected(genreId);
  };
  const {theme} = useContext(PreferencesContext);

  useEffect(() => {
    getGenres().then(data => setGenres(data));
  }, []);

  useEffect(() => {
    getMoviesByGenre(genreSelected)
      .then(data => setMoviesByGenre(data))
      .catch(err => {
        const error = err as Error | AxiosError;
        if (!axios.isAxiosError(error)) {
          /*TODO: handle error */
        } else {
          /**TODO: handle error */
        }
      });
  }, [genreSelected]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          animating={true}
          size="large"
        />
      )}
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>New Movies</Title>
          <CarouselVertical movies={newMovies} navigation={navigation} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Genre</Title>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {genres &&
            genres.map(genre => (
              <Text
                style={[
                  styles.genre,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      genre.id !== genreSelected
                        ? '#8697a5'
                        : theme === 'dark'
                        ? '#fff'
                        : 'black',
                  },
                ]}
                key={genre.id}
                onPress={() => onGenreSelected(genre.id)}>
                {genre.name}
              </Text>
            ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 16,
  },
  newsTitle: {
    marginBottom: 16,
    marginHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 22,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
  genres: {
    marginTop: 10,
    marginBottom: 50,
    marginStart: 16,
  },
  genresTitle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  genre: {
    marginRight: 16,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});
