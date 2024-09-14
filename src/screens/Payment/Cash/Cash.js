import React, { useState } from 'react'
import { StatusBar, View ,Text,Image, Alert} from 'react-native'
import BarCodeScan from '../../../components/barCode/BarCodeScan'
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar'
import { color, textStyles } from '../../../styles/Styles'
import { scale } from 'react-native-size-matters'
import Button from '../../../components/button/Button'
import NumberPad from '../../../components/Common/NumberPad'
import CustomModal from '../../../components/modal/CustomModal'

function Cash({navigation}) {
  const [pinmodalVisible, setPinModalVisible] = useState(false);
  const [cash, setCash] = useState(null);

    const complete = (value) => {
        if(value != ''){
            setCash(value)
            setPinModalVisible(true)
        }else{
            Alert.alert(`Please insert Cash amount`)
        }


    }
    const handlePayment = (value) => {
        Alert.alert(`you have Recieved ${cash} ETB`)
    }
    
  return (
    <View style={[{flex:1, backgroundColor:color.white}]}>
    <StatusBar backgroundColor={color.primary}></StatusBar>
    <TopNavigationBar
        onPressBack={() => navigation.goBack()}
        backIcon={true}
        middleLabel={'Payment'}
    />
     <CustomModal
              modalVisibility={pinmodalVisible}
              setModalVisibility={setPinModalVisible}
              innerModal={<View style={[{padding:20,margin:20,backgroundColor:color.white, borderRadius:20}]}>
                <NumberPad
                pin={true}
                confirm={handlePayment}
                purpose={'pass'}
                updateModalVisible={()=>setPinModalVisible(false)}
              /></View>}/>
    <View style={[{ paddingHorizontal: scale(20) }]}>
        <Text style={[textStyles.text_bold, {}]}>Cash</Text>
    </View>
    <View style={[{margin:scale(20), flex:1, justifyContent:"center"}]}>
    <NumberPad
    
    IsPayment={true}
    complete={complete}
    />
    </View>
   
</View>
  )
}

export default Cash