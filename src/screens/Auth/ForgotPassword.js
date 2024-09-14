import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../styles/stylesheet';
import {verticalScale, scale} from 'react-native-size-matters';
import {Iconify} from 'react-native-iconify';
import {phoneData} from '../../../data/phonedata';
import PhoneCode from '../../components/modal/PhoneCode';
import {fonts} from '../../styles/unistyle';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_NATIVE_FORGOTPASSWORD_API} from '@env'
import { color } from '../../styles/Styles';
import { StatusBar } from 'react-native';
import axios from 'axios';
const ForgotPassword = ({navigation}) => {
  const [phoneModal, setPhoneModal] = useState(false);
  const [phoneCode, setPhoneCode] = useState(
    phoneData.find(d => d.dial_code == '+251'),
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isLoading, setLoading] = useState(false);
  purpose = 'resetPassword';

 async function logEmail() {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
     const userData = JSON.parse(userDataString);
   
    if(userData && userData.phone){
       setPhone(userData.phone.toString());
    }else{
      console.log('phone number does not exist');
    }
      
    } catch (error) {
      console.error('Error retrieving phone:', error);
    }
  }

  // Call the function
  logEmail();
  console.log(phone)
// hidden phone number
 let obscuredPhoneNumber = '*******' + phone.slice(-2);

  const HandleForgotPassword = async () => {
    setLoading(true);
    setPhoneNumberError('');
    if (phoneNumber === '') {
      if (phoneNumber === '') setPhoneNumberError('Phone Number is required');
      setLoading(false);
    } else if(phoneNumber !== phone){
      setPhoneNumberError('Your phone number does not match an existing phone number.');
      setLoading(false);
    } 
    else {
      try {
        const response = await fetch(
          REACT_NATIVE_FORGOTPASSWORD_API,
          {
            method: 'POST',
          
            
            body: JSON.stringify({
              phone: phoneNumber,
            }),
          },
        );

        if (response.status === 403) {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Email already exists !!',
          });
        } else if (response.status === 500) {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Internal Server Error !!',
          });
        } else {
          // Assuming a successful registration, you can navigate to another screen here
          navigation.navigate('OTP', {phoneNumber, purpose:'resetPassword'});
          Toast.show({
            type: 'success',
            text1: 'SMS sent to your mobile',
            text2: 'Please Enter One Time Password',
          });
          setLoading(true);
          setPhoneNumber('')
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        // Handle any network or other errors here and show an error message to the user
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setPhoneNumberError('');
    if (phoneNumber === '') {
      if (phoneNumber === '') setPhoneNumberError('Phone Number is required');
      setLoading(false);
    } else if(phoneNumber !== phone){
      setPhoneNumberError('Your phone number does not match an existing phone number.');
      setLoading(false);
    } 
    else {
      try {
        const response = await axios.post(
          'https://account.qa.addissystems.et/account/send-otp',
          { phonenumber: phoneNumber }, 
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setLoading(false)
        console.log("reposen from forgot password",response.data);
        if (response.data.success === false) {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Invalid Otp !!',
          });
        } else if (response.status === 500) {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Internal Server Error !!',
          });
        } else if (response.data.success === true) {
          const token = response.data.token

          // Assuming a successful registration, you can navigate to another screen here
          navigation.navigate('OTP', {phoneNumber, purpose,token});
          Toast.show({
            type: 'success',
            text1: 'SMS sent to your mobile',
            text2: 'Please Enter One Time Password',
          });
          setLoading(true);
          setPhoneNumber('')
        }
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        // Handle any network or other errors here and show an error message to the user
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white, paddingHorizontal: 15, paddingTop: 10}}>
        <StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />
      <PhoneCode
        modalVisible={phoneModal}
        setModalVisible={setPhoneModal}
        setResult={setPhoneCode}
      />
      {/* <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: verticalScale(30),
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              padding: 5,
              borderRadius: 20,
              backgroundColor: theme.color.lighterGray,
            }}>
            <Iconify icon="ic:round-arrow-back" size={30} />
          </Pressable>
          <Image
            source={require('../../assets/images/addissystems_logo.png')}
            resizeMode="contain"
            style={{maxWidth: 262, maxHeight: scale(38)}}
          />
          <View></View>
        </View>
      </View> */}
      <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // marginHorizontal: verticalScale(20),
                }}>
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{
                    padding: 5,
                    borderRadius: 20,
                    backgroundColor: color.lightPrimary,
                  }}>
                  <Iconify icon="ic:round-arrow-back" size={28} style={{color: color.lightBlack}} />
                </Pressable>
                <Image
                  source={require('../../assets/images/addissystems_logo.png')}
                  resizeMode="contain"
                  style={{ maxWidth: 300, maxHeight: scale(45) }}
                />
              </View>
      <View style={{marginTop: 70}}>
        <Text style={{fontSize: 22, fontWeight: 600, paddingHorizontal: scale(10), paddingVertical: scale(20)}}>Forgot Password ?</Text>
        <View
          style={{
            width: '100%',
            paddingHorizontal: scale(10),
          }}>
          <View style={{flexDirection: 'row', paddingVertical: scale(20)}}>
            <Text style={[fonts.ptext]}>Confirm the phone Number your provided in Your security setting {obscuredPhoneNumber}</Text>

          </View>
          <View style={{width: '100%'}}>
            <View style={{marginTop: verticalScale(2), width: '100%'}}>
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
                onPress={() => setPhoneModal(true)}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 0.7,
                  borderColor: phoneNumberError ? 'red' : color.secondary,
                  paddingLeft: 10,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {<phoneCode.Flag />}
                  <Text style={[{paddingLeft: 9}, fonts.ptext]}>
                    {phoneCode.dial_code}
                  </Text>
                  <Iconify icon="mdi:menu-down" size={18} />
                </View>

                <TextInput
                  value={phoneNumber}
                  onChangeText={text => {
                    if (/^\d+$/.test(text) || text === '') setPhoneNumber(text);
                  }}
                  style={[
                    {
                      flex: 1,
                      alignItems: 'center',
                      color: 'black',
                    },
                    fonts.h3,
                  ]}
                  maxLength={10}
                  keyboardType="numeric"
                  placeholderTextColor={theme.color.gray}
                  placeholder="9xxxxxxxx"
                />
              </Pressable>
              <Text style={{marginBottom: '-10px', color: 'red', fontSize: 10}}>
                {phoneNumberError}
              </Text>
            </View>
          </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 14, color: color.Neutral_60}}>We'll send you a one-time code to this number</Text>
          </View>
          <Pressable
            onPress={() => {
              if (!isLoading) {
                // HandleForgotPassword();
                handleSendOtp()
              }
            }}
            style={{
              borderRadius: 10,
              backgroundColor: !isLoading
                ? color.primary
                : theme.color.gray,
              paddingVertical: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: verticalScale(40),
              width: '100%',
            }}>
            {isLoading ? (
              <>
                <Image
                  source={require('../../assets/images/spinner.gif')}
                  resizeMode="contain"
                  style={{maxWidth: 26, maxHeight: scale(28)}}
                />
                <Text style={[{color: 'white'}, fonts.h1]}>Loading...</Text>
              </>
            ) : (
              <Text style={[{color: 'white'}, fonts.h1]}>Next</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );

};

export default ForgotPassword;

const styles = StyleSheet.create({});
