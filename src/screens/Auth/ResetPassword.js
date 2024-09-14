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
import {REACT_NATIVE_RESETPASSWORD_API} from '@env'
import { color } from '../../styles/Styles';
import { StatusBar } from 'react-native';

const ResetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
  const { screen, token } = route.params;

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};

 const [showCPassword, setShowCPassword] = useState(false);
  const toggleShowCPassword = () => {
  setShowCPassword(!showCPassword);
};

  const HandleResetPassword = async () => {
    try {
      setPasswordError('');
      setConfirmPasswordError('');
      setLoading(true);

      // Check if password and confirmPassword are empty
      if (password === '') {
        setPasswordError('New password is required');
      }
        if (password.length < 6) {
        setPasswordError('Password should consist of more than 6 characters.');
      }
      if (ConfirmPassword === '') {
        setConfirmPasswordError('Confirm password is required');
      }
      // Check if password and confirmPassword are don't match
      if (password !== ConfirmPassword) {
        setConfirmPasswordError('Passwords do not match');
      }

      // If there are any errors in the input, stop here
      if (
        password === '' ||
        ConfirmPassword === '' ||
        password !== ConfirmPassword
      ) {
        setLoading(false);
        return;
      }

      // Make a POST request to reset the password
      const response = await fetch(
        REACT_NATIVE_RESETPASSWORD_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            password: password,
          }),
        },
      )
      if (response.status === 403) {
        // User not found error
        Toast.show({
          type: 'error',
          text1: 'User Not Found !!',
        });
      } else if (response.status === 500) {
        // Internal server error
        Toast.show({
          type: 'error',
          text1: 'Internal Server Error !!',
        });
      } else {
        // Reset password successful
        navigation.navigate('LogIn', { screen: 'ResetPassword' });
        Toast.show({
          type: 'success',
          text1: 'Congratulations!',
          text2: 'Reset password successfully!',
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again later.',
      });
    } finally {
      // Always set loading to false when done
      setLoading(false);
    }
  };
    // scroll to uncover keyboard 
    const scrollViewRef = useRef(null);
    const scrollTop = (order) => {
      scrollViewRef.current.scrollTo({ x: 0, y: 170, animated: true });
    }

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.white,  paddingHorizontal: 20  }}>
<StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />
      {/* <View style={{ paddingHorizontal: 20 }}>
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
            style={{ maxWidth: 262, maxHeight: scale(38) }}
          />
          <View></View>
        </View>
      </View> */}
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
      <ScrollView ref={scrollViewRef}>
      <View>
         <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            color: color.primary,
            marginVertical: verticalScale(10),
          }}>
          M-POS
        </Text>
         </View>
       
          <Text style={{fontSize: 22, fontWeight: 600, paddingHorizontal: scale(0), paddingTop: 30}}>Reset Password</Text>
        
        <View
          style={{
            width: '100%',
            paddingHorizontal: scale(0),
          }}>
          <View style={{flexDirection: 'row', paddingVertical: scale(10)}}>
            <Text style={[fonts.ptext]}>Please enter your New Password</Text>
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ marginTop: verticalScale(15) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                {' '}
                New Password
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: passwordError ? 'red' : color.secondary,
                  paddingLeft: 20,
                  paddingRight: 10,
                  alignItems: 'center',
                }}>
                <Iconify
                  icon="material-symbols:lock-outline"
                  size={18}
                  color={color.secondary}
                />
                <TextInput
                onFocus={() => scrollTop(0)}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                  ]}
                  maxLength={10}
                  placeholder="New Password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor={theme.color.gray}
                />
                <TouchableOpacity onPress={toggleShowPassword}

                >
                  {
                    showPassword ?
                      <Iconify
                        icon="mdi:eye-off"
                        size={18}
                        color={color.secondary}
                      /> :
                      <Iconify
                        icon="mdi:eye"
                        size={18}
                          color={color.secondary}
                      />
                  }

                </TouchableOpacity>
              </View>

              <Text style={{ marginBottom: '-10px', color: 'red', fontSize: 10 }}>
                {passwordError}
              </Text>
            </View>
            <View style={{ marginTop: verticalScale(3) }}>
              <Text
                style={[
                  {
                    marginBottom: 6,
                    color: '#cacaca',
                  },
                  fonts.ptext,
                ]}>
                {' '}
                Confirm Password
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: ConfirmPasswordError ? 'red' : color.secondary,
                  paddingLeft: 20,
                  paddingRight: 10,
                  alignItems: 'center',
                }}>
                <Iconify
                  icon="material-symbols:lock-outline"
                  size={18}
                  color={'#cacaca'}
                />
                <TextInput
                onFocus={() => scrollTop(0)}
                  value={ConfirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                  style={[
                    {
                      flex: 1,
                      color: 'black',
                    },
                  ]}
                  secureTextEntry={!showCPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor={theme.color.gray}
                />
                 <TouchableOpacity onPress={toggleShowCPassword}>
          {
            showCPassword  ?
             <Iconify
            icon="mdi:eye-off"
            size={18}
             color={color.secondary}
          /> :
          <Iconify
            icon="mdi:eye"
            size={18}
              color={color.secondary}
          />
          }
          
        </TouchableOpacity>
              </View>
              <Text style={{ marginBottom: '-10px', color: 'red', fontSize: 10 }}>
                {ConfirmPasswordError}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => HandleResetPassword()}
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
                  style={{ maxWidth: 26, maxHeight: scale(28) }}
                />
                <Text style={[{ color: 'white' }, fonts.h1]}>Loading...</Text>
              </>
            ) : (
              <Text style={[{ color: 'white' }, fonts.h1]}> Reset Password</Text>
            )}
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
