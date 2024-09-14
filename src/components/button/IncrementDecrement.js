import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation  from 'react-native-vector-icons/Foundation';
import { color, textStyles } from '../../styles/Styles';
import { scale } from 'react-native-size-matters';

const IncrementDecrement = ({
  qty,
  id,
  index,
  handleEventOnBlur,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
}) => {
  return (
    <View
      style={{
        
        flexDirection: 'row',
        height: 47,
        alignItems: 'center',
        justifyContent: 'space-around',    
      }}>
      <TouchableOpacity
        style={{backgroundColor: color.lightPrimary,borderRadius:20, paddingHorizontal:10, paddingVertical:8}}
        onPress={() => qty && handleQtyDecrement(id, index)}>
        <Foundation  
          name="minus"
          size={20}
          color={qty > 1 ? color.white : 'gray'}
        />
      </TouchableOpacity>
      <TextInput
        style={[textStyles.text_regular,{
          fontSize: scale(18),
          textAlign: 'center',
          marginHorizontal: 5,
          minWidth: 35,
          backgroundColor: '#f9f9f9',
          borderRadius: 5,
          color: '#000',
        }]}
        value={qty > 0 ? qty.toString() : qty === 0 ? '0' : ''}
        onChangeText={num => handleQuantityInput(id, num, index)}
        onBlur={() => handleEventOnBlur(id)}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={{backgroundColor: color.lightPrimary,borderRadius:25,  paddingHorizontal:10, paddingVertical:8}} onPress={() => handleQtyIncrement(id, index)}>
        <Foundation name="plus" size={20} color={color.white} />
      </TouchableOpacity>
    </View>
  );
};

export default IncrementDecrement;
