import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {useTranslation} from 'react-i18next';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

interface MovieRatingProps {
  voteCount: number;
  voteAverage: number;
  customStyles: ViewStyle | ViewStyle[];
}

export default function MovieRating({
  voteAverage,
  voteCount,
  customStyles,
}: MovieRatingProps) {
  const {t} = useTranslation();
  const {theme} = usePreferences();
  const media = voteAverage / 2;
  return (
    <View style={[customStyles]}>
      <View style={styles.voteContainer}>
        <Rating
          readonly
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
      <Title style={{fontSize: 12}}>
        {voteCount} {t('detail.votes')}
      </Title>
    </View>
  );
}

const styles = StyleSheet.create({
  voteContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
