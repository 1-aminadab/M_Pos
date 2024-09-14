import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Iconify } from 'react-native-iconify'
import { theme } from '../../../styles/stylesheet'
import { verticalScale, scale } from 'react-native-size-matters'
import { PermissionsAndroid } from 'react-native';
import { fonts } from '../../../styles/unistyle'
import CustomTextInput from '../../../components/input/CustomTextInput'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../../../styles/Styles'
import CustomDropDown from '../../../components/input/CustomDropDown'
import Button from '../../../components/button/Button'
import { addPrinterSetting, getPrinterSetting, updatePrinterSetting, deletePrinterSetting } from '../../../database/services/printerServiece/index'
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import generateUniqueID from '../../../utilities/uniqueIDGenerator';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar'




const RadioButton = ({ name, state, setState, onPressB }) => {
  return (<Pressable onPress={() => { onPressB ? onPressB() : null; setState(name) }} style={{ marginHorizontal: 25, backgroundColor: '#fff', height: 61, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', }}>
      <Text style={[{ paddingRight: 10, }, fonts.ptext]}>{name}</Text></View>
    {state == name ? <Iconify icon='ic:outline-radio-button-checked' color={theme.color.primary} /> : <Iconify icon='ic:round-radio-button-unchecked' color={theme.color.gray} />}
  </Pressable>)
}


const PrinterSettingScreen = ({ navigation }) => {
  const [active, setActive] = useState('')
  const [activePaper, setActivePaper] = useState('')
  const [succesModal, setSuccessModal] = useState(false);
  const [succesFailModalMessage, setSuccessFailModalMessage] = useState('');
  const [isFailModal, setIsFailModal] = useState(false);
  const [showWifiSetting, setshowWifiSetting] = useState(false)
  const [inputError, setInputError] = useState({});
  const [fetchedprinterSetting, setfetchedprinterSetting] = useState({});
  const [printerSetting, setprinterSetting] = useState({
    //Prodact data tobe added
    _id: '',
    ip: '192.168.1.2',
    port: '9100',
    printerWidth: '40',
    preference: active
  });
  useEffect(() => {
    setfetchedprinterSetting(getPrinterSetting())
  }, [])

  const fetchPrinterSetting = () => {
    if (fetchedprinterSetting.length > 0) {
      fetchedprinterSetting.forEach((setting) => {
        setprinterSetting((prevState) => ({
          ...prevState,
          _id: setting._id,
          ip: setting.printer_ip,
          port: setting.printer_port,
          preference: setting.selected_preference,
          printerWidth: setting.paper_width
        }));
        setActive(setting.selected_preference)
        setActivePaper(setting.paper_width)
      });
    }
  }
  useEffect(() => {
    fetchPrinterSetting()
  }, [fetchedprinterSetting]);
  const requestCameraPermission = async () => {
    handleSaveBluetoothSetting()
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Bluetooth permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function wifiValidation() {
    let isFormValid = true;
    const isValidIp = value => (/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/.test(value));
    // console.log(isValidIp('115.42.500.0'));
    console.log(isValidPrinterPort(printerSetting.port));

    function isValidPrinterPort(port) {
      const portNumber = parseInt(port, 10);
      return (
        Number.isInteger(portNumber) &&
        portNumber >= 1 &&
        portNumber <= 65535 &&
        String(portNumber) === port
      );
    }

    if (isValidIp(printerSetting.ip) != true) {
      setInputError({ ...inputError, ip: 'Invalid IP Adress!' });
      return false;
    }
    else if (isValidPrinterPort(printerSetting.port) != true) {
      setInputError({ ...inputError, port: 'Invalid Port Number!' });
      return false;
    }
    return true;
  }
  const handleSaveWifiSetting = () => {
    const newSetting = {
      _id: parseInt(generateUniqueID()),
      selected_preference: 'Wi-Fi',
      printer_ip: printerSetting.ip,
      printer_port: printerSetting.port,
      paper_width: printerSetting.printerWidth,
    };
    if (wifiValidation() && printerSetting._id == '') {
      try {
        addPrinterSetting(newSetting);
        fetchPrinterSetting()
        setSuccessFailModalMessage('printer Configuration Added Successfully!');
        setIsFailModal(false);
        setSuccessModal(true);
      } catch (err) {
        console.log('Unable to add config!', err);
      }
    } else if (wifiValidation()) {
      handleUpdateWifiSetting()
      setSuccessFailModalMessage('Printer Configuration Updated Successfully!');
      setIsFailModal(false);
      setSuccessModal(true);
      fetchPrinterSetting()
    } else {
      setSuccessFailModalMessage('Invalid Printer Configuration!');
      setIsFailModal(true);
      setSuccessModal(true);
    }
  }
  const handleSaveBluetoothSetting = () => {
    const newSetting = {
      selected_preference: 'Bluetooth',
      printer_ip: printerSetting.ip,
      printer_port: printerSetting.port,
      paper_width: printerSetting.printerWidth,
    };

    if (printerSetting._id == '') {
      addPrinterSetting({ ...newSetting, _id: parseInt(generateUniqueID()) });
      setSuccessFailModalMessage('Printer Preference Bluetooth Selected!');
      setIsFailModal(false);
      setSuccessModal(true);

    } else {
      updatePrinterSetting(printerSetting._id, newSetting);
      setSuccessFailModalMessage('Printer Preference Bluetooth Selected!');
      setIsFailModal(false);
      setSuccessModal(true);
      fetchPrinterSetting()
    }


  }
  const handleUpdateWifiSetting = () => {
    const newSetting = {
      selected_preference: 'Wi-Fi',
      printer_ip: printerSetting.ip,
      printer_port: printerSetting.port,
      paper_width: printerSetting.printerWidth,
    };


    if (wifiValidation() && printerSetting._id != '') {
      updatePrinterSetting(printerSetting._id, newSetting)
      setSuccessFailModalMessage('Printer Preference Wi-Fi Selected!');
      setIsFailModal(false);
      setSuccessModal(true);
      fetchPrinterSetting()
    } else {
      setSuccessFailModalMessage('Invalid Printer Configuration!');
      setIsFailModal(true);
      setSuccessModal(true);
    }

  }
  const handleUpdatePaperSetting = (width) => {
    const newSetting = {

      printer_ip: printerSetting.ip,
      printer_port: printerSetting.port,
      paper_width: width,
    };

    if (printerSetting._id == '') {
      addPrinterSetting({ ...newSetting, _id: parseInt(generateUniqueID()) });
      setSuccessFailModalMessage('Paper Size Preference Updated!');
      setIsFailModal(false);
      setSuccessModal(true);

    } else {
      updatePrinterSetting(printerSetting._id, newSetting);
      setSuccessFailModalMessage('Paper Size Preference Updated!');
      setIsFailModal(false);
      setSuccessModal(true);
      fetchPrinterSetting()
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SuccessFailModal
        fail={isFailModal}
        modalVisibility={succesModal}
        setModalVisibility={setSuccessModal}
        message={succesFailModalMessage}
      />
              <TopNavigationBar
            IsSetting={true}
            NavigationTitle={"Printer Setting"}
            onPressBack={() => navigation.goBack()}
        />


      <View style={{ margin: 25 }}><Text style={[fonts.ptext]}>Select your preference to print invoice </Text></View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton name="Wi-Fi" state={active} setState={setActive} onPressB={handleUpdateWifiSetting} />
        <RadioButton name="Bluetooth" state={active} setState={setActive} onPressB={requestCameraPermission} /></View>

      {active == 'Wi-Fi' ? <View>
        <View style={[{ borderRadius: 20 }]}>
          <Button onPress={() => { showWifiSetting == true ? setshowWifiSetting(false) : setshowWifiSetting(true) }} label={showWifiSetting == true ? 'Hide Advanced Wi-Fi Setting' : 'Show Advanced Wi-Fi Setting'} style={[{}]} height={35}
            textcolor={color.primary} fontSize={14}
          ></Button>
        </View>


        {showWifiSetting == true ? <View style={[{ paddingHorizontal: 20 }]}>
          {/* printer ip  */}
          <View>
            <CustomTextInput
              label={'Printer IP Adress'}
              placeholder={'Ex. 192.168.1.2'}
              input={printerSetting.ip}
              setInput={input => {
                setprinterSetting({ ...printerSetting, ip: input });
                setInputError({ ...inputError, ip: '' });
              }}

              autoCapitalize={'words'}
              error={inputError?.ip}
            />
            {inputError?.ip && (
              <Text style={styles.inputErrorText}>{inputError?.ip}</Text>
            )}
          </View>
          {/* printer ip  */}
          <View>
            <CustomTextInput
              label={'Printer Port Number'}
              placeholder={'Ex. 1901'}
              input={printerSetting.port}
              setInput={input => {
                setprinterSetting({ ...printerSetting, port: input });
                setInputError({ ...inputError, port: '' });
              }}

              autoCapitalize={'words'}
              error={inputError?.port}
            />
            {inputError?.port && (
              <Text style={styles.inputErrorText}>{inputError?.port}</Text>
            )}
          </View>
        
          {/* Save Button */}
          <View
            style={{
              marginBottom: 0,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <Button
              label={'Save'}
              btnBG={true ? color.primary : color.gray}
              onPress={handleSaveWifiSetting}
            />
          </View>
        </View> : <View></View>}
      </View> : <View></View>}
      <View style={[{ marginVertical: 20 }]}></View>

      <View style={{ marginHorizontal: 25 }}><Text style={[fonts.ptext]}>Select your paper preference in mm</Text></View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton name="40" state={activePaper} setState={setActivePaper} onPressB={() => handleUpdatePaperSetting('40')} />
        <RadioButton name="80" state={activePaper} setState={setActivePaper} onPressB={() => handleUpdatePaperSetting('80')} /></View>


    </View>
  )
}

export default PrinterSettingScreen

const styles = StyleSheet.create({
  inputErrorText: { fontSize: 12, marginLeft: 5, color: color.primary },
})