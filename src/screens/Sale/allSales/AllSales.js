import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import HeadSelector from '../../../components/HeadSelector';
import SearchBar from '../../../components/search/SearchBar';
import { color } from '../../../styles/Styles';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Mini_Icon_Label from '../../../components/list/Mini_Icon_Label';
import numberFormater from '../../../utilities/numberFormater/numberFormater';
import { getAllSoldItems, getSoldItems } from '../../../database/services/soldItemService';
import soldItemsDataConvertor from '../../../utilities/soldItemDataConverter';


const AllSales = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedHead, setSelectedHead] = useState('All');
  const CUSTOMER = useGetRealmData('Customer').data;
  const SOLD_HISTORY_OBJ = useGetRealmData('Sold_Items');
  const HISTORY = soldItemsDataConvertor(getAllSoldItems());

  function filterHistory() {

    let RESULT;
    if (selectedHead == 'Paid') {
      RESULT = HISTORY.filter(history => history.payment_status);
    } else if (selectedHead == 'Unpaid') {

      RESULT = HISTORY.filter(history => !history.payment_status);
    } else RESULT = HISTORY;

    if (search != '' && !isNaN(parseInt(search))) {

      RESULT = RESULT.filter(history => history.buyer_tin?.toString().includes(search))
    } else {
      RESULT = RESULT.filter(history => history.buyer_name.toLowerCase().includes(search.toLowerCase()))
    }
    RESULT.sort((a, b) => new Date(b.sold_date) - new Date(a.sold_date));

    return RESULT;
  }

  const filter = () => {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
    }
  }



  const renderData = ({ item, navigation }) => {
 
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
      total_price.toString().includes('.')
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
        navigation.navigate('payment-screen', {
          VATrate: item.tax_rate,
          customer:{
            _id:item.buyer_id,
            fullname:item.buyer_name,
            tin:item.buyer_tin
          },
          discount:0,
          newOrderNO:inv_no,
          passedData:item.sold_items,
          
        });
      }
     
    }



    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => handleOnPressHistory()}
          style={[styles.listContainer]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderWidth: 0,
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
                fontSize: 16,
                fontWeight: '600',
                color: color.normal,
                textTransform: 'capitalize',
              }}>
              {inv_no}
            </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
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
              {paymentStatus}
            </Text>
          </View>
        </TouchableOpacity></View>
    )
  };

  //console.log(filterHistory())

  /* Main Component Return */
  return (
    <View style={styles.mainContainer}>
      <TopNavigationBar
        backIcon={true}
        middleLabel={'Sales Invoice'}
        onPressBack={() => navigation.goBack()}
      />
      <View style={[{paddingHorizontal:20, flex:1, paddingBottom:70}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HeadSelector
          label={'All'}
          state={selectedHead}
          setState={setSelectedHead}
        />
        <HeadSelector
          label={'Paid'}
          state={selectedHead}
          setState={setSelectedHead}
        />
        <HeadSelector
          label={'Unpaid'}
          state={selectedHead}
          setState={setSelectedHead}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <SearchBar
          placeholder={'Buyer name or TIN No...'}
          search={search}
          setSearch={setSearch}
          height={45}
          disablescan={true}
        />
      </View>

      <View style={{ marginTop: 10, paddingBottom: 10, }}>
        <FlatList
          contentContainerStyle={{ gap: 12, marginTop: 5, paddingBottom: 50 }}
          data={filterHistory()}
          renderItem={({ item }) => renderData({ item, navigation })}
        />
      </View>
    </View>

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
    marginTop: 0,
    backgroundColor: color.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
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
});

export default AllSales;
