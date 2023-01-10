import React from 'react';
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import useGetMovies from '../hooks/useGetMovies';
import {Movie} from '../interfaces/movieinterfaces';
import {RootStackParamList} from '../navigation/StackNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import RenderFooter from '../components/FooterLoadMore';

const {width} = Dimensions.get('window');

export default function News() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'news'>>();
  const {canLoadMore, movies, nextPage, isLoadingMovies} =
    useGetMovies('now_playing');
  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MovieItem
            movie={item}
            onClickMovie={movie => navigation.navigate('movie', {movie})}
          />
        )}
        maxToRenderPerBatch={15}
        initialNumToRender={15}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={
          <RenderFooter
            isLoadingMore={isLoadingMovies}
            showLoadMore={canLoadMore}
            onLoadMore={() => nextPage()}
          />
        }
      />
    </View>
  );
}

interface MovieItemProps {
  movie: Movie;
  onClickMovie: (movie: Movie) => void;
}

const MovieItem = ({movie, onClickMovie}: MovieItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onClickMovie(movie)}>
      <Image
        style={styles.movieItem}
        source={{uri: movie.poster_path.applyImageUrl()}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    width: width / 3,
    height: 200,
  },
});
