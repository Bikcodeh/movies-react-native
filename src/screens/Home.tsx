import React, { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import useNewMovies from '../hooks/useNewMovies';
import { Title } from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';

export default function Home() {
  const { isLoading, newMovies, hasError } = useNewMovies();  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        newMovies && (
          <View style={styles.news}>
              <Title style={styles.newsTitle}>New Movies</Title>
              <CarouselVertical movies={newMovies}/>
          </View>
        )
      }
      {newMovies.map(movie => <Text key={movie.id}>{movie.title}</Text>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 16
  },
  newsTitle: {
    marginBottom: 16,
    marginHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 22
  }
})
