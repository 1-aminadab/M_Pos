import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { theme } from '../../styles/stylesheet'
import { scale, verticalScale } from 'react-native-size-matters'

const ShareRefer = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={{paddingHorizontal:20}}><TopNavigationBar backIcon={true} middleLabel={"Share Reference"} onPressBack={()=>navigation.goBack()} /></View>
      <View style={{paddingHorizontal:20}}><Image source={require("../../assets/images/sharingreference.png")} resizeMode='contain' /></View>
      <Pressable style={{  borderRadius: 10,
                    backgroundColor:
                    //&& licensePH != license
                     theme.color.primary,
                       
                    paddingVertical: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: verticalScale(40),

                    width: '100%',}}><Text>Share</Text></Pressable>
    </View>
  )
}

export default ShareRefer

const styles = StyleSheet.create({})