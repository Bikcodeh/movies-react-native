import React from 'react';
import {Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/StackNavigation';

export default function Movie() {
  const route = useRoute<RouteProp<RootStackParamList, 'movie'>>();
  console.log(route.params.movie);
  return (
    <View>
      <Text>Hola Movie</Text>
    </View>
  );
}
