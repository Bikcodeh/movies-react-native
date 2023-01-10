import React from 'react';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import usePreferences from '../hooks/usePreferences';

interface RenderFooterProps {
  onLoadMore: () => void;
  isLoadingMore: boolean;
  showLoadMore: boolean;
}

export default function RenderFooter({
  onLoadMore,
  isLoadingMore,
  showLoadMore,
}: RenderFooterProps): JSX.Element {
  const {theme} = usePreferences();
  if (isLoadingMore) {
    return (
      <ActivityIndicator style={{display: isLoadingMore ? 'flex' : 'none'}} />
    );
  } else {
    return (
      <Button
        mode="contained-tonal"
        style={[styles.loadMore, {display: showLoadMore ? 'flex' : 'none'}]}
        onPress={() => {
          onLoadMore();
        }}
        labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}>
        <Text>Load more</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  loadMore: {
    marginBottom: 30,
    borderRadius: 0,
  },
});
