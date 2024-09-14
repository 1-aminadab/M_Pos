import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Linking,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import InvoiceButtons from '../../../components/top_navigation/InvoiceButtons';
import Button from '../../../components/button/Button';
import { RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color, containerStyles, textStyles } from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import QRModalComponent from './QRModalComponent';
import PaymentLinkComponent from './PaymentLinkComponent';
import CardPayment from './CardPayment';
import { UpdateSoldItemHistory, addToOrderedItems, deleteFromSoldItems } from '../../../database/services/soldItemService';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomModal from '../../../components/modal/CustomModal';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { getIntro, setIntro } from '../../../database/services/introService';
import localPushNotification from '../../../utilities/push_notification';
import { PermissionsAndroid } from 'react-native';
import { Banks } from '../../Setting/ChooseBank';
import { createNotification } from '../../../database/services/notificationService';
import moment from 'moment';
import generateUniqueID from '../../../utilities/uniqueIDGenerator';
import { scale } from 'react-native-size-matters';
import PINScreen from '../../Setting/PINScreen';
import NumberPad from '../../../components/Common/NumberPad';
import ImageSource from '../../../components/modal/ImageSource';
import { AuthContext } from '../../../hooks/useContext/AuthContext';
import QRCodeGenerate from '../../Payment/QRCode/QRCode';
import QRCode from 'react-native-qrcode-svg';
import GeneratedQR from '../../Payment/QRCode/GeneratedQR';
import { captureRef } from 'react-native-view-shot';
import NFC from '../../Payment/NFC/NFC';
import axios from 'axios';
import SyncService from '../../../SyncService';
import orderSync from '../../../orderSync';
import { checkNetworkConnectivity } from '../../../syncFunctions';
import CheckConnection from './checkConnection';
import SuccessCard from './SuccessCard';
import AlertPopupTop from './invoice-components/InvoiceAlert';
import Toast from 'react-native-toast-message';



const Payment = ({ navigation, route }) => {
  const incomingData = route.params;
  const invoiceCreated = route.params.invoice
  console.log(incomingData,invoiceCreated);
  const IntroState = getIntro();
  const appLock = useContext(AuthContext)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');
  const paymentMethod = ['Cash', 'Bank', 'QR', 'Card'];
  const [modalVisible, setModalVisible] = useState(false);
  const [pinmodalVisible, setPinModalVisible] = useState(false);
  const [TrNumber, setTrNumber] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [selectedBank, setselectedBank] = useState('');
  const [selectbankModal, setselectbankModal] = useState(false);
  const [paymentConfetti, setPaymentConfetti] = useState(
    IntroState?.paymentConfetti,
  );

  // const receivedSaleHistoryID = incomingData.receivedSaleHistoryID;
  const receivedSaleHistoryID = incomingData.soldItemID;


  
  // console.log({'ggggggg':incomingData.passedData.passedData})
  const [image, setimage] = useState('');
  const [scanning, setscanning] = useState(false);
  const [selectScaModal, setselectScaModal] = useState(false);
  const [scannedText, setscannedText] = useState(null);
  const [successFailMessage, setsuccessFailMessage] = useState(
    'Payment Successfull!',
  );
  const [failed, setfailed] = useState(false);
  const [showImageSource, setShowImageSource] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [encodedValue, setencodedValue] = useState('');
  const qRref = useRef();
  const handleRadioCheck = (radio) => {
    // const pattern = /Bank|QR|Card/gi;
    setSelectedPaymentMethod(radio);
    // console.log('first')
  };

  useEffect(() => {
    const handleSyncProducts = async () => {
      try {
        // Assuming products is defined somewhere
        const response = await orderSync.sendProductsToServer(incomingData);
  console.log("payment response",response);
        if (response.result.status == 1) {
          console.log('Products sent successfully.');
          Toast.show({
            type: 'success',
            text1: 'Order Sync Successfully',
           // text2: `Try again later. Suspended until: 15 minutes`,
          });
        } else {
          console.error('Failed to send products:', result.error);
          addToOrderedItems(generateOrder(incomingData))

        }
      } catch (error) {
        console.error('Error in sendProductsToServer:', error);
        addToOrderedItems(generateOrder(incomingData))

      }
    };
  
    // Call the function to initiate the logic
    handleSyncProducts();
  
    // Optional: Cleanup function if necessary (explained below)
  }, []);
  const generateOrder = (inputData)=>{
    const transformedData = {
      soldItemID: inputData.soldItemID,
      passedData: inputData.passedData.map(item => ({
        oddo_template_id: item.oddo_template_id,
        quantity: item.quantity,
      }))
    };
    return transformedData
   }
  useEffect(() => {
    if (selectedPaymentMethod == 'Bank') {
    }
  }, [selectedPaymentMethod]);

  const handleShare = () => {
    setSelectedPaymentMethod('Share');
    setModalVisible(true);
  };



  const passedData = incomingData.passedData
  const passedDiscount = incomingData.discount
  // console.log(incomingData.order_no)


  const TOTAL_PRODUCT_PRICE =
    passedData?.length > 0
      ? passedData
        // .map(item => item.quantity * item.price)
        .map(item => item.item_variant && item.item_variant ? item.item_variant.map(item => item.varientcoll[0].optionValue * item.varientcoll[2].optionValue)
          .reduce((acc, cur) => acc + cur) : item.quantity * item.price)
        .reduce((acc, cur) => acc + cur)
      : 0.0;
  const TOTAL_VAT_VALUE =
    passedData?.length > 0
      ? passedData
        // .map(item => item.quantity * item.price)
        .map(item => item.item_variant && item.item_variant ? item.item_variant.map(varitem => varitem.varientcoll[0].optionValue * varitem.varientcoll[2].optionValue * (item.tax * 0.01))
          .reduce((acc, cur) => acc + cur) : (item.tax * 0.01) * item.quantity * item.price)
        .reduce((acc, cur) => acc + cur)
      : 0.0;

  const TOTAL_VAT_INCLUSIVE =
    TOTAL_PRODUCT_PRICE + TOTAL_VAT_VALUE - passedDiscount

    console.log(TOTAL_PRODUCT_PRICE);
    console.log(TOTAL_VAT_VALUE);
    console.log(passedDiscount);

  // TOTAL_PRODUCT_PRICE + TOTAL_VAT_VALUE - (discount || 0);
 

  const handlePayment = (value) => {
    console.log({"kkk":value})
    console.log({"kkksss":receivedSaleHistoryID})

    // if (TrNumber || selectedPaymentMethod == 'Cash') {
    if (selectedPaymentMethod == 'Cash') {


      setIntro({ paymentConfetti: true });
      // setSuccessModal(true);
      setfailed(false);
      setsuccessFailMessage('Payment Recieved!');
      const updateSoldData = {
        payment_status: true,
        payment_method: selectedPaymentMethod,
        payment_reference:
          selectedPaymentMethod == 'Cash'
            ? 'Cash-' + incomingData.order_no
            // ? 'Cash-' + 'incomingData.order_no'
            : TrNumber, 
      };

      UpdateSoldItemHistory(receivedSaleHistoryID, updateSoldData);
      localPushNotification({
        title: 'Payment Received',
        message: `Transaction Payment is successfully received ${selectedPaymentMethod == 'Cash'
          ? 'in Cash'
          : selectedPaymentMethod == 'Bank'
            ? 'by Bank Transfer'
            : ''
          }.`,
      });

      createNotification({
        id: generateUniqueID(),
        title: 'Payment Received',
        message: `Transaction Payment is successfully received ${selectedPaymentMethod == 'Cash'
          ? 'in Cash'
          : selectedPaymentMethod == 'Bank'
            ? 'by Bank Transfer'
            : ''
          }.`,
        seen: false,
        time: moment(new Date()).format('hh:mm a  MMM DD'),
      });
      paymentConfetti && navigation.navigate('invoice-screen', incomingData);
      // setTimeout(() => {
      //   navigation.navigate('invoice-screen',incomingData);
      // }, 1500);
    } else {
      setSuccessModal(true);
      setfailed(true);
      setsuccessFailMessage('Please enter Payment Reference or select Cash');
      setTimeout(() => {
        setSuccessModal(false);
      }, 3000);
    }
  };

  const PaymentModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {/* Outer Modal Part  */}
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            {/* Inner Modal Part  */}
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  shadowColor: '#000',
                  elevation: 15,
                  padding: 25,
                }}>
                {payment_Method_Switcher(selectedPaymentMethod)}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const payment_Method_Switcher = input => {
    switch (input) {
      case 'Bank':
        // return <BankButtonComponent />;
        break;
      case 'Share':
        return <PaymentLinkComponent />;
        break;
      case 'QR':
        return <QRModalComponent />;
        break;
      case 'Card':
        return <CardPayment />;
        break;
      default:
        return null;
        break;
    }
  };

  // const [scanning, setscanning] = useState(false);
  // const [selectScaModal, setselectScaModal] = useState(false);
  // const [scannedText, setscannedText] = useState(null);
  // const [successFailMessage, setsuccessFailMessage] = useState(
  //   'Payment Successfull!',
  // );
  // const [failed, setfailed] = useState(false);

  useEffect(() => {
    (async () => {
      if (image.assets) {
        setscanning(true);
        const result = await TextRecognition.recognize(image.assets[0].uri);
        setscannedText(result.text);
        if (result.text == '') {
          setSuccessModal(true);
          setsuccessFailMessage(
            'Cant Scan Paymet Reference Try Again or Insert Reference Number Manually',
          );
          setfailed(true);
          setscanning(false);
        }
      }
    })();
  }, [image]);

  // take needed text only form extracted  text
  useEffect(() => {
    if (scannedText) {
      if (selectedBank == 'CBE') {
        const pattern = /[A-Za-z]{2}[A-Za-z0-9]{10}/;
        const matches = scannedText.match(pattern);
        if (matches && matches.length >= 1) {
          setTrNumber(matches[0]);
          setscannedText('');
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        } else {
          setSuccessModal(true);
          setsuccessFailMessage(
            'Cant Scan Paymet Reference Try Again or Insert Reference Number Manually',
          );
          setfailed(true);
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        }
      } else if (selectedBank == 'TeleBirr') {
        const pattern = /[A-Z]{3}[A-Z0-9]{7}/;
        const matches = scannedText.match(pattern);
        if (matches && matches.length >= 1) {
          setTrNumber(matches[0]);
          setscannedText('');
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        } else {
          setSuccessModal(true);
          setsuccessFailMessage(
            'Cant Scan Paymet Reference Try Again or Insert Reference Number Manually',
          );
          setfailed(true);
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        }
      } else if (selectedBank == 'Awash') {
        const pattern = /[0-9]{11}/;
        const pattern2 = /[A-Z0-9]{12}/; // Pattern to match two letters followed by 10 characters
        const matches = scannedText.match(pattern);
        const matches2 = scannedText.match(pattern2);
        if (matches && matches.length >= 1) {
          setTrNumber(matches[0]);
          setscannedText('');
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        } else if (matches2 && matches2.length >= 1) {
          setTrNumber(matches2[0]);
          setscannedText('');
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        } else {
          setSuccessModal(true);
          setsuccessFailMessage(
            'Can not Scan Payment Reference Try Again or Insert Reference Number Manually',
          );
          setfailed(true);
          setscanning(false);
          setselectedBank('');
          setselectScaModal(false);
        }
      }
    }
    setscanning(false);

    setselectScaModal(false);
  }, [scannedText]);

  // scanning loader 
  useEffect(() => {
    if (scanning == true) {
      setTimeout(() => {
        setscanning(false);
        setselectedBank('');
      }, 5000);
    }
  }, [scanning]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted.');
        return true;
      } else {
        console.log('Camera permission denied.');
        return false;
      }
    } catch (error) {
      console.warn('Error requesting camera permission:', error);
      return false;
    }
  };
  const openAppSettings = () => {
    Linking.openSettings();
  };

  // take photo 
  const takePhoto = async () => {
    // Request camera permission
    const permissionGranted = await requestCameraPermission();

    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Please grant camera permission to Scan.',
        [
          {
            text: 'Open Settings',
            onPress: openAppSettings,
          },
        ],
        { cancelable: false },
      );
    } else {
      // Launch the camera to capture a photo
      launchCamera({}, setimage);
      setselectScaModal(false);
      setselectbankModal(false);
      setscanning(true);
    }
  };

  // scan from gallery function 
  const scanGallery = () => {
    launchImageLibrary({}, setimage);
    setselectScaModal(false);
  };


  const scanReference = () => {
    setselectbankModal(true);
    setTrNumber();
  };


  function handleOnStopConfetti() {
    setIntro({ paymentConfetti: true });
    setPaymentConfetti(true);
    setSuccessModal(false);
    navigation.navigate('main');
  }
  const BANKS = [
    {
      name: 'Awash',
      logo: require('../../../assets/images/awash.png'),
    },
    {
      name: 'CBE',
      logo: require('../../../assets/images/cbe.png'),
    },
    {
      name: 'TeleBirr',
      logo: require('../../../assets/images/teleBirr.png'),
    },

  ];

  useEffect(() => {
    if (selectedPaymentMethod == 'Bank' && selectedBank != '') {
      setselectScaModal(true);
      setselectbankModal(false);
    } else {
      setselectScaModal(false);
      setselectbankModal(false);
    }
  }, [selectedBank]);
  /* Main Component Return */
  //   const checkPassword = (value) => {
  //     setConfirmPass(value);
  // };

  const handleCreateOrder = async () => {

    try {
      if (qRref.current) {
        const uri = await captureRef(qRref.current, {
          format: 'jpg',
          quality: 0.8,
        });
     
        const filePath = `${RNFS.DocumentDirectoryPath}/sale_invoice_${moment(
          new Date(),
        ).format('hms_DD-MM-YYYY')}.jpg`;
        await RNFS.copyFile(uri, filePath);

        const shareOptions = {
          title: 'Share image',
          url: `file://${filePath}`,
          failOnCancel: false,
        };


        await Share.open(shareOptions);
      }
    } catch (error) {
      console.error('Error capturing invoice:', error);
    }
  };
  const [jumpInvoice, setJumpInvoice] = useState(false)
  const [openCheckModal, setOpencheckModal] = useState(false)
  const [invoiceSuccess, setInvoiceSuccess] = useState(false)
  
  const checkConnection = ()=>{
    const connected = checkNetworkConnectivity()

    if(connected){
      complete()
    }else{
    setOpencheckModal(true)
    }
  }
  const updateModals = (open, jump)=>{
    setOpencheckModal(open)
    setJumpInvoice(jump)
  }
  const complete= async()=>{
    const updateSoldData = {
      payment_status: true,
      payment_method: selectedPaymentMethod,
      inV_no:incomingData.order_no,
      payment_reference:
        selectedPaymentMethod == 'Cash'
          // ? 'Cash-' + incomingData.order_no
          ? 'Cash-' + incomingData.order_no
          : TrNumber,
    };
   // sendProductsToServer(updateSoldData)
   const connected = checkNetworkConnectivity()
   if(connected){
    UpdateSoldItemHistory(incomingData.soldItemID, updateSoldData);
    
   }else{
    Alert.alert('no internet connection')
   }
    // Order Sync
    

    navigation.navigate('invoice-screen', incomingData)
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <View style={[{ flex: 1 }]}>
        {/* Top Navigation */}
        <TopNavigationBar
          backIcon={true}
          onPressBack={() => navigation.goBack()}
        />
        {
        openCheckModal && <CheckConnection proceed={complete} updateModal={updateModals}/>

        }
  
        <ScrollView style={{}}>
          <PaymentModal />
          <SuccessFailModal
            modalVisibility={successModal}
            setModalVisibility={setSuccessModal}
            message={successFailMessage}
            fail={failed}
            confettiCondition={!paymentConfetti}
            onConfettiStop={handleOnStopConfetti}
          />

          {/* modal for scanning loader  */}
          <CustomModal
            modalVisibility={scanning}
            setModalVisibility={() => { }}
            innerModal={
              <View
                style={{
                  width: '100%',
                  maxWidth: 250,
                  padding: 30,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  gap: 20,
                  justifyContent: 'center',
                }}>
                <Text>Scanning Payment Reference</Text>
              </View>
            }
          />
          {/* modal for selecting image source  */}
          <ImageSource
            modalVisibility={selectScaModal}
            setModalVisibility={setselectScaModal}
            takePhoto={() => takePhoto()}
            scanGallery={() => scanGallery()}
          />

          {/* modal for selecting bank for scan  */}
          <CustomModal
            modalVisibility={selectbankModal}
            setModalVisibility={setselectbankModal}
            innerModal={
              <View
                style={styles.selectBankModal}>
                <View
                  style={styles.selectBankModalInner}>
                  {BANKS?.map(({ name, logo, }) => (
                    <Banks
                      icon={logo}
                      value={name}
                      state={selectedBank}
                      marginHorizontal={5}
                      setState={setselectedBank}
                      key={name}
                      style={[{ marginLeft: 20, paddingHorizontal: 20 }]}
                    />
                  ))}
                  <View style={[{ marginTop: 15 }]}>
                    <Button
                      height={20}
                      fontSize={16}
                      label={'Other Bank'}
                      onPress={() => setselectbankModal(false)}
                    />
                  </View>
                </View>
              </View>
            }
          />
          <View style={[{ paddingHorizontal: 20 }]}>
            {/* <InvoiceButtons onSharePress={() => handleShare()} /> */}
            {/* payment method  */}
            <View style={{}}>
              <Text style={textStyles.heading_bold}>Payment</Text>
              <Text style={textStyles.text_regular_Gray}>Choose Payment Method</Text>
              <View
                style={[
                  styles.paymentContainer,
                  {
                    borderBottomWidth: 1,
                    borderColor: color.outline,
                    // justifyContent: 'space-evenly',
                  },
                ]}>
                {paymentMethod.map(payment => {
                  return (
                    <TouchableOpacity
                      style={[styles.radioRow, { borderBottomWidth: selectedPaymentMethod == payment ? 2 : 0, borderColor: color.primary, padding: 10 }]}
                      key={payment}
                      onPress={() => handleRadioCheck(payment)}>

                      <Text style={[selectedPaymentMethod == payment ? textStyles.text_bold : textStyles.text_regular, , { color: color.primary, textAlign: "center" }]}>{payment}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* for cash  */}

            {selectedPaymentMethod === 'Cash' ? <View
              style={[{ display: selectedPaymentMethod === 'Cash' ? 'flex' : 'none', marginVertical: 20 }]}>
              <NumberPad
                TOTAL_PRODUCT_PRICE={TOTAL_VAT_INCLUSIVE}

              />
              <CustomModal
                modalVisibility={pinmodalVisible}
                setModalVisibility={setPinModalVisible}
                innerModal={<View style={[{ padding: 20, margin: 20, backgroundColor: color.white, borderRadius: 20 }]}>
                  <NumberPad
                    TOTAL_PRODUCT_PRICE={TOTAL_VAT_INCLUSIVE}
                    pin={true}
                    confirm={handlePayment}
                    purpose={'pass'}
                    updateModalVisible={() => setPinModalVisible(false)}
                  /></View>} />
            </View> : null}

            {/* for bank  */}
            {selectedPaymentMethod === 'Bank' ? <View
              style={[
                styles.transactionIDcontainer,
                {
                  display: selectedPaymentMethod === 'Bank' ? 'flex' : 'none',
                },
              ]}>
              <TextInput
                style={styles.transactionId}
                placeholder="Enter Payment Reference"
                value={TrNumber}
                onChangeText={text => setTrNumber(text)}
              />
              <TouchableOpacity
                style={{ marginLeft: 15, paddingRight: 5 }}
                onPress={() => scanReference()}>
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View> : null}


            {selectedPaymentMethod === 'QR'?<View
              style={[
                styles.transactionIDcontainer,
                {
                  display: selectedPaymentMethod === 'QR' ? 'flex' : 'none',
                },
              ]}>

              <GeneratedQR
                qRref={qRref}
                passedData={passedData}
                TOTAL_PRODUCT_PRICE={TOTAL_PRODUCT_PRICE}
                reason={incomingData.newOrderNO}
              />


            
            </View>:null}
            {selectedPaymentMethod === 'Card'?<View
              style={[
                styles.transactionIDcontainer,
                {
                  display: selectedPaymentMethod === 'Card' ? 'flex' : 'none',paddingHorizontal:0, paddingVertical:0
                },
              ]}>

                <NFC
                IsCreateSale={true}/>

              
            </View>:null}

          </View>
        </ScrollView>
        {/* Payment Submit Button */}


        <View style={{ marginBottom: 30, paddingHorizontal: 30 }}>
          <Button
            label={'Complete'}
            theme={'primary'}
            btnBG={color.primary}
            onPress={() => { appLock?.appLock?.saleLock == true ? setPinModalVisible(true) : checkConnection() }}
          />

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  transactionId: {
    flex: 1,
    color: color.secondary,
    fontSize: 18,
    fontWeight: '500',
    borderWidth: 0,
  },
  paymentContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center"

  },
  radioRow: {
    width: '25%'
  },
  bankOptionContainer: {
    // flex: 1,
    alignItems: 'center',
    borderWidth: 1.5,
    gap: 10,
    borderColor: color.secondary,
    backgroundColor: color.lightGray,
    borderRadius: 10,
    padding: 20,
  },

  transactionIDcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.lightBlue,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  selectBankModal: {
    width: '100%',
    maxWidth: 250,
    padding: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  selectBankModalInner: {
    width: '100%',
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});

export default Payment;
