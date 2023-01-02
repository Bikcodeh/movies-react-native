import React from 'react';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Movie} from '../interfaces/movieinterfaces';
import {Title} from 'react-native-paper';
import {BASE_URL_IMG} from '../utils/constants';

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
      renderItem={item => <RenderItem movie={item.item} />}
    />
  );
}
interface RenderItemProps {
  movie: Movie;
}

const RenderItem = ({movie}: RenderItemProps) => {
  const imageUrl = `${BASE_URL_IMG}/${movie.poster_path}`;
  return (
    <TouchableWithoutFeedback onPress={() => console.log(movie)}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title}>{movie.title}</Title>
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
});
