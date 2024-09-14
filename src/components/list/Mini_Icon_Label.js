import {View, Text} from 'react-native';
import React from 'react';
import {color} from '../../styles/Styles';

const Mini_Icon_Label = ({icon, label, labelColor = color.gray}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
      {icon}
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: labelColor,
        }}>
        {label}
      </Text>
    </View>
  );
};

export default Mini_Icon_Label;
