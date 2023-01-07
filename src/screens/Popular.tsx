import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {getPopularMovies} from '../api/moviesApi';
import {Movie} from '../interfaces/movieinterfaces';
import axios, {AxiosError} from 'axios';
import {ActivityIndicator} from 'react-native-paper';

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
  console.log(movies);

  return (
    <View>
      {isLoadingMovies ? (
        <ActivityIndicator
          size={30}
          style={{alignContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <View>
          <Text>Hola Popular</Text>
        </View>
      )}
    </View>
  );
}
