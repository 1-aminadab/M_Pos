import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { theme } from '../../styles/stylesheet'
import { Iconify } from 'react-native-iconify'
import { scale, verticalScale } from 'react-native-size-matters'
import Abyssinia from "../../assets/images/abisinia.png"
export const Banks = ({ icon, value, state, setState, marginHorizontal }) => {
  return (<Pressable
    onPress={() => setState(value)}
    style={[{
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scale(4),
      paddingVertical: verticalScale(8)
    },
    state == value ? { backgroundColor: "rgba(50, 34, 198, 0.10)", borderRadius: 10, } : {}]}>
    {state == value ? <View style={{ position: 'absolute', top: 0, right: 4, backgroundColor: "#3222C6", borderRadius: 15, padding: 2, zIndex: 1 }}><Iconify icon='charm:tick' size={17} color={"#fff"} /></View> : null}
    <Image source={icon} resizeMode='contain' style={{ height: 70, width: 70, marginHorizontal: marginHorizontal }} />
  
  </Pressable>)
}
const ChooseBank = ({ navigation }) => {
  const [selectedBank, setSelectedBank] = useState('')
  const BANKS = [
    {
      name: 'Abyssinia',
      logo: require("../../assets/images/abisinia.png"),
    },
    {
      name: 'Wegagen',
      logo: require('../../assets/images/wegagen.png'),
    },
    {
      name: 'Awash',
      logo: require('../../assets/images/awash.png'),
    },
    {
      name: 'Amhara',
      logo: require('../../assets/images/amhara.png'),
    },
    {
      name: 'CBE',
      logo: require('../../assets/images/cbe.png'),
    },
    {
      name: 'Buna',
      logo: require('../../assets/images/buna.png'),
    },
    {
      name: 'Hibret',
      logo: require('../../assets/images/hibret.png'),
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: 20 }}><TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={'Payment'} thirdLabel={'Next'} onPressGo={() => navigation.navigate("AccountNumber")} onGoCondition={theme.color.primary} /></View>
      <View style={{ paddingHorizontal: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', width: "100%", backgroundColor: '#fff', gap: 20 }}>
        {BANKS?.map(({ name, logo }) => (<Banks icon={logo} value={name} state={selectedBank} setState={setSelectedBank} key={name} />))}
      </View>
    </View>
  )
}

export default ChooseBank

const styles = StyleSheet.create({})