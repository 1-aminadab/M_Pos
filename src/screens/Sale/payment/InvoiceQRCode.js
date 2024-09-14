import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Easing} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import NetInfo from '@react-native-community/netinfo';
import QrCodeCode from './invoice-components/QrCode'
import Loading from './invoice-components/Loading'
import Error from './invoice-components/Error'
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import orderSync from '../../../orderSync';
import { color } from '../../../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { UpdateSoldItemHistory, addToOrderedItems } from '../../../database/services/soldItemService';
const InvoiceComponent = ({route}) => {
  const orderData = route.params
  useEffect(()=>{
     
  console.log('/////////////// hello there')
  console.log(orderData);
  console.log('///////////////')

},[])
 
  const navigation = useNavigation()
  const [procced, setProcced] = useState(false)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Defaulting to true for demonstration
  const [syncSucessfull, setSyncSucessfull] = useState(false)
  // Animation values
  const translateY = new Animated.Value(200);
  const opacity = new Animated.Value(0);
  const transformData = (data)=>{

  }
  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveUp = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };
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
  const fetchData = async()=>{
    console.log(orderData.soldItemID)

    setLoading(true)
    try {
      
      NetInfo.fetch().then(state => {
        console.log('Connection type:', state.type);
        console.log('Is connected:', state.isConnected);
        // if(!state.isConnected){
        //   setSuccess(false)
        //   setLoading(false)
        //   return
        // }
      });
   
      navigation.navigate('payment-screen',{orderData:orderData,invoice:false})
          
      //  UpdateSoldItemHistory(orderData.soldItemID,{acknowledged:true})
      //  setSuccess(true);
      //  setSyncSucessfull(true)
      //  navigation.navigate('payment-screen',{orderData:orderData,invoice:orderCreated})  
    } catch (error) {
      // setSuccess(false)
      // setSyncSucessfull(false)
      // console.log("about to added ");
      // addToOrderedItems(generateOrder(orderData))
      // navigation.navigate('payment-screen',{orderData:orderData,invoice:false})

    } finally {
      setLoading(false);
      fadeIn();
      if (success) {
        moveUp();
      }
    }
  }
  const onPress = (proccedTopay)=>{
    if(proccedTopay){
      
    navigation.navigate('payment-screen',{orderData:orderData,invoice:syncSucessfull})
    }else{
      setProcced(false)
     fetchData()
    }
  }


  const renderLoadingScreen = () => (
    <Loading/>
  );

  const renderSuccessScreen = () => (
   <QrCodeCode onProceed={onPress}/>
  );

  const renderErrorScreen = () => (
  <Error onTryAgain = {fetchData} proccedToPay={onPress}/>
  );

  const proccedCard = ()=>{
 return    <View style={styles.cardContainer}>
 <Text style={styles.invoiceNumber}>Select an Option</Text>
 <Text style={styles.amount}>Please choose the desired action to continue. </Text>
 <View style={{gap:10}}>
 <TouchableOpacity onPress={()=>onPress(false)} style={[styles.button,{backgroundColor:color.primary}]}>
   <Text style={[styles.buttonText]}>Create Order</Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>onPress(true)} style={styles.button}>
   <Text style={styles.buttonText}>Proceed to Pay</Text>
 </TouchableOpacity>
 </View>
</View>
  }

  // Ensure that you return the appropriate screen based on the current state
  return (
    <View style={styles.container}>
      <View >
        <TopNavigationBar
        backIcon={true}
        backLabel={'Create Invoice'}
        />
      </View>
      {procced && proccedCard()}
      {loading && renderLoadingScreen()}
      {!loading && success && renderSuccessScreen()}
      {!loading && !success && !procced && renderErrorScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  successContainer: {
    backgroundColor: 'rgba(144, 238, 144, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 99, 71, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    marginBottom: 10,
  },
  tryAgainButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: 'rgba(255, 99, 71, 1)',
    fontWeight: 'bold',
  },
  noConnectionText: {
    color: 'white',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InvoiceComponent;
