import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import moment from 'moment';
import { color } from '../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';

const StockHistoryList = ({
  item,
  Customer_Data,
  setSelectedHistory,
  setShowDetail,
}) => {
  const {
    _stock_history_id,
    customer_id,
    status,
    stock_items,
    time,
    stock_in_qty,
    item_variant,
  } = item; // destructured history variable



  const itemList = () => {

    const list = []
    stock_items.map((item) => {
      // console.log(item)
      if(list.length==0){
        list.push(item.name)
      }else{
        list.push(', '+item.name)
      }
      
    })
    return list
  }
  

  /* The customer is currently for stock out history. but incase of stock in it is 'Stock in' String */
  var customer =
    status == 'in'
      ? 'Stock in'
      : customer_id == null
        ? 'Guest'
        : Customer_Data.filter(customer => customer._id === customer_id)[0]
          ?.fullname;
  var formatedTime = moment(time).format('DD-MM-YYYY  hh:mm:ss A');
  /* itemAmount is the amount of sock in/out items. incase of stock in it is the quantity amount of an item. and in casee of stock out it is the length of the sold items, not the quntity */
  var itemAmount = status == 'in' ? stock_in_qty : stock_items?.length;
  /* TextColor & bgColor is a color to show the in/out in light red and light green */
  var textColor =
    status == 'in' ? color.green : status == 'out' ? color.primary : '#000';
  var bgColor =
    status == 'in'
      ? color.lightGreen
      : status == 'out'
        ? color.lightPrimary
        : 'white';

  function handleOpenDetail() {
    const history = {
      status: status == 'in' ? 'Stock In' : status == 'out' ? 'Stock Out' : '',
      customer: customer,
      id: _stock_history_id,
      time: time,
      items: stock_items,
    };

    setSelectedHistory(history);
    setShowDetail(true);
  }

  return (
    <TouchableOpacity
      style={{
        marginVertical: 4,
        backgroundColor: bgColor,
        paddingVertical: 1,
        paddingHorizontal: 15,
        borderRadius: 10,
        gap: 0,
      }}
      onPress={handleOpenDetail}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: -3,
          }}>
            
          {customer} 
          
        </Text>
        <View
          style={{
            transform: [{ translateY: 9 }],
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo
            style={{
              transform: [{ rotate: status == 'out' ? '180deg' : '0deg' }],
            }}
            name="arrow-down"
            size={24}
            color={textColor}
          />
          <Text
            style={{
              fontSize: 17,
              color: textColor,
              fontWeight: '500',
            }}>
            {itemAmount}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.fomatedTimeStyle}>{formatedTime}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.fomatedTimeStyle}>{itemList()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fomatedTimeStyle: {
    fontSize: 15,
    color: color.gray,
    fontWeight: '500',
    marginTop: -3,
  },
});

export default StockHistoryList;
