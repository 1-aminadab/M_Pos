import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import SMSListener from 'react-native-android-sms-listener'; // Android-specific library for SMS listening
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {theme} from '../../styles/stylesheet';
import {verticalScale, scale} from 'react-native-size-matters';
import {Iconify} from 'react-native-iconify';
import {fonts} from '../../styles/unistyle';
import {REACT_NATIVE_OTP_API, REACT_NATIVE_RESEND_OTP_API} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../styles/Styles';
import PhoneNumber from '../Setting/PhoneNumber';
import axios from 'axios';

const OTP = ({navigation, route}) => {
  const {phoneNumber, purpose, email,token} = route.params;

  const [otp, setOtp] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    let countdownInterval;

    if (resendDisabled) {
      countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval); // Stop the interval at zero
            setResendDisabled(false); // Re-enable the button
            return 60; // Reset the countdown to 60 seconds
          } else {
            return prevCountdown - 1; // Decrease the countdown by 1 second
          }
        });
      }, 1000); // Update the countdown every 1 second
    }

    return () => {
      clearInterval(countdownInterval); // Cleanup interval on unmount
    };
  }, [resendDisabled]);

  // useEffect(() => {
  //   // Request SMS permissions (Android)
  //   async function requestSMSPermission() {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_SMS,
  //         {
  //           title: 'SMS Permission',
  //           message: 'This app needs access to your SMS messages.',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('SMS permission granted');
  //         startListeningForSMS();
  //       } else {
  //         console.log('SMS permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }

  //   requestSMSPermission();
  // }, []);

  // 

  
async function verifyOtp() {
  console.log(token);
  console.log(typeof(otp));
  try {
    const response = await axios.post(
      'https://account.qa.addissystems.et/account/verify-otp',
      { receivedOtp:otp },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );

    if (response.data.success) {
      console.log('OTP verified successfully!');
      Toast.show({
        type: 'success',
        text1: 'OTP successfully verified!',
      });
      autoCheckTOP(response.data.token)
      // navigation.navigate('LogIn', {screen: 'OTP'});
      
      // Handle success
    } else {
      console.error('Failed to verify OTP:', response.data.message);
      // Handle failure
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    // Handle error
  }
}

  // 
  async function saveEmail(email, phone) {
    try {
      const data = {email, phone};
      console.log('data' + data);
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving email and phone:', error);
    }
  }

  const handleResendClick = async () => {
     try {
      let apiEndpoint;
      if (purpose === 'verifyAccount') {
        apiEndpoint = 'https://account.qa.addissystems.et/send-otp';
      } else if (purpose === 'resetPassword') {
        apiEndpoint = 'https://account.qa.addissystems.et/send-otp';
      }
      setResendDisabled(true);
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phonenumber: phoneNumber,
        }),
      });

      if (response.ok) {
        console.log(response);
        setResendDisabled(false);
      } else {
        setResendDisabled(true);
      }

      setIsloading(false);
    } catch (error) {
      console.error('Error during OTP Send:', error);
      setIsloading(false);
    } finally{
      setResendDisabled(true);
    }

  };

 
  const extractOTPFromMessage = messageBody => {
    // Implement your OTP extraction logic here
    // You might use regular expressions or other methods to find and extract the OTP code
    // Example regular expression for a 6-digit OTP:
    const otpRegex = /(\d{6})/;
    const match = messageBody.match(otpRegex);

    if (match) {
      return match[1]; // Extracted OTP code
    } else {
      return ''; // No OTP code found
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));

    // Auto-focus the next input field
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const HandleResentOTP = async () => {
    // setIsloading(true);
    try {
      let apiEndpoint;
      if (purpose === 'verifyAccount') {
        apiEndpoint = REACT_NATIVE_RESEND_OTP_API;
      } else if (purpose === 'resetPassword') {
        apiEndpoint = REACT_NATIVE_RESEND_OTP_API;
      } else if (purpose === 'restore') {
        apiEndpoint = REACT_NATIVE_RESEND_OTP_API;
      }
      setResendDisabled(true);
      const response = await fetch('https://account.qa.addissystems.et/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });

      if (response.ok) {
        setResendDisabled(false);
      } else {
        setResendDisabled(true);
      }

      setIsloading(false);
    } catch (error) {
      console.error('Error during OTP Send:', error);
      setIsloading(false);
    }
  };

  // scroll to uncover keyboard
  const scrollViewRef = useRef(null);
  const scrollTop = order => {
    scrollViewRef.current.scrollTo({x: 0, y: 170, animated: true});
  };

  async function autoCheckTOP(token) {
  
    if (true) {
      if (purpose === 'verifyAccount') {
        Toast.show({
          type: 'success',
          text1: 'OTP successfully verified for account!',
        });
        // Navigate to the appropriate screen for account verification success
        navigation.navigate('LogIn', {screen: 'OTP'});
        setOtp('');
      } else if (purpose === 'resetPassword') {
        Toast.show({type: 'success', text1: 'OTP Successfully Verified!'});
        // Navigate to the appropriate screen for password reset success
        
        navigation.navigate('ResetPassword', {screen: 'OTP', token});
        setOtp('');
      } else if (purpose === 'restore') {
        Toast.show({type: 'success', text1: 'OTP Successfully Verified!'});
        // Navigate to the appropriate screen for password reset success
        const phone = phoneNumber;
        // console.log('phone'+phone)
        saveEmail(email, phone);
        navigation.navigate('LogIn', {screen: 'OTP'});
        setOtp('');
      }
    }
  }

  const handleVerify = async () => {
    setIsloading(true);

    try {
      let apiEndpoint = REACT_NATIVE_OTP_API;
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          OTP: otp,
          purpose: purpose,
        }),
      });
      const data = await response.json();

      if (data.success === false) {
        // Handle success based on theSMS permission denied purpose
        if (purpose === 'verifyAccount') {
          Toast.show({
            type: 'success',
            text1: 'OTP successfully verified for account!',
          });
          // Navigate to the appropriate screen for account verification success
          navigation.navigate('LogIn', {screen: 'OTP'});
          setOtp(''); 
        } else if (purpose === 'resetPassword') {
          Toast.show({
            type: 'success',
            text1: 'OTP successfully verified',
          });
          // Navigate to the appropriate screen for password reset success
          const token = data.token;
          navigation.navigate('ResetPassword', {screen: 'OTP', token});
          setOtp('');
        } else if (purpose === 'restore') {
          Toast.show({type: 'success', text1: 'OTP Successfully Verified!'});
          // Navigate to the appropriate screen for password reset success
          const phone = phoneNumber;

          saveEmail(email, phone);

          navigation.navigate('LogIn', {screen: 'OTP'});
          setOtp('');
        }
      } else {
        // Handle failure based on the purpose
        if (purpose === 'verifyAccount') {
          Toast.show({
            type: 'error',
            text1: data.message,
          });
          setOtp('');
        } else if (purpose === 'resetPassword') {
          Toast.show({type: 'error', text1: data.message});
          setOtp('');
        } else if (purpose === 'restore') {
          Toast.show({type: 'error', text1: data.message});
          //  Toast.show({type: 'success', text1: 'OTP Successfully Verified!'});
          // // Navigate to the appropriate screen for password reset success
          const phone = phoneNumber;
  
          saveEmail(email, phone)
         
          setOtp('')
        }
      }

      setIsloading(false);
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setIsloading(false);
    }
  };

  otp.length == 6 && autoCheckTOP();

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
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
      <ScrollView ref={scrollViewRef}>
        <View style={{alignItems: 'flex-start', paddingVertical: 50}}>
          {/* <Text
            style={{
              fontWeight: '600',
              fontSize: 24,
              marginVertical: verticalScale(20),
            }}>
            M-POS
          </Text> */}
          {/* <View>
            <Image
              source={require('../../assets/images/LOCK-02.png')}
              resizeMode="contain"
              style={{maxWidth: 272, maxHeight: scale(128)}}
            />
          </View> */}
          <Text style={{fontSize: 26, fontWeight: 600, paddingTop: 40, paddingHorizontal:20}}>
            Enter OTP
          </Text>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: scale(10),
              marginTop: 30,
            }}>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                fontSize: 15,
                  fontWeight: 500,
                  color: 'grey',
                  textAlign: 'center',
                }}>
                We have sent the code to your Phone Number
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                }}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: color.Neutral_95, padding: 15, marginBottom: 20, borderRadius: 10}}>
                    <Text
                     style={{
                      color: color.secondary, 
                      fontSize: 18, 
                      fontWeight: 600
                     }}
                    >{phoneNumber}</Text>
                  {/* <TouchableOpacity
                  onPress={null}
                  style={{
                    backgroundColor: '#FFF4E4',
                    padding: 7,
                    borderWidth: 1,
                    borderColor: color.secondary,
                    borderRadius: 5
                  }}
                  >
                  <Text style={{fontWeight: 500, color: color.secondary}}>
                     Change
                  </Text>
                </TouchableOpacity> */}
                  </View>
                <View style={styles.inputContainer}>
                  {Array.from({length: 6}, (_, index) => (
                    <TextInput
                      onFocus={() => scrollTop(0)}
                      key={index}
                      ref={inputRefs[index]}
                      style={styles.input}
                      value={otp[index]}
                      onChangeText={text => handleOtpChange(index, text)}
                      maxLength={1}
                      keyboardType="numeric"
                    />
                  ))}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: scale(7),
                  marginTop: scale(15),
                }}>
                <TouchableOpacity
                  onPress={HandleResentOTP}
                  disabled={resendDisabled}>
                  <Text style={{fontWeight: 500, color: color.primary}}>
                    {resendDisabled
                      ? `Resend OTP (${countdown} s)`
                      : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Pressable
              onPress={() => {
                if (!isLoading) {
                  //handleVerify();
                  verifyOtp()
                }
              }}
              style={{
                borderRadius: 10,
                backgroundColor: !isLoading //&& licensePH != license
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
                <Text style={[{color: 'white'}, fonts.h1]}>Verify</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '500',
    color: 'grey',
    marginVertical: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 45,
    borderWidth: 1,
    borderColor: color.secondary,
    fontSize: 24,
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTP;
