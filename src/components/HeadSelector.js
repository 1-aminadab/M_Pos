import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {color} from '../styles/Styles';

const HeadSelector = ({label, value, state, setState, py}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: state == label ? color.lightBlue : 'transparent',
        paddingVertical: py ? py : 4,
        paddingHorizontal: 15,
        borderRadius: 10,
      }}
      onPress={() => setState && setState(label)}>
      <Text
        style={
          state == label ? styles.selectedHeadText : styles.unselectedHeadText
        }>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unselectedHeadText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'gray',
  },
  selectedHeadText: {
    fontSize: 17,
    fontWeight: '600',
    color: color.secondary,
  },
});

export default HeadSelector;
