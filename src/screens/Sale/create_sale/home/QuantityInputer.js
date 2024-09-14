import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import CustomModal from '../../../../components/modal/CustomModal';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../../../../styles/Styles';
import Button from '../../../../components/button/Button';
import numberFormater from '../../../../utilities/numberFormater/numberFormater';

const QuantityInputer = ({
  itemData,
  modalVisibility,
  setModalVisibility,
  handleAdd,
  quantity,
  handleIncrement,
  handleDecrement,
  handleQtyInput,
}) => {


  return (
    <CustomModal
      innerModal={
        <View
          style={{
            minHeight: 250,
            borderRadius: 10,
            padding: 20,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              {itemData?.name}
            </Text>
            <Text style={{fontSize: 14, color: color.green, fontWeight: '500'}}>
              {numberFormater(itemData?.price)} ETB
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleDecrement}>
              <Entypo name="minus" size={28} color={color.secondary} />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: color.lightBlue,
                marginHorizontal: 10,
                width: 100,
                borderRadius: 5,
              }}>
              <TextInput
                style={{fontSize: 24, fontWeight: '500', textAlign: 'center'}}
                value={
                  quantity > 0 ? quantity.toString() : quantity === 0 ? '0' : ''
                }
                onChangeText={num => handleQtyInput(num)}
                keyboardType="number-pad"
              />
            </View>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleIncrement}>
              <Entypo name="plus" size={28} color={color.secondary} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', gap: 10, marginTop: 25}}>
            <View style={{flex: 1}}>
              <Button
                theme={'primary'}
                label={'Add'}
                height={50}
                onPress={() => {
                  handleAdd();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                theme={'secondary'}
                label={'cancel'}
                height={50}
                onPress={() => setModalVisibility(false)}
              />
            </View>
          </View>
        </View>
      }
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    />
  );
};

const styles = StyleSheet.create({
  circleButton: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: color.lightBlue,
  },

  arrowBoxContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: color.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default QuantityInputer;
