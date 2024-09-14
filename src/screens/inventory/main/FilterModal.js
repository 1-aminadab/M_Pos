import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../../styles/Styles';
import {RadioButton} from 'react-native-paper';

const FilterModal = ({
  modalVisibility,
  setModalVisibility,
  filteredResult,
  setFilteredResult,
}) => {
  const handleRadioCheck = radio => {
    setFilteredResult(radio);
    setModalVisibility(true);
  };

  function FilterList({name}) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //   borderWidth: 1,
          marginLeft: -12,
        }}
        onPress={() => handleRadioCheck(name)}>
        <RadioButton
          color={color.primary}
          value={filteredResult}
          status={filteredResult === name ? 'checked' : 'unchecked'}
          onPress={() => handleRadioCheck(name)}
        />
        <Text style={{fontSize: 18, color: color.Neutral_60}}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(!modalVisibility);
      }}>
      {/* Outer Modal Part  */}
      <TouchableWithoutFeedback onPress={() => setModalVisibility(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          {/* Inner Modal Part  */}
          <TouchableWithoutFeedback>
            <View
              style={{
                width: '70%',
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingVertical: 25,
                paddingHorizontal: 30,
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>Filter</Text>
              </View> */}
              <View style={{marginTop: 20, gap: 8}}>
                <FilterList name={'All'} />
                <FilterList name={'In Stock'} />
                <FilterList name={'Out of Stock'} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
