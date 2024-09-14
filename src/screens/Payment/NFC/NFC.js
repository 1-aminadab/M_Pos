import React, { useEffect, useState } from 'react';
import { StatusBar, View, TouchableOpacity, Text, Image, Modal, ActivityIndicator } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, textStyles } from '../../../styles/Styles';
import { scale } from 'react-native-size-matters';
import CustomModal from '../../../components/modal/CustomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import emv from 'node-emv'; 
import { StyleSheet } from 'react-native';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import BottomModal from '../../../components/modal/BottomModal';
import CustomTextInput from '../../../components/input/CustomTextInput';
import Button from '../../../components/button/Button';

const NfcDisplay = ({ data }) => {
      const [NFCvalue, setNFCValue] = useState({
        amount: '',
        reason: '',
        inv_data:''
    });
    const [showAddAmount, setshowAddAmount] = useState(false);

  const maskCreditCardNumber = (cardNumber, gap = true) => {
    cardNumber = String(cardNumber);
    const firstFourDigits = cardNumber.slice(0, 4);
    const lastFourDigits = cardNumber.slice(-4);
    const maskedMiddleDigits = '*'.repeat(cardNumber.length - 8);
    const maskedNumber = gap
      ? `${firstFourDigits} **** **** ${lastFourDigits}`
      : `${firstFourDigits}**** ****${lastFourDigits}`;

    return maskedNumber;
  };

  const formatExpirationDate = (expDate) => {
    expDate = String(expDate);
    const month = expDate.slice(0, 2);
    const year = expDate.slice(2);
    const formattedDate = `${month}/${year}`;
    return formattedDate;
  };

  return (
    <View>
    {/* <View style={{ backgroundColor: color.primary, padding: 10, borderRadius: 10, flexDirection: 'column', gap: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}> */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <Image
          source={require('../../../assets/images/p-02.png')}
          style={{ height: 50, width: 50 }}
          resizeMode="contain"
          resizeMethod="resize"
        />

        <Image
          source={require('../../../assets/images/p-03.png')}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
          resizeMethod="resize"
        />
      </View>
      <View>
        <Text style={{ fontSize: 25, fontWeight: 800 }}> {maskCreditCardNumber(data.card)}</Text>
      </View>
      <View style={{ width: 100, height: 100, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 500, color: color.secondary }}>Valid THRU </Text>
          <Text style={{ fontSize: 16, fontWeight: 500, color: color.secondary }}>{formatExpirationDate(data.exp)} </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name='checkmark-circle-outline' size={50} style={{ color: color.secondary }} />
        </TouchableOpacity>
      </View> */}
      <BottomModal
        modalVisible={showAddAmount}
        setModalVisible={setshowAddAmount}
        innerModal={
        <View style={[{backgroundColor:'white', padding:scale(20), borderTopLeftRadius:20, borderTopRightRadius:20}]}>
            {/* <Text>j fgbj</Text> */}
            <CustomTextInput
              label={'Amount In Birr'}
              placeholder={'Enter here ...'}
              input={NFCvalue.amount}
              setInput={(text) => setNFCValue({ ...NFCvalue, amount: text })}
              keyboardType={'phone-pad'}
            />
            <CustomTextInput
              label={'Reason'}
              placeholder={'Enter here ...'}
              input={NFCvalue.reason}
              setInput={(text) => setNFCValue({ ...NFCvalue, reason: text })}
            />
            <Button
            label={'Continue'}
            theme={'primary'}
            onPress={() => setshowAddAmount(false)}
            />
            
        </View>
      }/>
    </View>
  );
};

function NFC({ navigation,IsCreateSale }) {
    const [loading, setLoading] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [CardHoder, setCardHoder] = useState({})
    const [isNFCSupported, setIsNFCSupported] = useState(true); // New state for NFC support


  // useEffect(() => {
  //   // Initialize NFC Manager when the component mounts
  //   NfcManager.start();
  //   readVisaCreditCard();

  //   // Cleanup NFC Manager when the component unmounts
  //   // return () => {
  //   //   NfcManager.stop();
  //   // };
  // }, []);
const handleGoBack = () => {
  setModalVisibility(false);
  navigation.navigate('payment', { screen: 'nfc' });
};

useEffect(() => {
  // Check if NFC is supported on the device
  const isNfcSupported = async () => {
    try {
      const supported = await NfcManager.isSupported();
      if (!supported) {
        setIsNFCSupported(false);
        setModalVisibility(true);

        const timeoutId = setTimeout(() => {
          handleGoBack(); // Invoke the function here
        }, 3000);

        setTimeout(() => clearTimeout(timeoutId), 3000);
      } else {
        NfcManager.start();
        readVisaCreditCard();
      }
    } catch (error) {
      console.error('Error checking NFC support:', error);
    }
  };

  isNfcSupported();
  return () => {
    NfcManager.stop();
  };
}, []);

const handleAmount = () => {

}

  const readVisaCreditCard = async () => {
    setLoading(true);
    try {
      NfcManager.cancelTechnologyRequest();
    } catch (error) {
      // Handle cancellation error
    }

    try {
      setLoading(false);
      // ISO 7816 commands to be sent to the NFC card
      const commands = [
        '00A404000E325041592E5359532E444446303100',
        '00A4040007A00000000310100E',
        '80A800002383212800000000000000000000000000000002500000000000097820052600E8DA935200',
      ];

      // Request ISO 7816 technology
      await NfcManager.requestTechnology([NfcTech.IsoDep]);

      const responses = [];

      // Send ISO 7816 commands and collect responses
      for (let i = 0; i < commands.length; i++) {
        const resp = await NfcManager.isoDepHandler.transceive(toByteArray(commands[i]));
        responses.push(resp);
      }
       console.log(responses)
      if (responses && responses.length > 2) {
        // Convert the third response to a hexadecimal string
        const r = await getEmvInfo(toHexString(responses[2]));

        if (r) {
          // Extract card information from EMV data
          const cardInfo = getCardInfoVisa(r);

          if (cardInfo) {
            setModalView(true);
            setCardHoder(cardInfo);
          }
        }
      }
    } catch (error) {
      // Handle any errors during NFC card reading
      setModalVisibility(true)
      setLoading(true);
    } finally {
      // Cancel NFC technology request
      NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  const getEmvInfo = (info) => {
    return new Promise((resolve) => {
      // Use node-emv to extract EMV information
      emv.describe(info, (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(null);
        }
      });
    });
  };

  const toByteArray = (text) => {
    return text.match(/.{1,2}/g).map((b) => {
      return parseInt(b, 16);
    });
  };

  const toHexString = (byteArr) => {
    return byteArr.reduce((acc, byte) => {
      return acc + ('00' + byte.toString(16).toUpperCase()).slice(-2);
    }, '');
  };

  const getCardInfoVisa = (responses) => {
    let res;
    let end = false;

    for (let i = 0; i < responses.length; i++) {
      const r = responses[i];

      if (r.tag === '77' && r.value && r.value.length > 0) {
        for (let j = 0; j < r.value.length; j++) {
          const e = r.value[j];

          if (e.tag === '57' && e.value) {
            const parts = e.value.split('D');

            if (parts.length > 1) {
              res = {
                card: parts[0],
                exp: parts[1].substring(0, 4),
              };

              end = true;
            }
          }

          if (end) {
            break;
          }
        }

        if (end) {
          break;
        }
      }
    }

    return res;
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.white }}>
      <StatusBar backgroundColor={color.primary} />

      {IsCreateSale ? null:<TopNavigationBar onPressBack={() => navigation.goBack()} backIcon={true} middleLabel={'Payment'} /> }
      {isNFCSupported ? <View>
        <View style={{ padding: scale(20), paddingBottom: scale(40) }}>
        <TouchableOpacity onPress={null} style={{ backgroundColor: color.primary, padding: 10, borderRadius: 5 }}>
          <Text style={[textStyles.text_bold, { color: color.white }]}>Tap and Pay / NFC </Text>
          <Text style={[textStyles.text_small_Gray, { color: color.white }]}>Slowly move your card to the back side of the phone</Text>
        </TouchableOpacity>
      </View> 
      <View style={{ alignItems: 'center', marginTop: scale(80) }}>
        <Image style={{}} source={require('../../../assets/images/nfc.png')} />
      </View>
      <CustomModal
        modalVisibility={modalView}
        setModalVisibility={setModalView}
        innerModal={<NfcDisplay data={CardHoder} />}
      />

      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => { }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color={color.primary} size="large" />
          </View>
        </View>
      </Modal>
   <SuccessFailModal
        fail={true}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        message={`Error cancelling NFC technology request:`}
      />
       
      </View>
      : <SuccessFailModal
        fail={true}
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        message={`NFC is not supported on this device.`}
      />}
    </View>
  );
}

export default NFC;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
