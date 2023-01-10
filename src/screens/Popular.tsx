import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Title, Text, Button} from 'react-native-paper';
import {Movie} from '../interfaces/movieinterfaces';
import noImage from '../assets/png/default_image.png';
import MovieRating from '../components/RatingMovie';
import usePreferences from '../hooks/usePreferences';
import {RootStackParamList} from '../navigation/StackNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import useGetMovies from '../hooks/useGetMovies';

export default function Popular() {
  const {theme} = usePreferences();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'popular'>>();
  const {canLoadMore, movies, isLoadingMovies, nextPage} =
    useGetMovies('popular');

  return (
    <View>
      {isLoadingMovies && movies.length === 0 ? (
        <ActivityIndicator style={styles.loadingMain} size={40} />
      ) : (
        <FlatList
          data={movies}
          renderItem={({item}) => (
            <MovieItem
              key={item.id}
              movie={item}
              onClickMovie={movieItem =>
                navigation.navigate('movie', {movie: movieItem})
              }
            />
          )}
          removeClippedSubviews
          initialNumToRender={6}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <RenderFooter
              theme={theme}
              isLoadingMore={isLoadingMovies}
              showLoadMore={canLoadMore}
              onLoadMore={() => nextPage()}
            />
          }
        />
      )}
    </View>
  );
}

interface RenderFooterProps {
  onLoadMore: () => void;
  theme: string;
  isLoadingMore: boolean;
  showLoadMore: boolean;
}

const RenderFooter = ({
  onLoadMore,
  theme,
  isLoadingMore,
  showLoadMore,
}: RenderFooterProps) => {
  if (isLoadingMore) {
    return (
      <ActivityIndicator style={{display: isLoadingMore ? 'flex' : 'none'}} />
    );
  } else {
    return (
      <Button
        mode="contained-tonal"
        style={[styles.loadMore, {display: showLoadMore ? 'flex' : 'none'}]}
        onPress={() => {
          onLoadMore();
        }}
        labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}>
        <Text>Load more</Text>
      </Button>
    );
  }
};

interface MovieProps {
  movie: Movie;
  onClickMovie: (movie: Movie) => void;
}

const MovieItem = ({movie, onClickMovie}: MovieProps) => {
  return (
    <TouchableOpacity
      style={styles.movie}
      activeOpacity={0.8}
      onPress={() => onClickMovie(movie)}>
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
        <View>
          <Title numberOfLines={2}>{movie.title}</Title>
        </View>
        <Text>{movie.release_date}</Text>
        <MovieRating
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          customStyles={[]}
        />
      </View>
    </TouchableOpacity>
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
  loadMore: {
    marginBottom: 30,
    borderRadius: 0,
  },
  loadingMain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
