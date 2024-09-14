import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { color } from '../../styles/Styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonWithIcon = ({Icon,CustomIcon, CustomWidth, label, theme, onPress, height, btnBG, disabled, fontSize, textcolor,style ,paddingHorizontal}) => {

 const styles = StyleSheet.create({
    btnContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      height: height ? height : 66,
      flexDirection: 'row',
      gap: 10,
      width: '100%',
      borderRadius: 10,
      paddingHorizontal:paddingHorizontal?paddingHorizontal: 10,
    },
    btnLabel: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: fontSize ? fontSize : 16,
      fontWeight: '500',
      textTransform: 'capitalize',
    },
    style:{
      style
    }
  });

  return (
    <>
    <View style={[{width:CustomWidth ? CustomWidth : 160}]}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.5}
        style={[
          styles.btn,
          { backgroundColor: btnBG},
        ]}
        onPress={!disabled ? onPress : null}>
        <Image
        source={Icon}
        style={{width: 20, height: 20}}
        resizeMode="cover"
      />
      {
        CustomIcon
      }
        <Text style={[styles.btnLabel, { color: 'white' }]}>{label}</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default ButtonWithIcon;