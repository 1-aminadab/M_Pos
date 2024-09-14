import React, { useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CustomTextInput from '../../components/input/CustomTextInput';

import SuccessFailModal from '../../components/modal/SuccessFailModal';
import useGetRealmData from '../../hooks/customHooks/useGetRealmData';
import generateUniqueID from '../../utilities/uniqueIDGenerator';
import { addStore } from '../../database/services/StoreMgtServices/StoreMgtServices.js';
import { color, textStyles } from '../../styles/Styles';
import { Divider } from 'react-native-paper';
import CustomDropDown from '../../components/input/CustomDropDown';
import { scale } from 'react-native-size-matters';
import { addPayment } from '../../database/services/paymentServices.js/PaymentService';

function BankDetails({ navigation, route, handleSetBank }) {
  const [paymentData, setpaymentData] = useState({
    _id:'',
    full_name: '',
    bank: '',
    account_num: '',
  });
  const [inputError, setinputError] = useState({
    _id:'',
    full_name: '',
    bank: '',
    account_num: '',
  });
  const [bankList, setBankList] = useState([{
    _id: 'BOA',
    name: 'BOA',

  }]);

  // const fetchedpaymentData = useGetRealmData('StoreManagement');
 
  // const paymentDatas = fetchedpaymentData.data;

  const [successModal, setSuccessModal] = useState(false);
  const [successFailMessage, setSuccessFailMessage] = useState('');
  const [isFailModal, setIsFailModal] = useState(false);
 

  function handleAddStore() {
    const pattern = /^[A-Za-z0-9 \W*]{2,}$/g;
    const trimmedName = paymentData.full_name.trim();
    const validateBankName = pattern.test(trimmedName);
  

    const newBank = {
      _id: generateUniqueID(),
      full_name: paymentData.full_name.trim(),
      account_num: parseInt(paymentData.account_num.trim()),
      bank: paymentData.bank._id,
    };

    if (validateBankName) {
     
      addPayment(newBank);
      setIsFailModal(false);
      setSuccessFailMessage('Successfully Added!');
      setSuccessModal(true);
      setTimeout(() => {
        setpaymentData({
          _id:'',
          full_name: '',
          bank: '',
          account_num: '',
        })
        setSuccessModal(false);
        // if (passedFromAddProduct) {
        //   navigation.goBack();
        // }
        handleSetBank(newBank)
      }, 1200);
    } else {
      setIsFailModal(true);
      setSuccessFailMessage('Name Already Added!');
      setSuccessModal(true);
    }
  }
  const Cancel=()=>{
    setpaymentData({
      _id:'',
      full_name: '',
      bank: '',
      account_num: '',
    })
  }
  return (
    <View
      style={{
        backgroundColor: color.white,
        padding: 25,
        borderRadius: 10,
        width: 300,
      }}>
      <SuccessFailModal
        fail={isFailModal}
        modalVisibility={successModal}
        setModalVisibility={setSuccessModal}
        message={successFailMessage}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={[textStyles.text_bold,{ textAlign:"center" }]}>
         Account Details
        </Text>
        <Text style={[textStyles.text_regular_Gray,{ textAlign:"center", fontSize:scale(12) }]}>
         Insert details of payment recieving account
        </Text>
      </View>
      <Divider />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ marginVertical: 15 }}>
          <View>
            <CustomTextInput
              label={'Full Name'}
              placeholder={'Enter here ...'}
              input={paymentData.full_name}
              setInput={(text) => setpaymentData({ ...paymentData, full_name: text })}
            />
            {/* Category List DropDown */}
            <View>
              <CustomDropDown
                label={'Select Bank'}
                data={bankList}
                // currentSelected={newProductData.category_id}
                setSelected={input => {
                  setpaymentData({ ...paymentData, bank: input })
                }}

                // error={inputError?.category}
                // rightBtn={true}
                // rightBtnLabel={'Create New'}
              // rightBtnGo={() => setshowAddCategoryModal(true)}
              />
              {inputError?.category && (
                <Text style={styles.inputErrorText}>Please select bank!</Text>
              )}
            </View>
            <CustomTextInput
              label={'Account Number'}
              placeholder={'Enter here ...'}
              input={paymentData.Licenses}
              setInput={(text) => setpaymentData({ ...paymentData, account_num: text })}
              keyboardType={'phone-pad'}
            />

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: 10,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: color.primary,
                  padding: 10,
                  width: 110,
                  borderRadius: 5,
                }}
                onPress={handleAddStore}>
                <Text style={{ color: color.white, textAlign: 'center', fontSize: 18 }}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: color.outline,
                  padding: 10,
                  width: 110,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: color.grayDark,
                }}
                onPress={() => {
                  Cancel()
                  // Add logic for discard action
                }}>
                <Text style={{ color: color.gray, textAlign: 'center', fontSize: 18 }}>
                  Discard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default BankDetails