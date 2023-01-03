import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
import {Movie} from '../interfaces/movieinterfaces';
import {RootStackParamList} from '../navigation/StackNavigation';
import {BASE_URL_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.3);

interface Props {
  movies: Movie[];
}

export default function CarouselMulti({movies}: Props) {
  return (
    <Carousel
      layout="default"
      sliderWidth={width}
      data={movies}
      itemWidth={ITEM_WIDTH}
      activeSlideAlignment="start"
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      initialNumToRender={7}
      renderItem={item => <RenderItem movie={item.item} />}
    />
  );
}

interface RenderItemProps {
  movie: Movie;
}

const RenderItem = ({movie}: RenderItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const imageUrl = `${BASE_URL_IMG}/${movie.poster_path}`;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('movie', {movie})}>
      <View>
        <View style={styles.card}>
          <Image style={styles.image} source={{uri: imageUrl}} />
        </View>
        <View>
          <Title style={styles.cardTitle} numberOfLines={1}>
            {movie.title}
          </Title>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 8,
    shadowColor: '#000',
    overflow: 'visible',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 4,
    borderRadius: 5,
    padding: 1,
    marginHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 20,
  },
  cardTitle: {
    marginTop: 2,
    marginHorizontal: 8,
    fontSize: 16,
  },
});
