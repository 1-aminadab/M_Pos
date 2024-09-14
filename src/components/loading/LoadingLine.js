import LottieView from 'lottie-react-native'
import React from 'react'
import {View, StyleSheet} from 'react-native'
export default function LoadingLine() {
  return (
    <View style={styles.container}>
        <LottieView source={require('../../assets/splash/Animation - 1698868142128.json')} autoPlay loop />
    </View>
  )
}

const styles = StyleSheet.create({
   container: {}
})