import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomModal from '../../../components/modal/CustomModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { color, textStyles } from '../../../styles/Styles';
import Button from '../../../components/button/Button';
import DatePicker from 'react-native-date-picker'
import CustomTextInput from '../../../components/input/CustomTextInput';
import BottomModal from '../../../components/modal/BottomModal';


const StockModal = ({
  data,
  modalVisibility,
  setModalVisibility,
  handleSave,
  handleCancel,
  setUpdatedQuantity,
  setUpdatedCost,
  setUpdatedPrice,
  itemData
}) => {

  const { quantity = 0, cost = null, price = 0, name = "", sales = 0 } = data || {};
 
   const [inputValue, setInputValue] = useState(quantity);
   const [errorInput, setErrorInput] = useState(false);
   const inputRef = useRef(null);

  function handleIncrement() {
    setErrorInput(false);
    setInputValue(cur => cur + 1);
    setUpdatedQuantity(cur => cur + 1);
  }
  console.log("the input", inputValue);
  function handleDecrement() {
    if (inputValue > 0) {
      setInputValue(cur => cur - 1);
      setUpdatedQuantity(cur => cur - 1);
      setErrorInput(false);
    }
  }

  function handleManualInput(val) {
    setErrorInput(false);
    const _InputValue = parseInt(val);
    setInputValue(_InputValue);
    setUpdatedQuantity(_InputValue);
  }

  function handleOnSave() {
    handleSave(), setInputValue(0);
    console.log("handle input" ,  inputValue);
    if (!isNaN(parseInt(inputValue)) && parseInt(inputValue) > 0) {
      setInputValue(inputValue)
    } else {
      setErrorInput(true);
    }
  }

  function handleOnCancel() {
    handleCancel();
    setInputValue(0);
  }
  const today = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    return currentDate

  }
  

  useEffect(()=>{
    if (inputRef.current) {
      inputRef.current.focus();
    }
    },[])
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <BottomModal
    modalVisible={modalVisibility}
    setModalVisible={setModalVisibility}
      innerModal={
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            padding: 20,
            backgroundColor: '#fff',
          }}>
          {/* <View style={{ alignItems: 'center', gap: 5 }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{data?.name}</Text>
            <Text style={{ fontSize: 16 }}>Stock In</Text>
          </View> */}
          <View style={[{flexDirection:'row', justifyContent:"space-between", alignItems:'center'}]}>
            <Text style={textStyles.text_bold}>Updating Quantity</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleDecrement}>
              <Entypo name="minus" size={28} color={color.white} />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: color.lightBlue,
                borderColor:color.outline,
                borderWidth:1,
                marginHorizontal: 10,
                
                borderRadius: 5,
              }}>
              <TextInput
                ref={inputRef}
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  textAlign: 'center',
                  borderBottomWidth: errorInput ? 3 : 0,
                  borderColor: color.primary,
                  paddingVertical:0
                }}
                value={
                  inputValue > 0
                    ? inputValue?.toString()
                    : inputValue === 0
                      ? `0`
                      : `${quantity}`
                }
                onChangeText={num => handleManualInput(num)}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleIncrement}>
              <Entypo name="plus" size={28} color={color.white} />
            </TouchableOpacity>
          </View>
          </View>
          <Text
            style={{
              display: errorInput ? 'flex' : 'none',
              textAlign: 'center',
              marginTop: 5,
              color: color.primary,
            }}>
            Error input value!
          </Text>
          <View style={{ marginTop: 5, marginBottom: 15, gap: 8 }}>
            <View style={[{flexDirection:'row', width:'100%', justifyContent:"space-between"}]}>
            <View style={[{width:'48%'}]}>
              
               <CustomTextInput
                                    paddingVertical={5}
                                    label={'Cost'}
                                    // optional={true}
                                    placeholder={`${cost}`}
                                    // input={varientcoll.find(obj => obj.optionName === "SellingPrice").optionValue}
                                    setInput={input => {
                                      setUpdatedCost(input)
                                      // updateVariantConstants("SellingPrice", input)
                                      // setInputError({ ...inputError, variantSellingPrice: '' });
                                    }}
                                    // error={inputError?.variantSellingPrice}
                                    keyboardType={'phone-pad'}
                                    // handleFocus={() => setvisibleList('flex')}
                                  />
            </View>
            <View style={[{width:'48%'}]}>
              
               <CustomTextInput
                                    paddingVertical={5}
                                    label={'Selling Price'}
                                    // optional={true}
                                    placeholder={`${price}`}
                                    // input={varientcoll.find(obj => obj.optionName === "SellingPrice").optionValue}
                                    setInput={input => {
                                      setUpdatedPrice(input)
                                      // updateVariantConstants("SellingPrice", input)
                                      // setInputError({ ...inputError, variantSellingPrice: '' });
                                    }}
                                    // error={inputError?.variantSellingPrice}
                                    keyboardType={'phone-pad'}
                                    // handleFocus={() => setvisibleList('flex')}
                                  />
            </View>
            
            </View>
              {/* <TouchableOpacity onPress={() => setOpen(true)} style={{
              borderBottomWidth: 1,
              borderColor: color.secondary,
              paddingBottom: 0,
              paddingTop:10

            }}>
              <Text style={[{padding:5}]}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity> */}
            {/* <DatePicker
              modal
              open={open}
              date={date}
              mode={'date'}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            /> */}
            {/* <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: color.secondary,
                paddingBottom: 0,
              }}
              placeholder="Reference (optional)"
            /> */}
            {/* <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: color.secondary,
                paddingBottom: 0,
              }}
              placeholder="Cost (optional)"
              keyboardType="number-pad"
            /> */}
          </View>

          {/* Two buttons */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Button
                theme={'primary'}
                label={'Save'}
                height={50}
                onPress={handleOnSave}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                theme={'secondary'}
                label={'cancel'}
                height={50}
                onPress={handleOnCancel}
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
    // width: 46,
    // height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: color.secondary,
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

  datePicker: {
    width: 200,
  },
});

export default StockModal;
