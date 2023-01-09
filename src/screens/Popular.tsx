import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import axios, {AxiosError} from 'axios';
import {ActivityIndicator, Title, Text, Button} from 'react-native-paper';
import {getPopularMovies} from '../api/moviesApi';
import {Movie} from '../interfaces/movieinterfaces';
import noImage from '../assets/png/default_image.png';
import MovieRating from '../components/RatingMovie';
import usePreferences from '../hooks/usePreferences';

export default function Popular() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const {theme} = usePreferences();

  const getPopular = async () => {
    try {
      const response = await getPopularMovies(page);
      if (page <= response.total_pages) {
        setShowLoadMore(true);
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowLoadMore(false);
      }
      setIsLoadingMovies(false);
      setIsLoadingMore(false);
    } catch (err) {
      setIsLoadingMore(false);
      setIsLoadingMovies(false);
      const error = err as Error | AxiosError;
      if (!axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <View>
      {isLoadingMovies ? (
        <ActivityIndicator
          size={30}
          style={{alignContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <FlatList
          data={movies}
          renderItem={item => <MovieItem movie={item.item} />}
          initialNumToRender={10}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <RenderFooter
              theme={theme}
              isLoadingMore={isLoadingMore}
              showLoadMore={showLoadMore}
              onLoadMore={() => {
                setIsLoadingMore(true);
                setPage(page + 1);
              }}
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
  loadMore: {
    marginBottom: 30,
    borderRadius: 0,
  },
});
