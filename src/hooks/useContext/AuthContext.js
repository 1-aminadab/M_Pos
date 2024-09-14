import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import realm from '../../database/index';
export const AuthContext = createContext();
import NetInfo from '@react-native-community/netinfo';
import { REACT_NATIVE_PARTYINFO_API, REACT_NATIVE_VERIFY_PARTY_TOKEN, REACT_NATIVE_LOGIN_API, REACT_NATIVE_FILEUPLOAD_API, REACT_NATIVE_DELETEMYACCOUNT_API, REACT_NATIVE_CHANGEPASSWORD_API, REACT_NATIVE_VERIFY_ACCOUNT_TOKEN } from '@env'

export const AuthProvider = ({ children }) => {
  const [isloading, setIsloading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [suspendedUntil_Save, setSuspendedUntil_Save] = useState(null);
  const [partyData, setPartyData] = useState([]);
  const [appLock, setAppLock] = useState(null);

 console.log(userToken)
  function startCountdown(suspendedUntil) {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeRemaining = suspendedUntil - currentTime;

      if (timeRemaining <= 0) {
        AsyncStorage.removeItem('suspendedUntilSave');
        setSuspendedUntil_Save(null);
        clearInterval(countdownInterval);
      }
    }, 1000); // Update every 1 second
  }

  const login = async (email, password, device) => {
    console.log(email, password, device);
    setIsloading(true);
    try {
      const response = await fetch(
        REACT_NATIVE_LOGIN_API,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            deviceType: device,
          }),
        },
      );

      const data = await response.json();
      console.log("here is the data u want",data);

      if (!response.ok) {
        // Check if the response indicates a suspended account
        if (
          data.success === false &&
          data.message === 'Account Suspended. Try again later.'
        ) {
          // const suspendedUntil = new Date(parseInt(data.suspendedUntil, 10)).getTime();
          await AsyncStorage.setItem('suspendedUntilSave', 'true');
          const suspendedUntilTimestamp = parseInt(data.suspendedUntil, 10);
          if (!isNaN(suspendedUntilTimestamp)) {
            startCountdown(suspendedUntilTimestamp);
          } else {
            console.error(
              'Error: Invalid timestamp retrieved from AsyncStorage.',
            );
          }

          setIsloading(false);
          Toast.show({
            type: 'error',
            text1: 'Account Suspended',
            text2: `Try again later. Suspended until: 15 minutes`,
          });
          return; // Exit the function if the account is suspended
        } else {
          Toast.show({
            type: 'success',
            text1: 'Account Login',
            text2: data.message
          });
        }
      } else {
        Toast.show({
          type: 'success',
          text1: 'Account Login',
          text2: data.message
        });
      }
   console.log(data);
      setUserToken(data.token);
      setUserInfo(data);

      // Store user token and data in AsyncStorage
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      fetchPartyData(data.Uid)

      setIsloading(false);
      Toast.show({
        type: 'success',
        text1: 'Successfully logged in',
      });
    } catch (error) {
      setIsloading(false);
      // Display an error message
      Toast.show({
        type: 'error',
        text1: 'Login error',
        // text2: error.message,
        text2: "Invalid username or password"
      });
    }
  };

  async function fetchPartyData(Uid) {
    try {
      const response = await fetch(`${REACT_NATIVE_PARTYINFO_API}${Uid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': REACT_NATIVE_VERIFY_PARTY_TOKEN
          },
        });
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      const responseData = await response.json();

      setPartyData(responseData.party[0]);
      AsyncStorage.setItem('partyData', JSON.stringify(responseData.party[0]));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const logout = () => {
    setIsloading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsloading(false);
  };
  // console.log({'appLock':JSON.parse(AsyncStorage.getItem('appLock'))})

  const isLoggedIn = async () => {
    try {
      setIsloading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      let partyData = await AsyncStorage.getItem('partyData');
      let appLock = await AsyncStorage.getItem('appLock');
      let suspendedUntils = AsyncStorage.getItem('suspendedUntilSave');

      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
        setPartyData(JSON.parse(partyData));
        setSuspendedUntil_Save(suspendedUntils);
      }

      appLock = JSON.parse(appLock);
      if (appLock) {
        setAppLock(appLock)
      }
      setIsloading(false);
    } catch (error) {
      console.log('islogged in error' + error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);



  const updateProfilePic = async (_id, image) => {
    console.log("///////////");
   console.log(_id, image);
   console.log("///////////");

  
    if (isInternetReachable) {
      setIsloading(false);
      const url = REACT_NATIVE_FILEUPLOAD_API;
      const imagePath = image;
      const formData = new FormData();
      formData.append('token', userToken);
      formData.append('profilePicture', {
        uri: imagePath,
        type: 'image/jpg',
        name: 'profilePicture.png',
      });

      try {
        const response = await fetch('http://localhost:8010/profile/uploads', {
          method: 'POST',
          
          headers: {
            Accept: 'multipart/form-data',
            'content-type': 'multipart/form-data',
            'x-auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpdHN1bWdldHU4OEBnbWFpbC5jb20iLCJpYXQiOjE3MDE2ODQ2MDIsImp0aSI6InVuaXF1ZV90b2tlbl9pZCJ9._ph51N4UFt-ZOckF1w3yAKotBfvt7QCnEqj_BayPku4'
          },
          body: formData,
        });
        const data = await response.json();
          console.log(response);
        if (!response.ok) {
          setIsloading(false);
          Toast.show({
            type: 'error',
            text1: 'Profile Picture Update Failed',
            text2: data.msg,
          });
          // navigation.navigate('Edit');
        } else {
          setIsloading(false);
          Toast.show({
            type: 'success',
            text1: 'Profile Picture Successfully Updated',
          });
          const updatedUserInfo = {
            ...userInfo,
            profilePicture: image,
          };
          setUserInfo(updatedUserInfo);
          // Update local storage with the updated userInfo
          await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        }
      } catch (error) {
        setIsloading(false);
        Toast.show({
          type: 'error',
          text1: 'Profile Picture Update error',
          text2: error.msg,
        });
        console.log(error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please Connect to Internet',
      });
    }
  };

  const deleteAccount = async _id => {
    if (isInternetReachable === true) {
      setIsloading(true);
      const url = REACT_NATIVE_DELETEMYACCOUNT_API;
      const requestBody = {
        _id: _id,
      };

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': ' application/json',
            Authorization: `${userInfo.token}`,
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!response.ok) {
          setIsloading(false);
          Toast.show({
            type: 'error',
            text1: 'Internal Server Error',
            text2: data.message,
          });
        } else {
          setIsloading(false);
          Toast.show({
            type: 'success',
            text1: 'Account Successfuly Deleted',
          });
          logout();
          await AsyncStorage.clear()
          realm.write(() => {
            realm.deleteAll();
          });
        }
      } catch (error) {
        setIsloading(false);
        Toast.show({
          type: 'error',
          text1: 'Network error',
          text2: error.message,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please Connect to Internet',
      });
    }
  };
  const changePassword = async (_id, oldPassword, newPassword) => {
    if (isInternetReachable === true) {
      setIsloading(true);
      const url = `${REACT_NATIVE_CHANGEPASSWORD_API}${_id}`;
      const requestBody = {
        oldPassword: oldPassword,
        password: newPassword,
      };

      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': ' application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!response.ok) {
          setIsloading(false);
          Toast.show({
            type: 'error',
            text1: 'Incorrect Old Password.',
            // text2: data.msg,
          });
        } else {
          setIsloading(false);
          Toast.show({
            type: 'success',
            text1: 'Password Successfuly Changed',
          });
          // logout()
        }
      } catch (error) {
        setIsloading(false);
        Toast.show({
          type: 'error',
          text1: 'Network error',
          // text2: error.message,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please Connect to Internet',
      });
    }
  };

  const [isInternetReachable, setisInternetReachable] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setisInternetReachable(state.isInternetReachable);
    });
  }, []);


  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isloading,
        userToken,
        userInfo,
        suspendedUntil_Save,
        updateProfilePic,
        deleteAccount,
        changePassword,
        partyData,
        appLock,
        setAppLock,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
