import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import useNewMovies from '../hooks/useNewMovies';
import {Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/StackNavigation';

interface Props extends NativeStackScreenProps<RootStackParamList> {}

export default function Home(props: Props) {
  const {navigation} = props;
  const {isLoading, newMovies, hasError} = useNewMovies();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>New Movies</Title>
          <CarouselVertical movies={newMovies} navigation={navigation} />
        </View>
      )}
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
});
