import React from 'react';
import { TouchableOpacity, Text, StyleSheet , View} from 'react-native';
import { color } from '../../../styles/Styles';

const TabButton = ({ label, onPress, isActive }) => {
  const buttonStyle = isActive ? styles.activeButton : styles.inactiveButton;
  const labelStyle = isActive ? styles.activeLabel : styles.inactiveLabel;

  return (

    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flex: 1,

  },
  activeButton: {
    backgroundColor: color.primary, 
  },
  activeLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: color.Neutral_60,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TabButton;
