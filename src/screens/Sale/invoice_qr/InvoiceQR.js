import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { color, containerStyles } from '../../../styles/Styles';
import InvoiceButtons from '../../../components/top_navigation/InvoiceButtons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import PaymentLinkComponent from '../payment/PaymentLinkComponent';
import { PermissionsAndroid } from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import moment from 'moment';
import GeneratedInvoice from './GeneratedInvoice';
import Share from 'react-native-share';
import Button from '../../../components/button/Button';
import realm from '../../../database';
import soldItemsDataConvertor from '../../../utilities/soldItemDataConverter';
import {getPrinterSetting} from '../../../database/services/printerServiece/index';
import ConfettiUp from '../../../components/Confetti/ConfettiUp';
import { getIntro, setIntro } from '../../../database/services/introService';
import { NavigationActions, StackActions } from 'react-navigation'
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

/* Main Functional Component */
const InvoiceQR = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recievedProductData, setRecievedProductData] = useState([]);
  const [passedDiscount, setPassedDiscount] = useState(0);
  const [receivedSaleHistoryID, setReceivedSaleHistoryID] = useState();
  const [VATrate, setVATrate] = useState(0);
  const incomingData = route.params;
  console.log("incoming data is not", incomingData);
  useEffect(()=>{

  },[])
  
  const invoiceRef = useRef();
  const customer = incomingData?.customer;
  const [fetchedprinterSetting, setfetchedprinterSetting] = useState({});
  const [printerSetting, setprinterSetting] = useState({
    //Prodact data tobe added
    _id: '',
    ip: '192.168.1.2',
    port: '9100',
    printerWidth: '40',
    preference: '',
  });
  const [transactionConfetti, setTransactionConfetti] = useState(true);

  const receivedHistoryData = soldItemsDataConvertor(
    realm
      .objects('Sold_Items')
      .filter(history => history._sold_id.toString() == incomingData.historyID),
  )[0];

  const HistoryPaymentStatus = receivedHistoryData?.payment_status;


  useEffect(() => {
    const loginConfe = getIntro();
    setTransactionConfetti(loginConfe.transactionConfetti);
    try {
      setRecievedProductData(incomingData?.passedData);
      setPassedDiscount(incomingData?.discount);
      setVATrate(incomingData?.VATrate || 0);
      setReceivedSaleHistoryID(
        incomingData?.soldItemID || incomingData?.historyID || 0,
      );
    } catch (err) {
      console.log('Error happende at useEffect with an error msg:', err);
    }
  }, [incomingData]);

  /* Product Sum Calculation Constants */
  // const TOTAL_PRODUCT_PRICE =
  //   recievedProductData?.length > 0
  //     ? recievedProductData
  //       .map(item => item.quantity * item.price)
  //       .reduce((acc, cur) => acc + cur) - (passedDiscount || 0)
  //     : 0.0;

      const TOTAL_PRODUCT_PRICE =
      recievedProductData?.length > 0
        ? recievedProductData
          .map(item => item.item_variant && item.item_variant?item.item_variant.map(item => item.varientcoll[0].optionValue*item.varientcoll[2].optionValue)
          .reduce((acc, cur) => acc + cur): item.quantity * item.price)
          .reduce((acc, cur) => acc + cur)
        : 0.0;
  // const TOTAL_VAT_VALUE = TOTAL_PRODUCT_PRICE * (VATrate / 100);
  const TOTAL_VAT_VALUE =
  recievedProductData?.length > 0
    ? recievedProductData
      .map(item => item.item_variant && item.item_variant?item.item_variant.map(varitem => varitem.varientcoll[0].optionValue*varitem.varientcoll[2].optionValue*(item.tax*0.01))
      .reduce((acc, cur) => acc + cur): (item.tax*0.01) *item.quantity * item.price)
      .reduce((acc, cur) => acc + cur)
    : 0.0;
  const TOTAL_VAT_INCLUSIVE =
    TOTAL_PRODUCT_PRICE + TOTAL_VAT_VALUE || receivedHistoryData?.total_price;

  const handlePayment = () => {
   
    navigation.navigate('main')
    // navigation.navigate('payment-screen', {
    //   TOTAL_VAT_INCLUSIVE,
    //   receivedSaleHistoryID,
    //   TOTAL_PRODUCT_PRICE,
    //   TOTAL_VAT_INCLUSIVE,
    //   order_no: route.params.newOrderNO
    // });
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
                <PaymentLinkComponent />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

 

  async function requestPermissions() {
    try {
      const cameraPermissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
      const storagePermissionStatus = await check(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
 
      if (
        cameraPermissionStatus == RESULTS.GRANTED
        //  && storagePermissionStatus == RESULTS.GRANTED
      ) {
        handleCreateOrder();
        return;
      }else{
        if (cameraPermissionStatus !== RESULTS.GRANTED) {
          const cameraGranted = await PermissionsAndroid.request(
            PERMISSIONS.ANDROID.CAMERA,
          );
          if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
            // Camera permission denied
          }
        }
        if (storagePermissionStatus !== RESULTS.GRANTED) {
          const storageGranted = await PermissionsAndroid.request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          );
          if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
            // Storage permission denied
          }
        }
      }
  
      const granted = await PermissionsAndroid.requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);
  
      if (
        granted[PERMISSIONS.ANDROID.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        handleCreateOrder();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateOrder = async () => {
    try {
      if (invoiceRef.current) {
        const uri = await captureRef(invoiceRef.current, {
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
  // fetch printer confguration
  useEffect(() => {
    setfetchedprinterSetting(getPrinterSetting());
  }, []);

  const fetchPrinterSetting = () => {
    if (fetchedprinterSetting.length > 0) {
      fetchedprinterSetting.forEach(setting => {
        setprinterSetting(prevState => ({
          ...prevState,
          _id: setting._id,
          ip: setting.printer_ip,
          port: setting.printer_port,
          preference: setting.selected_preference,
          printerWidth: setting.paper_width,
        }));
      });
    }
  };
    // increment for items with varient 
    const handlevarQtyIncrement = (id, index) => {
      const Prev_Item_Qty = realmItemList.filter(
        item => item._id == id && item,
      )[0].quantity;
      const Sale_Item = passedData.filter(item => item._id == id)[0];
      if (Sale_Item.item_variant) {
        const prev_var_quantity = JSON.parse(realmItemList.filter(
          item => item._id == id && item,
        )[0].item_variant.replace(/\\/g, ''))[index].varientcoll[0].optionValue
  
        if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) >= 0) {
          Sale_Item.item_variant[index].varientcoll[0].optionValue += 1;
          Sale_Item.quantity += 1;
          setPassedData([...passedData]);
        } else if (prev_var_quantity - (Sale_Item.item_variant[index].varientcoll[0].optionValue + 1) <= 0) {
          Toast.show({
            type: 'error',
            text1: 'No Enough Items!',
            text2: `There is Only ${prev_var_quantity} Items Left In The Stock`,
          });
        }
      }
  
    };
  useEffect(() => {
    fetchPrinterSetting();
  }, [fetchedprinterSetting]);


  function handleOnStopConfetti() {
    setIntro({ transactionConfetti: true });
  }
// console.log({'route':route.params.discount})
  /* Main Component Return */
  return (
    <View style={[containerStyles.mainContainer, {}]}>
      <PaymentModal />
      <TopNavigationBar
        backIcon={true}
        middleLabel={'Order'}
        onPressBack={() => navigation.goBack()}
      />
      <View style={[{paddingHorizontal:20, flex:1, marginBottom:10}]}>
      <View style={{ marginBottom: 5 }}>
        {/* <InvoiceButtons
          onSharePress={() => requestPermissions()}
          onPrintPress={() => handlePrint()}
        /> */}
      </View>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/* Top Invoice Componsnt */}
        <View style={{ paddingBottom: 110, marginTop: 5 }}>
          <ScrollView
            nestedScrollEnabled
            style={{
              paddingVertical: 5,
              overflow: 'hidden',
            }}>
            <GeneratedInvoice
              historyData={receivedHistoryData}
              itemData={recievedProductData || receivedHistoryData?.sold_items}
              VATrate={VATrate || receivedHistoryData?.tax_rate}
              discount={route.params.discount}
              invoiceRef={invoiceRef}
              TOTAL_PRODUCT_PRICE={
                TOTAL_PRODUCT_PRICE || receivedHistoryData?.sub_total
              }
              TOTAL_VAT_VALUE={
                TOTAL_VAT_VALUE ||
                receivedHistoryData?.sub_total *
                (receivedHistoryData?.tax_rate / 100)
              }
              TOTAL_VAT_INCLUSIVE={
                TOTAL_VAT_INCLUSIVE-route.params.discount || receivedHistoryData?.total_price
              }
              customer={customer}
              inv_no={route.params.newOrderNO}
            />
          </ScrollView>
        </View>
      </ScrollView>
      {!transactionConfetti ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99,
          }}>
          <ConfettiUp startingDelay={0} />
          <ConfettiUp onStop={handleOnStopConfetti} startingDelay={700} />
        </View>
      ) : null}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          paddingHorizontal: 18,
        }}>
        <Button
          theme={'primary'}
          label={HistoryPaymentStatus ? 'Paid' : 'Finish'}
          // label={'Finish'}
          onPress={handlePayment}
          disabled={HistoryPaymentStatus && true}
          shadow
        />
        <TouchableOpacity onPress={()=>navigation.navigate('generated-invoice')}>
          {
            false && <Text style={{backgroundColor:"green", padding:10}}>Create Invoice</Text>
          }
          <Text></Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  qrContainer: {
    marginTop: 15,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }),
  },
  tableHead: {
    backgroundColor: color.lightBlue,
    marginTop: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tableHeadText: { color: color.secondary, fontSize: 18 },

  tableItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});

export default InvoiceQR;
