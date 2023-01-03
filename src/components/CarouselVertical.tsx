import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios, {AxiosError} from 'axios';
import Carousel from 'react-native-snap-carousel';
import {Text, Title} from 'react-native-paper';

import {Movie} from '../interfaces/movieinterfaces';
import {BASE_URL_IMG} from '../utils/constants';
import {getGenresByMovie} from '../api/moviesApi';
import {RootStackParamList} from '../navigation/StackNavigation';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WINDOW_WIDTH * 0.7);

interface Props {
  movies: Movie[];
}

export default function CarouselVertical(props: Props) {
  return (
    <Carousel
      layout="default"
      data={props.movies}
      sliderWidth={WINDOW_WIDTH}
      itemWidth={ITEM_WIDTH}
      renderItem={item => {
        return <RenderItem movie={item.item} />;
      }}
    />
  );
}
interface RenderItemProps {
  movie: Movie;
}

const RenderItem = ({movie}: RenderItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('movie', {movie})}>
      <View>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: imageUrl}} />
          </View>
        </View>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 12,
    height: 450,
    shadowColor: 'rgba(0, 0, 0, 0.9)',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
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
