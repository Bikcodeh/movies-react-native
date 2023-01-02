import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import useNewMovies from '../hooks/useNewMovies';

export default function Home() {
  const { isLoading, newMovies, hasError } = useNewMovies();  
  return (
    <View>
      {newMovies.map(movie => <Text key={movie.id}>{movie.title}</Text>)}
    </View>
  );
}
