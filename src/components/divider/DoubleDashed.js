import {View, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '../../styles/Styles';

const DoubleDashed = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.lineStyle} />
      <View style={styles.lineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  lineStyle: {
    borderBottomWidth: 1.5,
    marginVertical: 1,
    borderColor: color.gray,
    borderStyle: 'dashed',
  },
});

export default DoubleDashed;
