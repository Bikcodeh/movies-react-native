import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackNavigation';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/Navigation';
import ModalVideo from '../components/ModalVideo';
import {IconButton, Title, Text} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {getMovieById} from '../api/moviesApi';
import MovieRating from '../components/RatingMovie';

export default function Movie() {
  const {t} = useTranslation();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
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
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.id]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <RenderPoster
            posterPath={`${poster_path}`}
            onBack={() => navigation.goBack()}
          />
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
            customStyles={{marginHorizontal: 10}}
          />
          <View style={{flexDirection: 'column', marginHorizontal: 10}}>
            <Title style={{fontSize: 16}}>{t('detail.overview')}</Title>
            <Text>{movie.overview}</Text>
          </View>
          <Text style={{marginHorizontal: 10, marginVertical: 10}}>
            {t('detail.releaseDate')} {movie.release_date}
          </Text>
        </ScrollView>
      </SafeAreaView>
      <ModalVideo
        showModal={showModal}
        setShowModal={setVisibilityModal}
        videoId={movie.id}
      />
    </>
  );
}

interface BackButtonProps {
  onBack: () => void;
}

const BackButton = ({onBack}: BackButtonProps) => {
  return (
    <IconButton
      style={{position: 'absolute', marginTop: 16, marginStart: 16}}
      icon="arrow-left"
      onPress={() => onBack()}
      containerColor="#d9d9d9"
      iconColor="#8997a5"
    />
  );
};

interface RenderPosterProps {
  posterPath: string;
  onBack: () => void;
}

const RenderPoster = ({posterPath, onBack}: RenderPosterProps) => {
  return (
    <View>
      <Image
        style={styles.posterPath}
        source={{uri: posterPath.applyImageUrl()}}
        resizeMode="stretch"
      />
      <BackButton onBack={onBack} />
    </View>
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
  overview: {
    marginHorizontal: 10,
  },
});
