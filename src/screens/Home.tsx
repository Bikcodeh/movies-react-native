import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import axios, {AxiosError} from 'axios';
import {ActivityIndicator, Text, Title} from 'react-native-paper';

import useNewMovies from '../hooks/useNewMovies';
import CarouselVertical from '../components/CarouselVertical';
import {Genre, Movie} from '../interfaces/movieinterfaces';
import {getGenres, getMoviesByGenre} from '../api/moviesApi';
import PreferencesContext from '../context/PreferencesContext';
import CarouselMulti from '../components/CarouselMulti';

const ACTION_GENRE_ID: number = 28;

export default function Home() {
  const {isLoading, newMovies} = useNewMovies();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [genreSelected, setGenreSelected] = useState<number>(ACTION_GENRE_ID);
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
          <CarouselVertical movies={newMovies} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Genre</Title>
        <FlatList
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          horizontal
          nestedScrollEnabled
          data={genres}
          renderItem={item => (
            <GenreTextItem
              id={item.item.id}
              genreSelectedId={genreSelected}
              theme={theme}
              onGenreSelected={onGenreSelected}
              name={item.item.name}
            />
          )}
        />
        <CarouselMulti movies={moviesByGenre} />
      </View>
    </ScrollView>
  );
}

interface GenreTextItemProps {
  id: number;
  genreSelectedId: number;
  name: string;
  theme: string;
  onGenreSelected: (genreId: number) => void;
}

const GenreTextItem = ({
  id,
  genreSelectedId,
  name,
  theme,
  onGenreSelected,
}: GenreTextItemProps) => {
  return (
    <Text
      style={[
        styles.genre,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          color:
            id !== genreSelectedId
              ? '#8697a5'
              : theme === 'dark'
              ? '#fff'
              : 'black',
        },
      ]}
      key={id}
      onPress={() => onGenreSelected(id)}>
      {name}
    </Text>
  );
};

const styles = StyleSheet.create({
  news: {
    marginTop: 16,
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
    marginTop: 4,
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
