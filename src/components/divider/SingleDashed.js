import {View, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '../../styles/Styles';

const SingleDashed = () => {
  return <View style={styles.lineStyle} />;
};

const styles = StyleSheet.create({
  lineStyle: {
    borderBottomWidth: 1.5,
    marginVertical: 5,
    borderColor: color.outline,
    // borderStyle: 'dashed',
  },
});

export default SingleDashed;
