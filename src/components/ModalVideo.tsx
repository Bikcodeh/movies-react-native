import React, {useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Dimensions, StyleSheet} from 'react-native';
import {Modal, Title, IconButton} from 'react-native-paper';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../navigation/Navigation';
import {RootStackParamList} from '../navigation/StackNavigation';

const {height: heightWindow} = Dimensions.get('window');

interface Props {
  showModal: boolean;
  setShowModal: () => void;
}

export default function ModalVideo({showModal, setShowModal}: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'movie'>>();
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
      <Title>Hola</Title>
      <IconButton
        icon="close"
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
});
