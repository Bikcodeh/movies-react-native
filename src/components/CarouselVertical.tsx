import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Movie} from '../interfaces/movieinterfaces';
import {Text, Title} from 'react-native-paper';
import {BASE_URL_IMG} from '../utils/constants';
import {getGenresByMovie} from '../api/moviesApi';
import axios, {AxiosError} from 'axios';
import {RootStackParamList} from '../navigation/StackNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WINDOW_WIDTH * 0.7);

interface Props {
  movies: Movie[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function CarouselVertical(props: Props) {
  return (
    <Carousel
      layout="default"
      data={props.movies}
      sliderWidth={WINDOW_WIDTH}
      itemWidth={ITEM_WIDTH}
      renderItem={item => {
        return <RenderItem movie={item.item} navigation={props.navigation} />;
      }}
    />
  );
}
interface RenderItemProps {
  movie: Movie;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const RenderItem = ({movie, navigation}: RenderItemProps) => {
  const [genres, setGenres] = useState<string[]>([] as string[]);

  useEffect(() => {
    getGenresByMovie(movie.genre_ids)
      .then(data => setGenres(data))
      .catch(err => {
        const error = err as Error | AxiosError;
        if (!axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
      });
  }, [movie]);

  const imageUrl = `${BASE_URL_IMG}/${movie.poster_path}`;
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('movie', {movie})}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title}>{movie.title}</Title>
        <View style={styles.genres}>
          {genres &&
            genres.map((genre, index) => {
              return (
                <Text key={index} style={styles.genre}>
                  {genre}
                  {index !== genres.length - 1 && ', '}
                </Text>
              );
            })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: '#8997a5',
  },
});
