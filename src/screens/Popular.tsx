import React, {useState, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import axios, {AxiosError} from 'axios';
import {ActivityIndicator, Title, Text} from 'react-native-paper';
import {getPopularMovies} from '../api/moviesApi';
import {Movie} from '../interfaces/movieinterfaces';
import noImage from '../assets/png/default_image.png';
import MovieRating from '../components/RatingMovie';

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  const getPopular = async (page: number) => {
    try {
      const response = await getPopularMovies(page);
      setMovies(response.results);
      setIsLoadingMovies(false);
    } catch (err) {
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPopular(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      {isLoadingMovies ? (
        <ActivityIndicator
          size={30}
          style={{alignContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View>
          {movies.map(movie => (
            <MovieItem movie={movie} key={movie.id} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

interface MovieProps {
  movie: Movie;
}

const MovieItem = ({movie}: MovieProps) => {
  return (
    <View style={styles.movie}>
      <View style={styles.left}>
        <Image
          style={styles.image}
          source={
            movie.poster_path
              ? {uri: movie.poster_path.applyImageUrl()}
              : noImage
          }
        />
      </View>
      <View style={styles.right}>
        <View style={{}}>
          <Title numberOfLines={2}>{movie.title}</Title>
        </View>
        <Text>{movie.release_date}</Text>
        <MovieRating
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          customStyles={[]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 8,
  },
  right: {
    flexGrow: 1,
    flex: 1,
  },
  image: {
    width: 100,
    height: 150,
  },
});
