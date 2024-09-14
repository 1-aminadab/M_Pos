import React, { useState } from 'react'
import { StatusBar, View ,Text,Image} from 'react-native'
import BarCodeScan from '../../../components/barCode/BarCodeScan'
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar'
import { color, textStyles } from '../../../styles/Styles'
import { scale } from 'react-native-size-matters'
import Button from '../../../components/button/Button'


function PaymentLink({navigation}) {
  return (
    <View style={[{flex:1, backgroundColor:color.white}]}>
    <StatusBar backgroundColor={color.primary}></StatusBar>
    <TopNavigationBar
        onPressBack={() => navigation.goBack()}
        backIcon={true}
        middleLabel={'Payment'}
    />
    <View style={[{ paddingHorizontal: scale(20)}]}>
        <Text style={[textStyles.text_bold, {}]}>Payment Link</Text>
        <Text style={[textStyles.text_small_Gray, {}]}>Generate Payment Link to Proceed</Text>
    </View>
    <View style={[{padding:20}]}>
    <Button
    label={"Generate Payment Link"}
    theme={'primary'}
    btnBG={color.secondary}
    /></View>
</View>
  )
}

export default PaymentLink