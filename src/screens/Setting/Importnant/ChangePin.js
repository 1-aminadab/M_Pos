import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Iconify } from "react-native-iconify";
import { verticalScale, scale } from "react-native-size-matters";
import { theme } from "../../../styles/stylesheet";
import i18n from "../../../language/i18n";
import { color, componentStyles } from '../../../styles/Styles'

import { fonts } from "../../../styles/unistyle";
import { AuthContext } from "../../../hooks/useContext/AuthContext";
import Toast from "react-native-toast-message";
import CustomTextInput from "../../../components/input/CustomTextInput";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import TopNavigationBar from "../../../components/top_navigation/TopNavigationBar";


const ChangePin = ({ navigation, route }) => {
  const { logout } = useContext(AuthContext)
  const { userInfo } = useContext(AuthContext)
  // console.log(userInfo)
  const { screen } = route.params;
  const [oldPassword, setoldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isInternetReachable, setisInternetReachable] = useState(false)
  const [isloading, setIsloading] = useState(false);




  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setisInternetReachable(state.isInternetReachable)
    });
  }, [])


  const changePassword = async (_id, oldPassword, newPassword) => {
    if (isInternetReachable === true) {
      setIsloading(true);
      console.log('first')
      const url = `https://account.qa.addissystems.et/change-Password/${_id}`;
      const requestBody = {
        "oldPassword": oldPassword,
        "password": newPassword
      };

      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': ' application/json'
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!response.ok) {
          setIsloading(false);
          Toast.show({
            type: 'error',
            text1: 'Incorrect Old Password.',
          });
        } else {
          setIsloading(false);
          Toast.show({
            type: 'success',
            text1: 'Password Successfuly Changed',
          });

          { logout() }
        }
      } catch (error) {
        setIsloading(false);
        console.log(error)
        Toast.show({
          type: 'error',
          text1: 'Network error',
          text2: error.msg,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please Connect to Internet',
      })
    }
  };


  const savePassword = () => {

    if (oldPassword == '') {
      Toast.show({
        type: 'error',
        text1: 'Please Insert Old Password',
      })
    }
    else if (newPassword == '') {
      Toast.show({
        type: 'error',
        text1: 'Please Insert New Password',
      })
    }
    else if (confirmPassword == '') {
      Toast.show({
        type: 'error',
        text1: 'Please Confirm Password',
      })
    }
    else if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      })
    } else {
      changePassword(userInfo._id, oldPassword, newPassword)
    }
  }
  // console.log("oldPassword")
  // console.log(userInfo._id)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          height: verticalScale(66),
          justifyContent: "space-between",
          paddingHorizontal: scale(25),
          alignItems: "center",
          //paddingVertical:0
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Iconify icon="ion:chevron-back-outline" size={20} />
        </Pressable>
        <Text style={[fonts.h1]}>
          {screen == "otp" ? "Set Password" : i18n.t("changepassword")}
        </Text>
        <View style={{ marginHorizontal: scale(25) }}></View>
      </View> */}
      <TopNavigationBar
          // backIcon={true} 
          NavigationTitle={'Change Password'}
          onPressBack={() => navigation.goBack()}
          middleLabel={'Setting'}
          IsSetting={true}
        />
      <View style={{ margin: scale(25) }}>
        <CustomTextInput
          secureTextEntry={true}
          label='Old Password'
          placeholder='Old Password'
          input={oldPassword}
          setInput={value => setoldPassword(value)}
          icon={<Iconify icon="material-symbols:lock-outline" size={18} color={"#cacaca"}
          />}

        />
        <CustomTextInput
          secureTextEntry={true}
          label='New Password'
          placeholder='New Password'
          input={newPassword}
          setInput={value => setnewPassword(value)}
          icon={<Iconify icon="material-symbols:lock-outline" size={18} color={"#cacaca"}

          />}

        />
        <CustomTextInput
          secureTextEntry={true}
          label='Confirm Password'
          placeholder='Confirm Password'
          input={confirmPassword}
          setInput={value => setconfirmPassword(value)}
          icon={<Iconify icon="material-symbols:lock-outline" size={18} color={"#cacaca"}
          />}

        />
      
        <Pressable
          onPress={() => savePassword()}
          style={{
            borderRadius: 10,
            backgroundColor: color.primary,
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: verticalScale(15),
          }}
        >
          <Text style={[{ color: "white", }, fonts.h1]}>
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChangePin;

const styles = StyleSheet.create({});
