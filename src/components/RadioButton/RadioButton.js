import React from "react";
import { View, Text, Pressable } from "react-native";
import { Iconify } from "react-native-iconify";
import { theme } from "../../styles/stylesheet";
const RadioButton = ({ name, state, setState }) => {
  //console.log(flag)
  return (<Pressable onPress={() => setState(name)} style={{
    backgroundColor: '#fff',
    height: 61,
    // borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
    <View style={{ flexDirection: 'row', }}>
      <Text style={{ fontSize: 20, paddingRight: 10, }}>{name}</Text></View>
    {state == name ? <Iconify icon='ic:outline-radio-button-checked' color={theme.color.primary} /> : <Iconify icon='ic:round-radio-button-unchecked' color={theme.color.gray} />}
  </Pressable>)
}
export default RadioButton