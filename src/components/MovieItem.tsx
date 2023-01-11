import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import {Movie} from '../interfaces/movieinterfaces';
import noImage from '../assets/png/default_image.png';

const {width} = Dimensions.get('window');

interface MovieItemProps {
  movie: Movie;
  onClickMovie: (movie: Movie) => void;
}

export default function MovieItem({movie, onClickMovie}: MovieItemProps) {
  const {poster_path} = movie;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onClickMovie(movie)}>
      <Image
        style={styles.movieItem}
        source={poster_path ? {uri: poster_path.applyImageUrl()} : noImage}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    width: width / 3,
    height: 200,
  },
});
