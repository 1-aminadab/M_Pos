import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
// import { DoneModals } from "../../components/Modal/Modals";
import {DoneModals} from '../../components/modal/Modals'
import { fonts } from "../../styles/unistyle";
const PINScreen = ({ navigation }) => {
  const [comfirm,setComfirm]=useState(false)

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <DoneModals setModalVisible={setComfirm} message={"Pin saved"} modalVisible={comfirm}/>
      <View
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
        <Text style={[fonts.h1]}>PIN</Text>
        <Pressable
        onPress={()=>setComfirm(!comfirm)}
        >
        <Text
            style={[{
              
              color: theme.color.primary,
            },fonts.h1]}>
           Save
          </Text></Pressable>
      </View>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          backgroundColor: "#fff",
          marginTop: 63,
        }}
      >
        <View style={{ alignItems: "center",width: "100%", }}>
          <Text style={[fonts.ptext]}>
            Enter 4 digit pin
          </Text>
          <TextInput
            placeholder="****"
            keyboardType='numeric'
            style={{ fontSize: 18, color: theme.color.blue, marginTop: 65,letterSpacing: 3,minWidth:200, textAlign:'center', }}
            maxLength={4}
            
            placeholderTextColor={theme.color.gray}
          />
        </View>
      </View>
    </View>
  );
};

export default PINScreen;

const styles = StyleSheet.create({});
