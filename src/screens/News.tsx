import React from 'react';
import {FlatList, View} from 'react-native';
import useGetMovies from '../hooks/useGetMovies';
import {RootStackParamList} from '../navigation/StackNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import RenderFooter from '../components/FooterLoadMore';
import MovieItem from '../components/MovieItem';

export default function News() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'news'>>();
  const {canLoadMore, movies, nextPage, isLoadingMovies} =
    useGetMovies('now_playing');
  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <MovieItem
            movie={item}
            onClickMovie={movie => navigation.navigate('movie', {movie})}
          />
        )}
        maxToRenderPerBatch={15}
        initialNumToRender={15}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={
          <RenderFooter
            isLoadingMore={isLoadingMovies}
            showLoadMore={canLoadMore}
            onLoadMore={() => nextPage()}
          />
        }
      />
    </View>
  );
}
