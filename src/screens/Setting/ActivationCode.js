import { StyleSheet, Text, View, TextInput  } from 'react-native'
import React, { useState,useEffect } from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { theme } from '../../styles/stylesheet'
import { scale, verticalScale } from 'react-native-size-matters'
import {} from 'react-native-paper'
import { DoneModals } from '../../components/modal/Modals'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../../styles/unistyle'
const ActivationCode = ({navigation}) => {
    const [modalVisible,setModalVisible]=useState(false)
    const [d,setD]= useState(false)
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('bank', value);
        } catch (e) {
          // saving error
          console.log(e)
        }
      }
    useEffect(() =>{
        if(d&&!modalVisible)navigation.navigate("Payment",{data:true})
    },[modalVisible])
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <DoneModals message={"Comfirmed!"} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={{paddingHorizontal:20}}><TopNavigationBar onPressBack={()=>navigation.goBack()} onPressGo={()=>{storeData('Abyssinia'); setModalVisible(true);setD(true);}} backIcon={true} middleLabel={"Activation Code"} thirdLabel={"Done"} onGoCondition={theme.color.primary} /></View>
      <View style={{alignItems:'center',paddingVertical:verticalScale(40)}}><Text style={[fonts.ptext]} >We have sent the code to your Phone Number </Text>
      <Text style={[{color:theme.color.blue,marginVertical:verticalScale(15)},fonts.ptext]}>+251 911 223344</Text>
      <View style={{flexDirection:'row',gap:10,marginTop:verticalScale(60)}}>
        <View style={{borderWidth:1,borderColor:theme.color.blue,}}>
    <TextInput style={[styles.inputCode,fonts.h3]}  maxLength={1} keyboardType='numeric' />
        </View>
        <View  style={{borderWidth:1,borderColor:theme.color.blue}}>
    <TextInput keyboardType='numeric' style={[styles.inputCode,fonts.h3]}  maxLength={1} />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue}}>
    <TextInput keyboardType='numeric' style={[styles.inputCode,fonts.h3]} maxLength={1} />
        </View>
        <View style={{borderWidth:1,borderColor:theme.color.blue}}>
    <TextInput keyboardType='numeric' style={[styles.inputCode,fonts.h3 ]} maxLength={1} />
        </View>
      </View>
      </View>
    </View>

  )
}

export default ActivationCode

const styles = StyleSheet.create({
    inputCode:{
        backgroundColor:'#F9F7F7',
        //padding:0,
        padding:verticalScale(20),
        color:theme.color.blue,

        
    }
})