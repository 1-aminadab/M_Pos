import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../styles/Styles';

const EditDeleteBtn = ({id, handleEditItem, handleDeleteItem}) => {
  return (
    <View
      style={{
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        // marginTop: 5,
        paddingVertical: 3,
        backgroundColor: color.lightPrimary,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
        onPress={() => handleEditItem(id)}>
        <MaterialIcons name="edit" size={22} color={color.primary} />
        <Text style={{fontSize: 16}}>Edit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
        onPress={() => handleDeleteItem(id)}>
        <Ionicons name="trash" size={24} color={color.primary} />
        <Text style={{fontSize: 16}}>Delete</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default EditDeleteBtn;
