import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const LogIn = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>LogIn</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  /* Rules */
  // Screen names should be CamelCase like ProductStack.js
  // Don't use fontWeight in number value like this (fontWeight: 500) rather use in string like (fontWeight: '500') it may throw an error!
  // Allways try to wright neat codes with comments as much as possible! someone may be maintain it latter.
  // You can Ignore this after you read it. Feel free to modify this file and even create from scratch, this is just template to work with the same flow.
  

export default LogIn