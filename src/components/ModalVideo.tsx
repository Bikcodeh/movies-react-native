import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Dimensions, StyleSheet, Platform} from 'react-native';
import {Modal, IconButton, ActivityIndicator} from 'react-native-paper';
import Youtube from 'react-native-youtube';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/Navigation';
import {RootStackParamList} from '../navigation/StackNavigation';
import {getVideosByMovieId} from '../api/moviesApi';
import {Video} from '../interfaces/movieinterfaces';
import {YT_KEY} from '../utils/constants';

const {height: heightWindow} = Dimensions.get('window');

interface Props {
  showModal: boolean;
  videoId: number;
  setShowModal: () => void;
}

export default function ModalVideo({showModal, setShowModal, videoId}: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'movie'>>();
  const [video, setVideo] = useState<string>('');
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);

  const getVideosFromMovieById = async (movieId: number) => {
    try {
      const data = await getVideosByMovieId(movieId);
      setVideoForState(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setVideoForState = (data: Video[]) => {
    let result: string = '';
    data.forEach(videoItem => {
      if (videoItem.site === 'YouTube' && result === '') {
        result = videoItem.key;
      }
    });
    setVideo(result || '');
    setIsLoadingVideo(false);
  };

  useEffect(() => {
    getVideosFromMovieById(videoId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  useEffect(() => {
    if (showModal && route.name === 'movie') {
      navigation.getParent()?.setOptions({
        headerShown: !showModal,
        headerTransparent: showModal,
      });
    } else if (!showModal && route.name === 'movie') {
      navigation.getParent()?.setOptions({
        headerShown: true,
        headerTransparent: true,
      });
    }
    return () => {
      navigation.getParent()?.setOptions({
        headerShown: true,
        headerTransparent: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);
  return (
    <Modal visible={showModal} contentContainerStyle={styles.modal}>
      {isLoadingVideo ? (
        <ActivityIndicator size={40} />
      ) : Platform.OS === 'ios' ? (
        <Youtube
          videoId={video}
          style={styles.youtube}
          apiKey={YT_KEY}
          onError={error => console.log(error)}
        />
      ) : (
        <Youtube
          videoId={video}
          style={styles.youtube}
          apiKey={YT_KEY}
          onError={error => console.log(error)}
          fullscreen
        />
      )}
      <IconButton
        icon="close"
        iconColor="#fff"
        onPress={() => setShowModal()}
        style={styles.closeModal}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: heightWindow,
    alignItems: 'center',
  },
  closeModal: {
    height: 50,
    width: 50,
    borderRadius: 100,
    bottom: 100,
    position: 'absolute',
    backgroundColor: '#1ea1f2',
  },
  youtube: {
    alignSelf: 'stretch',
    height: 300,
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'black',
  },
});
