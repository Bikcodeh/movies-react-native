import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackNavigation';
import ModalVideo from '../components/ModalVideo';
import {IconButton, Title, Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';
import {getMovieById} from '../api/moviesApi';
import usePreferences from '../hooks/usePreferences';

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
        <MovieRating
          voteAverage={movieDetail.vote_average}
          voteCount={movieDetail.vote_count}
        />
        <View style={{flexDirection: 'column', marginHorizontal: 10}}>
          <Title style={{fontSize: 16}}>Overview</Title>
          <Text>{movie.overview}</Text>
        </View>
        <Text style={{marginHorizontal: 10, marginVertical: 10}}>
          Release date: {movie.release_date}
        </Text>
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
      source={{uri: posterPath.applyImageUrl()}}
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

interface MovieRatingProps {
  voteCount: number;
  voteAverage: number;
}

const MovieRating = ({voteAverage, voteCount}: MovieRatingProps) => {
  const {theme} = usePreferences();
  const media = voteAverage / 2;
  return (
    <View style={{marginHorizontal: 10}}>
      <View style={styles.voteContainer}>
        <Rating
          type="custom"
          ratingColor="#ffc205"
          ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
          startingValue={media}
          imageSize={20}
          ratingImage={theme === 'dark' ? starDark : starLight}
          style={{marginRight: 8}}
        />
        <Text>{Math.round(media * 10) / 10}</Text>
      </View>
      <Title style={{fontSize: 12}}>{voteCount} votes</Title>
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
  voteContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overview: {
    marginHorizontal: 10,
  },
});
