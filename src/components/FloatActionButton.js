import { StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify'
import { verticalScale,scale } from 'react-native-size-matters'
import { color } from '../styles/Styles'

const FloatActionButton = ({navigation}) => {
  return (
    <>
       <TouchableOpacity
        style={styles.float}
        onPress={() => navigation.navigate('add-item')}

      >
        <Iconify icon="mdi:plus" size={35} color={"white"} />
      </TouchableOpacity>
    </>
  )
}

export default FloatActionButton

const styles = StyleSheet.create({
    float: {
    height: verticalScale(58),
    elevation: verticalScale(2),
    width: scale(58),
    borderRadius: scale(50),
    backgroundColor: color.secondary,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: scale(25),
    bottom: verticalScale(40),
},
})