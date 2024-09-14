import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    TextInput,TouchableOpacity,ScrollView
  } from 'react-native';
  import React, { useRef, useState } from 'react';
  import { theme } from '../../styles/stylesheet';
  import { verticalScale, scale } from 'react-native-size-matters';
  import { Iconify } from 'react-native-iconify';
  import { fonts } from '../../styles/unistyle';
  import Toast from 'react-native-toast-message';
  import {REACT_NATIVE_RESTORE_ACCOUNT} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../styles/Styles';
import { StatusBar } from 'react-native';
import axios from 'axios';

function RestoreAccount({navigation}) {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const purpose = 'restore'
  // const handleNextStep = () => {
  //   let errors = {};
  //   if (email === '') errors.email = 'Email is required';
  //   handleResetScroll();
  // };
  // async function saveEmail(email, phone) {
  //   try {
  //     const data = { email, phone };
  //     await AsyncStorage.setItem('userData', JSON.stringify(data));
  //   } catch (error) {
  //     console.error('Error saving email and phone:', error);
  //   }
  // }
  
  const HandleCheckEmail=async ()=>{
    let errors = {};
    if (email === '') {setEmailError('Email is required')}
    else if (emailRegex.test(email)==false) {setEmailError('Please Enter Valid Email')}
    else {
        setLoading(true);
        // Example API request (replace with your actual endpoint)
        try {
          await fetch(
            REACT_NATIVE_RESTORE_ACCOUNT,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4'
              },
              body: JSON.stringify({
                email: email,
              }),
            },
          ).then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.success === false) {
                setLoading(false);
                Toast.show({
                  type: 'error',
                  text1: data.msg
                });
              } else {
                const phoneNumber = data?.data?.phone;
                console.log("phoneNumber" + phoneNumber)
                // Assuming a successful registration, you can navigate to another screen here
                // await AsyncStorage.setItem('', JSON.stringify(data));
                
                sendOtp(phoneNumber, "restore")           
               // navigation.navigate('OTP', { phoneNumber, purpose , email});
                // saveEmail(formData.email, formData.phone);
              }
            })
        } catch (error) {
          setLoading(false);
          // Handle any network or other errors here and show an error message to the user
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occurred. Please try again later.',
          });
          console.log("error while checking",error);
        } finally {
          setLoading(false);
        }
    }
    console.log(emailRegex.test(email))
  }
const sendOtp = async(phone, purpose)=>{
  const data = {
    phonenumber:phone
  }
  const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4'
  const headers = {
    'Content-Type': 'application/json',
    'x-auth-token':auth_token
  }

  await axios.post('https://account.qa.addissystems.et/account/send-otp',data, headers )
  .then((res)=>{
    console.log(res.data);
    if (res.data.success) {
      navigation.navigate('OTP', { phoneNumber:phone, purpose:purpose ,token:res.data.token});

    }
    else{
      setEmailError("something went wrong! please try again later!")
      Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occurred. While sending OTP!.',
          });
    }

  })
  .catch((err)=>{
    console.log(err)
  })
}
    return (
        <View style={{flex: 1, backgroundColor: theme.color.white, paddingVertical: 20}}>
 <StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />
        <View style={{paddingHorizontal: 20}}>
                   <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: verticalScale(20),
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
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 25,
              color: color.primary,
              marginVertical: verticalScale(20),
            }}>
            M-POS
          </Text>
  
          <Text style={[{padding:20, color: color.Neutral_60}]}>Please insert email related to your account</Text>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: scale(20),
            }}>
            {/* <View style={{marginVertical: 20, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
              <Text style={[fonts.ptext]}>Confirm the phone Number your provided in Your security setting {obscuredPhoneNumber}</Text>
  
            </View> */}
            {/* <View style={{width: '100%'}}>
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
                    borderColor: phoneNumberError ? 'red' : theme.color.blue,
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
            </View> */}
            <View style={{ marginTop: verticalScale(2) }}>
                    <Text
                      style={[
                        {
                          marginBottom: 6,
                          color: '#cacaca',
                        },
                        fonts.ptext,
                      ]}>
                      {' '}
                      Email
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        borderRadius: 10,
                        borderWidth: 0.7,
                        borderColor: emailError
                          ? 'red'
                          : color.secondary,
                        paddingLeft: 10,
                        alignItems: 'center',
                      }}>
                      <Iconify
                        icon="mdi:email-outline"
                        size={20}
                        color={color.secondary}
                      />
                      <TextInput
                      
                        value={email}
                        onChangeText={text =>{setEmail(text,setEmailError(''))}}
                        style={[
                          {
                            flex: 1,
                            color: 'black',
                          },
                        
                        ]}
                        placeholder="Email"
                        placeholderTextColor={theme.color.gray}
                      />
                    </View>
                    <Text
                      style={{
                        marginBottom: '-10px',
                        color: 'red',
                        fontSize: 10,
                      }}>
                      {emailError}
                    </Text>
                  </View>
            <Pressable
              onPress={() => {
                if (!isLoading) {
                  HandleCheckEmail();
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
}

export default RestoreAccount