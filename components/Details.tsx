import {Image, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

export default ({route}) => {
  const {movie} = route.params;
  return (
    <Image
      resizeMode={'cover'}
      source={{uri: movie.art}}
      style={{
        height: height / 2,
        width,
      }}
    />
  );
};
