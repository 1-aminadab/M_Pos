import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { scale } from 'react-native-size-matters'

const SyncHistory = ({navigation}) => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{paddingHorizontal:scale(20)}}><TopNavigationBar backIcon={true} onPressBack={()=>navigation.goBack()} middleLabel={"Sync History"}/>
      </View>
      <View >
        
      </View>
    </View>
  )
}

export default SyncHistory

const styles = StyleSheet.create({})