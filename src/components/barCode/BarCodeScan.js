import { View, StyleSheet, Vibration, StatusBar, Modal, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { color, textStyles } from '../../styles/Styles'
import Frame from '../../assets/icons/frame.png'



function BarCodeScan({ showScanBarcode, setshowScanBarcode, onbarCodeScanned,topText, }) {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off)
  //   const [showScanBar, setshowScanBar] = useState(showScanBarcode)



  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={showScanBarcode}
      onRequestClose={() => {
        setshowScanBarcode(!showScanBarcode);
      }}>
      <QRCodeScanner reactivate={true} containerStyle={[{ backgroundColor: 'transparent' }]} cameraStyle={[{ height: Dimensions.get('window').height }]} topViewStyle={[{ height: 0, flex: 0 }]} cameraContainerStyle={[{ padding: 0 }]} reactivateTimeout={2000}
        onRead={onbarCodeScanned}
        flashMode={flash}
      />
      <View style={[{ flexDirection: 'row', justifyContent: 'center', }]}>



        <View style={[styles.overlay, { top: -Dimensions.get('window').height, left: 0, height: Dimensions.get('window').height / 2 - 60, width: Dimensions.get('window').width }]}>

        </View>
        <View style={[styles.overlay, { top: -Dimensions.get('window').height / 2 - 60, left: 0, height: 160, width: 40 }]}>

        </View>
        <View style={[styles.overlay, { top: -Dimensions.get('window').height / 2 - 60, right: 0, height: 160, width: 40 }]}>

        </View>

        <View style={[styles.overlay, { top: -Dimensions.get('window').height / 2 + 100, left: 0, height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width }]}>

        </View>
        <View style={[{ position: 'absolute', top: -Dimensions.get('window').height / 2 - 100, left: 0, opacity: 1, padding: 20 }]}>
          <Image style={[{ objectFit: 'fill', width: Dimensions.get('window').width - 40, height: 200 }]}
            source={require('../../assets/icons/frame.png')}
          />
        </View>
        {topText?<View style={[{position: 'absolute', top: -Dimensions.get('window').height+50,backgroundColor:'white', width:Dimensions.get('window').width}]}>{topText}</View>:<Text style={[textStyles.text_bold,{ fontSize: 20, position: 'absolute', top: -Dimensions.get('window').height + 100, left: 50, color: 'white', }]}>SCANNING ...</Text>}

        {topText?null:<TouchableOpacity style={[{ alignItems: "center", padding: 10, fontWeight: 'bold', fontSize: 20, position: 'absolute', top: -Dimensions.get('window').height + 90, right: 50, color: 'white', padding: 10, backgroundColor: 'white', borderRadius: 50 }]} onPress={() => setshowScanBarcode(!showScanBarcode)}><MaterialIcons name="close" size={30} color={'black'} /></TouchableOpacity>}
        <View>
          {(flash == RNCamera.Constants.FlashMode.torch) ? <TouchableOpacity style={[{ alignItems: "center", padding: 10 }]} onPress={() => setFlash(RNCamera.Constants.FlashMode.off)}>
            <MaterialIcons name="flash-off" size={35} color={color.primary} /></TouchableOpacity> : <TouchableOpacity style={[{ alignItems: "center", padding: 10 }]} onPress={() => setFlash(RNCamera.Constants.FlashMode.torch)}>
            <MaterialIcons name="flash-on" size={35} color={'white'} /></TouchableOpacity>}</View>


      </View>

    </Modal>
  )
}

export default BarCodeScan;
const styles = StyleSheet.create({ overlay: { fontWeight: 'bold', fontSize: 20, position: 'absolute', color: 'white', backgroundColor: 'black', opacity: 0.5 } })