import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackNavigation';
import {BASE_URL_IMG} from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import {IconButton} from 'react-native-paper';

export default function Movie() {
  const movie = useRoute<RouteProp<RootStackParamList, 'movie'>>().params.movie;
  const [showModal, setShowModal] = useState(false);

  const setVisibilityModal = () => {
    setShowModal(state => !state);
  };
  return (
    <>
      <ScrollView>
        <RenderPoster posterPath={`${movie.poster_path}`} />
        <MovieTrailer setShowVideo={setVisibilityModal} />
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
});
