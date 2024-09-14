import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {theme} from '../../styles/stylesheet';
import {Iconify} from 'react-native-iconify';
import {verticalScale, scale} from 'react-native-size-matters';
import {fonts} from '../../styles/unistyle';
import {AuthContext} from '../../hooks/useContext/AuthContext';
import Devicemgt from 'react-native-device-info';
import DismissKeyboardHOC from '../../components/DismissKeyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../styles/Styles';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [incorrect, setIncorrect] = useState(false);
  const {login, suspendedUntil_Save} = useContext(AuthContext);
  const [device, setDevice] = useState(null);
  const [Ip, setIp] = useState(null);
console.log(email)
  Devicemgt.getDeviceName().then(deviceName => {
    setDevice(deviceName);
  });
console.log(device)
  Devicemgt.getIpAddress().then(ip => {
    setIp(ip);
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function logEmail() {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      if (userData && userData.email) {
        setEmail(userData.email);
      } else {
        console.log('Email does not exist');
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  }

  // Call the function
  logEmail();

  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setIncorrect(false);

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (!valid) {
      setIncorrect(true);
    }

    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      return login(email, password, device);
    }
  };

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return 'Good morning ☀️';
    } else if (currentHour < 17) {
      return 'Good afternoon 🌞';
    } else {
      return 'Good evening 🌙';
    }
  }

  // Usage example
  const greeting = getGreeting();

  return (
    <View style={{backgroundColor: theme.color.white, flex: 1}}>
      <ScrollView>
        <DismissKeyboardHOC>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 15,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
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
            <View
              style={{
                alignItems: 'center',
                marginTop: verticalScale(35),
                paddingTop: verticalScale(50),
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 24,
                  marginVertical: verticalScale(5),
                  textAlign: 'center',
                  color: color.primary
                }}>
                M-POS
              </Text>
              {/* <Text style={[fonts.h1]}>Sign In</Text> */}
              <Text style={{fontSize: 25}}>{greeting}</Text>
              <View style={{marginTop: 20}}></View>
            </View>
            
            <View
              style={{
                paddingHorizontal: scale(5),
                flex: 1,
                justifyContent: 'center',
              }}>
              <View style={{borderWidth: 0}}>
                <View style={{marginTop: verticalScale(2)}}>
                  <Text
                    style={[
                      {
                        marginBottom: 6,
                        color: '#cacaca',
                      },
                      fonts.ptext,
                    ]}>
                    {' '}
                    Password
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      borderRadius: 10,
                      borderWidth: 0.7,
                      borderColor: passwordError ? 'red' : color.secondary,
                      paddingLeft: 10,
                      paddingRight: 10,
                      alignItems: 'center',
                    }}>
                    <Iconify
                      icon="mdi:lock-outline"
                      size={18}
                      color={color.secondary}
                    />
                    <TextInput
                      value={password}
                      onChangeText={text => setPassword(text)}
                      style={[
                        {
                          flex: 1,
                          color: 'black',
                        },
                      ]}
                      // maxLength={10}
                      secureTextEntry={!showPassword}
                      placeholder="Password"
                      placeholderTextColor={theme.color.gray}
                    />
                    <TouchableOpacity onPress={toggleShowPassword}>
                      {showPassword ? (
                        <Iconify icon="mdi:eye-off" size={18} color={color.secondary} />
                      ) : (
                        <Iconify icon="mdi:eye" size={18} color={color.secondary} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      marginBottom: '-10px',
                      color: 'red',
                      fontSize: 10,
                    }}>
                    {passwordError}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    paddingHorizontal: scale(8),
                    marginTop: verticalScale(10),
                  }}>
                  <Pressable
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={[{color: color.secondary}, fonts.smText]}>
                      Forgot Password?
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => handleLogin()}
                  style={{
                    borderRadius: 10,
                    backgroundColor: color.primary,
                    paddingVertical: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: verticalScale(50),

                    width: '100%',
                  }}>
                  <Text style={[{color: 'white'}, fonts.h1]}>Sign In</Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: scale(7),
                  alignSelf: 'center',
                }}></View>
            </View>
          </View>
        </DismissKeyboardHOC>
      </ScrollView>
    </View>
  );
};

export default LogIn;
