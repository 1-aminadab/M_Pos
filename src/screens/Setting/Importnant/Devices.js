import {
  StyleSheet,
  Text,
  View, Alert, Dimensions
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, componentStyles } from '../../../styles/Styles'
import Button from '../../../components/button/Button';
import { ComfirmationModal } from '../../../components/modal/Modals';
import DeviceInfo from 'react-native-device-info';

function Devices({ navigation }) {
  const [terminateAll, setTerminateAll] = useState(false)
  const [terminate, setTerminate] = useState(false)
  const terminateSession = () => {
    Alert.alert('terminated')
  }

  const Devices = ({ deviceName, appVersion, location, buttonLabel, onPress, thisDevice }) => {
    return <View style={[{ flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderColor: color.lightGray }]}>
      <View>
        
        <MaterialIcons name="devices" size={30} color={color.textGray} />
      </View>
      <View style={[{ paddingHorizontal: 20, flexDirection: thisDevice ? 'column' : 'row', alignItems: thisDevice ? 'left' : 'center', width: Dimensions.get('window').width - 65 }]}>
        <View style={[{ paddingEnd: 15 }]}>
          <Text style={[{ fontSize: 16, color: color.textDark, fontWeight: 500 }]}>{deviceName}</Text>
          <Text style={[{ color: color.textGray, paddingVertical: 5 }]}>{appVersion}</Text>
          <Text style={[{ color: color.textGray, marginBottom: 15 }]}>{location}</Text>
        </View>
        <View style={[{ width: thisDevice ? 'auto' : 135 }]}>
          <Button
            label={buttonLabel}
            textcolor={color.warning}
            theme={'secondary'}
            btnBG={color.warningOutline}
            onPress={onPress}
          /></View>
      </View>
    </View>
  }
  return (
    <View style={{ flex: 1, }}>
      <ComfirmationModal
        modalVisible={terminateAll}
        setModalVisible={setTerminateAll}
        message={'Are you sure you want to terminate all other sessions'}
        setComfirm={terminateSession}
        warn={true}
      />
      <ComfirmationModal
        modalVisible={terminate}
        setModalVisible={setTerminate}
        message={'Are you sure you want to terminate this session'}
        setComfirm={terminateSession}
        warn={true}
      />

      <TopNavigationBar
        NavigationTitle={'Devices'}
        onPressBack={() => navigation.goBack()}
        middleLabel={'Setting'}
        IsSetting={true}
      />

      <Text style={componentStyles.settingTitle}>This Device</Text>
      <View style={[componentStyles.settingGroup]}>
        <Devices
          deviceName={'TECHNO SPARK 10C'}
          appVersion={'M-POS 2.01'}
          location={'Addis Ababa, Ethiopia'}
          buttonLabel={'Terminate All Other Sessions'}
          onPress={() => setTerminateAll(true)}
          thisDevice={true}
        />
      </View>
      <Text style={componentStyles.settingTitle}>Active Sessions</Text>
      <View style={[componentStyles.settingGroup]}>
        <Devices
          deviceName={'TECHNO SPARK 10C'}
          appVersion={'M-POS 2.01'}
          location={'Addis Ababa, Ethiopia'}
          buttonLabel={'Terminate'}
          onPress={() => setTerminate(true)}
        />
        <Devices
          deviceName={'TECHNO SPARK 10C'}
          appVersion={'M-POS 2.01'}
          location={'Addis Ababa, Ethiopia'}
          buttonLabel={'Terminate'}
          onPress={() => setTerminate(true)}
        />
      </View>
    </View>
  )
}

export default Devices