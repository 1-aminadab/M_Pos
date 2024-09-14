import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { color } from '../../styles/Styles'
import { verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../styles/stylesheet';
import { Iconify } from 'react-native-iconify';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import { DoneModals } from '../../components/modal/Modals';
import PhoneCode from '../../components/modal/PhoneCode';
import realm from '../../database/index';
import { fonts } from '../../styles/unistyle';
import DismissKeyboardHOC from '../../components/DismissKeyboard';
import generateUniqueID from '../../utilities/uniqueIDGenerator';
import SuccessFailModal from '../../components/modal/SuccessFailModal';
import Toast from 'react-native-toast-message';

const AddCustomer = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cautionModal, setCautionModal] = useState({
    visibility: false,
    message: 'Message Here',
    fail: false,
  });
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAdress] = useState('');
  const [tin, setTin] = useState('');
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneCode, setPhoneCode] = useState({
    name: 'Ethiopia',
    dial_code: '+251',
    code: 'ET',
    Flag: () => <Iconify icon="twemoji:flag-ethiopia" size={30} />,
  });
  const [done, setDone] = useState(false);
  const [inputError, setInputError] = useState({});


  //Validation for add product forms
  function validation() {
    let isFormValid = true;
    if (fullname == '') {
      setInputError({ ...inputError, fullname: 'Full name of customer is required!' });
      return false;
    }
    function isValidEmail(email) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(email);
    }
    if (email != '' && isValidEmail(email) == false) {
      setInputError({ ...inputError, email: 'invalid email' });
      return false;
    }
    if (phoneNumber == '') {
      setInputError({ ...inputError, phoneNumber: 'Phone number is required!' });
      return false;
    }
    if (phoneNumber !== '' && phoneNumber.length!=9) {
      setInputError({ ...inputError, phoneNumber: 'Phone number invalid!' });
      return false;
    }
    // if (tin == '') {
    //   setInputError({ ...inputError, tin: 'TIN number is required!' });
    //   return false;
    // }
    if (tin !== '' && tin.length < 10) {
      setInputError({ ...inputError, tin: 'TIN number is invalid!' });
      return false;
    }

    return true;
  }

  const CreateCustomer = () => {


    if (validation()) {
    realm.write(() => {
      try {
        if (fullname && phoneNumber) {
          realm.create('Customer', {
            _id: parseInt(generateUniqueID()),
            fullname: fullname,
            email: email?email:`default${Math.floor(Math.random()  * 9000) + 1000}@gmail.com`,
            phonecode: phoneCode.dial_code,
            phone: phoneNumber,
            address: address,
            tin: tin,
          });
          setCautionModal({
            ...cautionModal,
            message: 'Customer Saved!',
            visibility: true,
          });
          setTimeout(() => {
            if (route && route.params && route.params.passedData) {
              if(route.params.passedData=='b2b'){
                navigation.navigate('b2b')
              }else{
                navigation.navigate('create-sale', { passed_selected_product: route.params.passedData })
              }
              
            } else {
              navigation.navigate('Customer', { fullname });
            }

            setFullname('');
            setEmail('');
            setPhoneNumber('');
            setTin('');
            setAdress('');
          }, 1000);
        }
      } catch (e) {
        console.log(e);
      }
    })}
  };
  const scrollViewRef = useRef(null);

  const scrollTop = (order) => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0+ order * 95, animated: true });
  }

  const tinNumberUpdate=(text)=>{
    if(text.length<=13){
      setTin(text), setInputError({ ...inputError, tin: '' }) 
    }else{
      setTin(tin)
      Toast.show({
        type: 'error',
        text1:
          'Please check your TIN number',
      });
    }
    
  }
  function convertToDash(number) {
    let numberStr = number.toString();
    let index = numberStr.length - 1;
    let convertedStr = numberStr.substring(0, index) + '-' + numberStr.charAt(index);
    return convertedStr;
  }

  useEffect(() => {
    if (tin.length === 11 && tin.indexOf("-") === -1) {
      const convertedTin = convertToDash(tin);
      setTin(convertedTin);
    }
  }, [tin]);
  
  return (
    <DismissKeyboardHOC>
      <View style={{ flex: 1 }}>
        <SuccessFailModal
          modalVisibility={cautionModal.visibility}
          setModalVisibility={value =>
            setCautionModal({ ...cautionModal, visibility: value })
          }
          message={cautionModal.message}
          fail={cautionModal.fail}
        />
        {/* <DoneModals
          message={'done'}
          modalVisible={done}
          setModalVisible={setDone}
        /> */}
        <PhoneCode
          modalVisible={phoneModal}
          setModalVisible={setPhoneModal}
          setResult={setPhoneCode}
        />
        <View style={{ paddingHorizontal: 0 }}>
          <View style={{  }}>
            <TopNavigationBar
              onPressBack={() => navigation.goBack()}
              backIcon={'back'}
              middleLabel={'Add Customer'}
              onGoCondition={theme.color.primary}
            />
          </View>
          <ScrollView ref={scrollViewRef} 
            showsVerticalScrollIndicator={false}
            style={{
              marginHorizontal: scale(25),
              marginVertical: verticalScale(15),
              marginBottom: verticalScale(45),
            }}>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Full Name
              </Text>
              <View
                style={[styles.textInputWarper, { borderColor: inputError.fullname ? color.primary : theme.color.blue }]}>
                <Iconify
                  icon="mdi:person-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(0)}
                  value={fullname}
                  onChangeText={text => { setFullname(text), setInputError({ ...inputError, fullname: '' }) }}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="Full Name"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
              {inputError?.fullname && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.fullname}</Text>}

            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Email
              </Text>
              <View
                style={[styles.textInputWarper, { borderColor: inputError.email ? color.primary : theme.color.blue }]}>
                <Iconify icon="mdi:email-outline" size={18} color={'#cacaca'} />
                <TextInput
                onFocus={() => scrollTop(1)}
                  value={email}
                  onChangeText={text => { setEmail(text), setInputError({ ...inputError, email: '' }) }}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="Email"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
              {inputError?.email && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.email}</Text>}
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Phone Number
              </Text>
              <Pressable
                onPress={() => { setPhoneModal(true) }}
                style={styles.textInputWarper}>
                {phoneCode ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {<phoneCode.Flag />}
                    <Text style={[{ paddingLeft: 9 }, fonts.h3]}>
                      {phoneCode?.dial_code}
                    </Text>
                    <Iconify icon="mdi:menu-down" size={18} />
                  </View>
                ) : null}

                <TextInput
                onFocus={() => scrollTop(2)}
                  value={phoneNumber}
                  onChangeText={text => {setPhoneNumber(text), setInputError({ ...inputError, phoneNumber: '' }) }}
                  keyboardType="numeric"
                  style={[
                    { alignItems: 'center', flex: 1, color: 'black' },
                    fonts.ptext,
                  ]}
                  placeholderTextColor={theme.color.gray}
                  placeholder={'98765433'}
                />
              </Pressable>
              {inputError?.phoneNumber && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.phoneNumber}</Text>}
            </View>
           

            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                Address
              </Text>
              <View
                style={styles.textInputWarper}>
                <Iconify
                  icon="mdi:address-marker-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(3)}
                  value={address}
                  onChangeText={text => setAdress(text)}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="City, Street Address, Woreda, H.No"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
            </View>
            <View style={{ marginBottom: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                TIN
              </Text>
              <View
                style={styles.textInputWarper}>
                <Iconify
                  icon="pepicons-pencil:bulletin-notice"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(4)}
                  value={tin}
                  onChangeText={text => { tinNumberUpdate(text)}}
                  keyboardType="numeric"
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  placeholder="TIN No"
                  placeholderTextColor={theme.color.gray}
                />
              </View>
              {inputError?.tin && <Text style={[{ fontSize: 12, marginLeft: 5, color: color.primary }]}>{inputError?.tin}</Text>}

            </View>
            <Pressable
              onPress={CreateCustomer}
              style={{
                borderRadius: 10,
                backgroundColor: color.primary,
                paddingVertical: 18,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: verticalScale(15),
              }}>
              <Text style={{ color: 'white', fontSize: 22, fontWeight: 600 }}>
                Save
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </DismissKeyboardHOC>
  );
};

export default AddCustomer;

const styles = StyleSheet.create({
  textInputWarper: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.color.blue,
    paddingLeft: 20,
    alignItems: 'center',
  }

});
