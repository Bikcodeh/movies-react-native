import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackNavigation';
import {BASE_URL_IMG} from '../utils/constants';

export default function Movie() {
  const movie = useRoute<RouteProp<RootStackParamList, 'movie'>>().params.movie;
  return (
    <>
      <ScrollView>
        <RenderPoster posterPath={`${movie.poster_path}`} />
      </ScrollView>
    </>
  );
}

interface RenderPosterProps {
  posterPath: string;
}

const RenderPoster = ({posterPath}: RenderPosterProps) => {
  console.log(`${BASE_URL_IMG}${posterPath}`);
  return (
    <Image
      style={styles.posterPath}
      source={{uri: `${BASE_URL_IMG}${posterPath}`}}
    />
  );
};

const styles = StyleSheet.create({
  posterPath: {
    width: '100%',
    height: 500,
  },
});
