import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {color} from '../../styles/Styles';

const AvatarCircle = ({source, size, borderColor, borderSize, onPress}) => {
  return (
    <TouchableOpacity //User Avatar
      style={{
        width: size,
        height: size,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: borderSize ? borderSize : 2,
        borderColor: borderColor ? borderColor : color.lightPrimary,
      }}
      onPress={onPress}>
      <Image
        source={source}
        style={{width: '100%', height: '100%'}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default AvatarCircle;
