import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackNavigation';
import {BASE_URL_IMG} from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import {IconButton, Title, Text} from 'react-native-paper';
import {getMovieById} from '../api/moviesApi';

export default function Movie() {
  const movie = useRoute<RouteProp<RootStackParamList, 'movie'>>().params.movie;
  const [showModal, setShowModal] = useState(false);
  const [movieDetail, setMovieDetail] = useState(movie);
  const {poster_path, title, genres} = movieDetail;

  const setVisibilityModal = () => {
    setShowModal(state => !state);
  };

  const getMovie = async () => {
    try {
      const result = await getMovieById(movie.id);
      setMovieDetail(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.id]);

  return (
    <>
      <ScrollView>
        <RenderPoster posterPath={`${poster_path}`} />
        <MovieTrailer setShowVideo={setVisibilityModal} />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.genres}>
          {genres &&
            genres.map((genre, index) => {
              return (
                <Text key={genre.id} style={styles.genre}>
                  {genre.name}
                  {index !== genres.length - 1 && ', '}
                </Text>
              );
            })}
        </View>
      </ScrollView>
      <ModalVideo
        showModal={showModal}
        setShowModal={setVisibilityModal}
        videoId={movie.id}
      />
    </>
  );
}

interface RenderPosterProps {
  posterPath: string;
}

const RenderPoster = ({posterPath}: RenderPosterProps) => {
  return (
    <Image
      style={styles.posterPath}
      source={{uri: `${BASE_URL_IMG}${posterPath}`}}
    />
  );
};

interface MovieTrailerProps {
  setShowVideo: () => void;
}

const MovieTrailer = ({setShowVideo}: MovieTrailerProps) => {
  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        iconColor="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  posterPath: {
    width: '100%',
    height: 500,
  },
  play: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#fff',
    marginEnd: 30,
    marginTop: -35,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    marginHorizontal: 10,
    marginTop: 0,
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
