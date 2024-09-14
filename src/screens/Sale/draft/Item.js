import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
  } from 'react-native';
  import React, {useState} from 'react';
  import {color} from '../../../styles/Styles';
 
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import numberFormater from '../../../utilities/numberFormater/numberFormater';
  import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';

  import moment from 'moment';
  // icons
  import Feather from 'react-native-vector-icons/Feather';
  import Entypo from 'react-native-vector-icons/Entypo';
  import Mini_Icon_Label from '../../../components/list/Mini_Icon_Label';

  //
  import { useNavigation } from '@react-navigation/native';
  const {width} = Dimensions.get('screen');
  
export const RenderData = ({item,decisionModal, tobeDeletedItemId,}) => {
    const navigation = useNavigation()
    const CUSTOMER = useGetRealmData('Customer').data;
    const [loading, setLoading] = useState(true)
   console.log(loading);
    const {
      _sold_id,
      buyer_id,
      sold_date,
      sold_items,
      total_price,
      payment_status,
      inv_no,
    } = item;

    const customer = CUSTOMER?.find(cust => cust._id == buyer_id);
    const buyerName = buyer_id
      ? CUSTOMER?.find(cust => cust._id == buyer_id)?.fullname
      : 'Guest';

    const soldItemQty = sold_items?.length;
    const soldDate = moment(sold_date).format('hh:mm A MMM,DD');
    const soldPrice = numberFormater(
      total_price?.toString().includes('.')
        ? total_price?.toFixed(2)
        : total_price,
    );
    const paymentStatus = payment_status ? 'Paid' : 'Unpaid';

    function handleOnPressHistory() {
      const secondData = item
      const convertedData = {
        ...secondData,
        sold_items: secondData.sold_items.map(item => ({ ...item, _id: item.id})),
      };
      
      // Remove the "id" keys
     // convertedData.sold_items.forEach(item => delete item.id);
      
      if(payment_status){
         navigation.navigate('invoice-screen', {
        historyID: _sold_id,
        customer,
      });
      }else{
        navigation.navigate('create-sale', {
          _id:_sold_id,
          passed_selected_product: item.sold_items,
        });
      }
     
    }
    function handleDeleteDraft(draftID) {
        console.log("item id ", draftID);
        try {
            tobeDeletedItemId(draftID);
            
        } catch (error) {
          console.log(error);
        }
    
        decisionModal(true);
      }
    
    const deleteItem = (id)=>{
      handleDeleteDraft(id)
      setLoading(false)
    }

   
    return (
      <View  style={{width:"97%",flexDirection:"row",justifyContent:"space-between",alignItems:"center",margin:5,backgroundColor:color.lightGray,padding:5,borderRadius:10,elevation:4,shadowColor:color.primary}}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => handleOnPressHistory()}
        style={[styles.listContainer,{flex:1, elevation:0}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderWidth: 0,
            flex:1,
            width:"100%"
          }}>
             
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: color.normal,
              textTransform: 'capitalize',
            }}>
            {buyerName}
          </Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.dateText}>{soldDate}</Text>
          </View>
          
        </View>
        <Text
            style={{
              fontSize: 13,
              fontWeight: '600',
              color: color.normal,
              textTransform: 'capitalize',
              width:"100%"
            }}>
            {inv_no}
          </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width:"100%"

          }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Mini_Icon_Label
              icon={
                <Feather name="shopping-cart" size={13} color={color.primary} />
              }
              label={soldItemQty}
            />
            <Mini_Icon_Label
              icon={
                <Ionicons
                  name="pricetag-outline"
                  size={13}
                  color={color.primary}
                />
              }
              label={soldPrice + ' Br'}
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: payment_status ? color.green : color.primary,
              opacity: 0.8,
            }}>
            {paymentStatus === 'Paid' ?'Order' : 'Draft'}
          </Text>
        </View>
        
      </TouchableOpacity>
      {
        !payment_status ?  <TouchableOpacity style={{padding:5,margin:5,borderRadius:15, backgroundColor:color.white}} onPress={()=>{
        setLoading(true)
        deleteItem(_sold_id)}}>
      <MaterialCommunityIcons name="delete-empty" size={24} color={color.red} />
      
          </TouchableOpacity> : <TouchableOpacity onPress={()=>handleOnPressHistory()} style={{padding:5,margin:5,borderRadius:15, backgroundColor:color.white}}>
             <Entypo name="arrow-long-right" size={24} color={color.primary} />
      
          </TouchableOpacity>
      }
     
      
      </View>
    );
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderColor: 'red',
    },
  
    listContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 0,
      borderRadius: 8,
      overflow: 'hidden',
      gap: 0,
      borderColor: color.grayOutline,
      width:"100%"
    },
  
    dateText: {
      fontSize: 14,
      fontWeight: '600',
      color: color.gray,
    },
  
    timeText: {
      fontSize: 12,
      fontWeight: '600',
      color: color.gray,
      marginVertical: -2,
    },
    flex: {
      flex: 1,
      backgroundColor: 'white',
    },
    topScroll: {
      flexGrow: 0,
      marginLeft:20
  
    },
    headerText: {
      fontSize: 16,
      color: color.lightPrimary,
      fontWeight: 'bold',
    },
    item: {
      height: '100%',
      width: width,
      alignItems: 'center',
      borderWidth: 5,
      borderColor: '#fff',
    },
    headerItem: {
      paddingHorizontal: 20,
      paddingVertical: 10,
  
  
      alignItems: 'center',
      justifyContent: 'center',
    },
    bar: {
      height: 4,
      alignSelf: 'flex-start',
      borderTopLeftRadius: 10,
      color: 'red',
      marginLeft:20
    },
    barInner: {
      backgroundColor: color.primary,
    },
    txt: {
      fontSize: 40,
      color: '#fff',
    },
    datecontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    datePicker: {
      width: 200,
      marginTop: 10,
    },
  });