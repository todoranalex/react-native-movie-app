import React from 'react';
import Router from './components/Router';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export default (): JSX.Element => {
  return <Router />;
};
