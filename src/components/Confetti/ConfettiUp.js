import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import {color} from '../../styles/Styles';

const ConfettiUp = ({startingDelay, onStop}) => {
  const deviceWidth = Dimensions.get('screen').width;

  return (
    <ConfettiCannon
      count={150}
      origin={{x: deviceWidth / 2, y: -10}}
      fadeOut
      explosionSpeed={1200}
      fallSpeed={1500}
      onAnimationEnd={onStop}
      autoStart={true}
      autoStartDelay={startingDelay}
    />
  );
};

export default ConfettiUp;
