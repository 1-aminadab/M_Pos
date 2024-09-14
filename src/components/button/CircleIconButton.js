import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CircleIconButton = ({size, icon, padding, bgColor, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        borderRadius: size,
        padding: padding ? padding : 3,
        width: size,
        height: size,
      }}
      onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default CircleIconButton;
