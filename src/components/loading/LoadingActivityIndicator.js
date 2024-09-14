import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { color } from '../../styles/Styles'

const LoadingActivityIndicator = ({size, loadingColor}) => {
  return (
    <View style={{}}>
      <ActivityIndicator size={size} color={loadingColor} />
    </View>
  )
}

export default LoadingActivityIndicator